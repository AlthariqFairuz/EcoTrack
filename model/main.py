from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
import uvicorn
from typing import Optional, List

app = FastAPI(
    title="Carbon Emission Prediction API",
    description="API untuk fitur calculator",
    version="1.0.0"
)

try:
    model = load_model('model_nn.h5')
    label_encoders = joblib.load('label_encoders.joblib')
    scaler = joblib.load('standard_scaler.joblib')
    print("Model and encoders loaded")

except Exception as e:
    print(f"Error: {e}")
    model = None
    label_encoders = None
    scaler = None

NUM_FEATURES = ['Monthly Grocery Bill', 'Vehicle Monthly Distance Km', 'Waste Bag Weekly Count', 
                'How Long TV PC Daily Hour', 'How Many New Clothes Monthly', 'How Long Internet Daily Hour']

CAT_FEATURES = ['Body Type', 'Sex', 'Diet', 'How Often Shower', 'Heating Energy Source', 'Transport', 
                'Vehicle Type', 'Social Activity', 'Frequency of Traveling by Air', 'Waste Bag Size', 
                'Energy efficiency', 'Recycling', 'Cooking_With']

FEATURE_ORDER = ['Body Type', 'Sex', 'Diet', 'How Often Shower', 'Heating Energy Source', 'Transport',
                 'Vehicle Type', 'Social Activity', 'Monthly Grocery Bill', 'Frequency of Traveling by Air',
                 'Vehicle Monthly Distance Km', 'Waste Bag Size', 'Waste Bag Weekly Count', 
                 'How Long TV PC Daily Hour', 'How Many New Clothes Monthly', 'How Long Internet Daily Hour',
                 'Energy efficiency', 'Recycling', 'Cooking_With']

class CarbonEmissionInput(BaseModel):
    body_type: str
    sex: str
    diet: str
    how_often_shower: str
    heating_energy_source: str
    transport: str
    vehicle_type: Optional[str] = None
    social_activity: str
    monthly_grocery_bill: float
    frequency_of_traveling_by_air: str
    vehicle_monthly_distance_km: float
    waste_bag_size: str
    waste_bag_weekly_count: int
    how_long_tv_pc_daily_hour: float
    how_many_new_clothes_monthly: int
    how_long_internet_daily_hour: float
    energy_efficiency: str
    recycling: List[str]  
    cooking_with: List[str]


class CarbonEmissionOutput(BaseModel):
    predicted_carbon_emission: float
    status: str
    message: str

def preprocess_list_features(value_list : Optional[List[str]]) -> str:
    """
    Convert list of values to string representation 
    """
    if not value_list:
        return "[]"
    
    return str(value_list)

@app.get("/")
def read_root():
    """Root endpoint"""
    return {
        "message": "Carbon Emission Prediction API",
        "status": "active",
        "model_loaded": model is not None,
        "label_encoders_loaded": label_encoders is not None,
        "scaler_loaded": scaler is not None
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {"status": "healthy", "model_status": "loaded"}

@app.post("/predict", response_model=CarbonEmissionOutput)
def predict_carbon_emission(input_data: CarbonEmissionInput):
    """
    Prediksi emisi karbon
    """
    try:
        
        if model is None or label_encoders is None or scaler is None:
            raise HTTPException(status_code=503, detail="Model or encoders opr scaler is not loaded")
        
        input_dict = input_data.model_dump()
        
        column_mapping = {
            'body_type': 'Body Type',
            'sex': 'Sex',
            'diet': 'Diet',
            'how_often_shower': 'How Often Shower',
            'heating_energy_source': 'Heating Energy Source',
            'transport': 'Transport',
            'vehicle_type': 'Vehicle Type',
            'social_activity': 'Social Activity',
            'monthly_grocery_bill': 'Monthly Grocery Bill',
            'frequency_of_traveling_by_air': 'Frequency of Traveling by Air',
            'vehicle_monthly_distance_km': 'Vehicle Monthly Distance Km',
            'waste_bag_size': 'Waste Bag Size',
            'waste_bag_weekly_count': 'Waste Bag Weekly Count',
            'how_long_tv_pc_daily_hour': 'How Long TV PC Daily Hour',
            'how_many_new_clothes_monthly': 'How Many New Clothes Monthly',
            'how_long_internet_daily_hour': 'How Long Internet Daily Hour',
            'energy_efficiency': 'Energy efficiency',
            'recycling': 'Recycling',
            'cooking_with': 'Cooking_With'
        }
        
        renamed_dict = {}
        for api_name, model_name in column_mapping.items():
            if api_name in input_dict:
                value = input_dict[api_name]
                
                # Handle list features (recycling, cooking_with)
                if api_name in ['recycling', 'cooking_with']:
                    renamed_dict[model_name] = preprocess_list_features(value)

                else:
                    renamed_dict[model_name] = value
        

        df = pd.DataFrame([renamed_dict])
        df = df.fillna(np.nan)  
        
        # apply label encoding
        for col in CAT_FEATURES:
            if col in df.columns:
                try:
                    df[col] = label_encoders[col].transform(df[col])
                except ValueError as e:
                    unique_values = list(label_encoders[col].classes_)
                    raise HTTPException(
                        status_code=400, 
                        detail=f"Invalid nilai untuk kolom {col}: '{df[col].iloc[0]}'. "
                               f"Nilai yang diizinkan: {unique_values}"
                    )
        
        for feature in FEATURE_ORDER:
            if feature not in df.columns:
                df[feature] = 0  
        
        # Ensure all features are in the correct order
        df = df[FEATURE_ORDER]
        
        # Apply scaling
        data_scaled = scaler.transform(df)
        
        # Prediction
        prediction = model.predict(data_scaled)
        predicted_value = float(prediction[0][0])
        
        return CarbonEmissionOutput(
            predicted_carbon_emission=round(predicted_value, 2),
            status="success",
            message="Prediksi berhasil dilakukan"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/model-info")
def get_model_info():
    """Get model information"""
    return {
        "categorical_features": CAT_FEATURES,
        "numerical_features": NUM_FEATURES,
        "total_features": len(FEATURE_ORDER),
        "feature_order": FEATURE_ORDER,
        "input_dimension": len(FEATURE_ORDER)
    }

@app.get("/categories/{feature_name}")
def get_feature_categories(feature_name: str):
    """Get available categories for a specific feature"""
    if label_encoders is None:
        raise HTTPException(status_code=503, detail="Label encoders not available")
    
    # Map API name to model name
    api_to_model = {
        'body_type': 'Body Type',
        'sex': 'Sex',
        'diet': 'Diet',
        'how_often_shower': 'How Often Shower',
        'heating_energy_source': 'Heating Energy Source',
        'transport': 'Transport',
        'vehicle_type': 'Vehicle Type',
        'social_activity': 'Social Activity',
        'frequency_of_traveling_by_air': 'Frequency of Traveling by Air',
        'waste_bag_size': 'Waste Bag Size',
        'energy_efficiency': 'Energy efficiency',
        'recycling': 'Recycling',
        'cooking_with': 'Cooking_With'
    }
    
    model_feature_name = api_to_model.get(feature_name)
    if model_feature_name not in label_encoders:
        raise HTTPException(status_code=404, detail=f"Feature {feature_name} not found")
    
    encoder = label_encoders[model_feature_name]
    categories = encoder.classes_.tolist()
    
    return {
        "feature": feature_name,
        "model_feature_name": model_feature_name,
        "available_categories": categories,
        "total_categories": len(categories)
    }

@app.get("/example-values")
def get_example_values():
    """Get example values for each categorical feature based on training data"""
    if label_encoders is None:
        raise HTTPException(status_code=503, detail="Label encoders not available")
    
    examples = {}
    api_to_model = {
        'body_type': 'Body Type',
        'sex': 'Sex',
        'diet': 'Diet',
        'how_often_shower': 'How Often Shower',
        'heating_energy_source': 'Heating Energy Source',
        'transport': 'Transport',
        'vehicle_type': 'Vehicle Type',
        'social_activity': 'Social Activity',
        'frequency_of_traveling_by_air': 'Frequency of Traveling by Air',
        'waste_bag_size': 'Waste Bag Size',
        'energy_efficiency': 'Energy efficiency',
        'recycling': 'Recycling',
        'cooking_with': 'Cooking_With'
    }
    
    for api_name, model_name in api_to_model.items():
        if model_name in label_encoders:
            categories = label_encoders[model_name].classes_.tolist()
            examples[api_name] = categories[:3] 
    
    return {
        "example_values": examples,
        "note": "These are sample values from training data. Use /categories/{feature_name} for complete lists."
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)