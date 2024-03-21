from flask import Flask, request, send_file
from PIL import Image
from rembg import remove
from io import BytesIO

app = Flask(__name__)

@app.route("/api/upload", methods=['POST'])
def upload():
    if 'file' not in request.files:
        return 'No files found'
    file = request.files['file']
    if file.filename == '':
        return 'No file selected'
    
    file_contents = Image.open(file.stream)
    output = remove(file_contents)
    imgIo = BytesIO()
    output.save(imgIo, 'PNG')
    imgIo.seek(0)
    return send_file(imgIo, mimetype="image/png", download_name="_remove_bg.png")
    

if __name__ == '__main__':
    app.run(debug=True)