![EcoTrack](./assets/readme/EcoTrack.png)


## Deskripsi

EcoTrack adalah aplikasi mobile yang memungkinkan pengguna untuk melacak, memahami, dan mengurangi jejak karbon harian mereka. Dengan menggabungkan AI, Computer Vision, dan gamifikasi, aplikasi ini dapat membantu pengguna melacak jejak karbon secara akurat dan mudah digunakan dalam kehidupan sehari-hari.

---
<br/>

![UI](./assets/readme/Screen.png)

## Pemanfaatan AI

- OCR & Food Recognition
- Carbon Calculator
- Chatbot RAG
- Rekomendasi AI

---
<br/>

## Features

- Onboarding interaktif dan ramah pengguna untuk memudahkan orientasi awal.
- Visualisasi data progres dalam bentuk grafik, target harian, dan dashboard analitik.
- Fitur Gamifikasi berupa tantangan, leaderboard, sistem badge, dan komunitas interaktif.

---
<br/>

## Tech Stack

- **Frontend:** React Native
- **Backend:** Django REST Framework
- **Database:** PostgreSQL
- **AI Engine:** EasyOCR, YOLOv8, TensorFlow
- **Model Deployment:** Amazon SageMaker
- **AI Chatbot:** OpenRouter (RAG-based)

---
<br/>

## How to Run


1. Clone repository
   ```bash
   git clone https://github.com/your-username/your-project.git
   ```


2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npm run android
   ```

4. To run model (make sure uvicorn is installed (recommended))
   ```bash
   cd model/
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

   or 

   ```bash
   cd model/
   python main.py
   ```
Docs for model:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo