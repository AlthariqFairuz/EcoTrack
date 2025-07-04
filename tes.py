import requests

# Test scan receipt
with open('tc-ocr.jpg', 'rb') as f:
    files = {'file': f}
    response = requests.post('http://localhost:8001/scan-receipt', files=files)
    print(response.json())

