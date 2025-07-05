import requests

# Test scan receipt
with open('tc-ocr.png', 'rb') as f:
    files = {'file': f}
    response = requests.post('https://scanner-ocr-195352650485.asia-southeast2.run.app/scan-receipt', files=files)
    print(response.json())

