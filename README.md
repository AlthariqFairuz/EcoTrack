## How to run

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm run android
   ```

3. To run model (make sure uvicorn is installed (recommended))
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