from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from readCsv import read_csv

app = Flask(__name__)
CORS(app)  # CORS를 적용

@app.route('/getHTML', methods=['GET'])
def get_html():
    js_url = request.args.get('url')  # JS 파일에서 전달한 URL 파라미터를 가져옴
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    try:
        response = requests.get(js_url, headers=headers)

        if response.status_code == 200:
            html = response.text
            return jsonify({'html': html}), 200
        else:
            return jsonify({'error': f"Error: {response.status_code}"}), response.status_code
    except Exception as e:
        return jsonify({'error': f"Error: {str(e)}"}), 500

@app.route('/getCsv', methods=['GET'])
def get_csv():
    # url 형식: http://localhost:5001/getCsv?fileName=${fileName}
    # 요청 파라미터에서 fileName을 가져옴
    file_name = request.args.get('fileName')
    data = read_csv(file_name)
    try:
        return jsonify({'data': data}), 200
    except Exception as e:
        return jsonify({'error': f"Error: {str(e)}"}), 500
    
if __name__ == '__main__':
    app.run(port=5001, debug=True)
