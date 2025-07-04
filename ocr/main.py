import io
import re

import cv2
import easyocr
import numpy as np
import uvicorn
from fastapi import FastAPI, File, HTTPException, UploadFile
from PIL import Image

app = FastAPI(title="EcoTrack OCR Service",
    description="API untuk fitur scanner",
    version="1.0.0"
    )

reader = easyocr.Reader(['en', 'id'])

class OCRService:
    def __init__(self):
        self.reader = reader
        
    def preprocess_image(self, image_array):
        """Preprocess image for better results"""
        # convert to grayscale (this process reminds me of tugas besar algo sir :( )
        gray = cv2.cvtColor(image_array, cv2.COLOR_RGB2GRAY)
        
        #CLAHE (Contrast Limited Adaptive Histogram Equalization)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        gray = clahe.apply(gray)
        
        # noise reduction
        gray = cv2.medianBlur(gray, 3)
        
        # Thresholding
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        return thresh
    
    def extract_text_easyocr(self, image_array):
        """Extract text using EasyOCR"""
        processed_img = self.preprocess_image(image_array)
        results = self.reader.readtext(processed_img)
        
        text_data = []
        for (bbox, text, confidence) in results:
            if confidence > 0.7:  
                text_data.append({
                    'text': text.strip(),
                    'confidence': confidence,
                    'bbox': bbox
                })
        
        return text_data
    
    def parse_receipt(self, text_data):
        """Parse receipt text to extract only food names based on keywords"""
        
        food_keywords = [
            'daging', 'ayam', 'sapi', 'kambing', 'meat', 'chicken', 'beef',
            'susu', 'keju', 'yogurt', 'milk', 'cheese', 'protein', 'nasi', 'mie',  
            'sayur', 'buah', 'tomat', 'vegetable', 'fruit'  
        ]
        
        food_counts = {}
        full_text = ' '.join([item['text'] for item in text_data])
        
        words = re.sub(r'[0-9.,Rp\-X\n]+', ' ', full_text).split()
        
        for word in words:
            word = word.strip().lower()
            if len(word) > 2:
                if word in [food.lower() for food in food_keywords]:
                    food_names = word.capitalize()
                    food_counts[food_names] = food_counts.get(food_names, 0) + 1
        
        return food_counts

    def calculate_carbon_footprint(self, food_counts):
        """Calculate carbon footprint for detected food names"""
        
        carbon_factors = {
            'meat': 5.5,  
            'dairy': 3.2,
            'vegetables': 0.4,
            'processed': 2.1,
            'default': 1.5
        }
        
        total_carbon = 0
        categorized_items = []
        
        for food_name, count in food_counts.items():
            category = self.categorize_item(food_name)
            estimated_weight = 0.3  # 300g per item makanan asumsi
            carbon_per_item = estimated_weight * carbon_factors.get(category, carbon_factors['default'])
            total_carbon_item = carbon_per_item * count
            
            categorized_items.append({
                'name': food_name,
                'category': category,
                'estimated_weight': estimated_weight,
                'carbon_footprint': round(total_carbon_item, 2)
            })
            
            total_carbon += total_carbon_item
        
        return categorized_items, round(total_carbon, 2)

    
    def categorize_item(self, item_name):
        """Categorize food items"""
        item_lower = item_name.lower()
        
        meat_keywords = ['daging', 'ayam', 'sapi', 'kambing', 'meat', 'chicken', 'beef']
        dairy_keywords = ['susu', 'keju', 'yogurt', 'milk', 'cheese', 'protein', 'nasi', 'mie']
        vegetable_keywords = ['sayur', 'buah', 'tomat', 'vegetable', 'fruit']
        
        if any(keyword in item_lower for keyword in meat_keywords):
            return 'meat'
        elif any(keyword in item_lower for keyword in dairy_keywords):
            return 'dairy'
        elif any(keyword in item_lower for keyword in vegetable_keywords):
            return 'vegetables'
        else:
            return 'processed'

ocr_service = OCRService()

@app.post("/scan-receipt")
async def scan_receipt(file: UploadFile = File(...)):
    """Process receipt image and extract carbon footprint data"""
    try:

        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        image_array = np.array(image)
        
        # extract text using EasyOCR
        text_data = ocr_service.extract_text_easyocr(image_array)
        
        items = ocr_service.parse_receipt(text_data)
        
        if not items:
            return {
                "success": False,
                "message": "No items detected in receipt",
                "raw_text": [item['text'] for item in text_data]
            }
        
        # Calculate 
        categorized_items, total_carbon = ocr_service.calculate_carbon_footprint(items)
        
        return {
            "success": True,
            "detected_type": "receipt",
            "total_carbon_footprint": total_carbon,
            "items": categorized_items,
            "item_count": len(categorized_items),
            "raw_text": [item['text'] for item in text_data]  
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR processing error: {str(e)}")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Food scanning error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)