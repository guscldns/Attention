from flask import Flask, request, render_template
from google.cloud import vision
import os

app = Flask(__name__)

# Set the Google Cloud credentials environment variable
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\guscl\OneDrive\문서\Github\api-project-397750607032-5ddc025931cd.json"

@app.route("/")
def index():
    return render_template("highlight_input.html")

@app.route("/highlight", methods=["POST"])
def upload():
    if "file" not in request.files:
        return "No file part"
    
    file = request.files["file"]
    
    if file.filename == "":
        return "No selected file"
    
    if file:
        client = vision.ImageAnnotatorClient()
        content = file.read()
        image = vision.Image(content=content)

        response = client.text_detection(image=image)
        texts = response.text_annotations

        if texts:
            detected_text = texts[0].description
            text = detected_text
            id="textInputForm"
            
            # "highlight.html" 템플릿을 렌더링하고 텍스트를 전달하여 표시
            return render_template("highlight.html", text=text)

    return "OCR failed"

if __name__ == "__main__":
    # 애플리케이션 실행
    app.run(debug=True)