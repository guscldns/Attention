# 필요한 모듈 및 패키지를 가져옵니다.
from flask import Flask, request, render_template
from google.cloud import vision
import os

# Flask 웹 애플리케이션 인스턴스를 생성합니다.
app = Flask(__name__)

# Google Cloud 자격증명 환경 변수를 설정합니다.
# 여기서는 Google Cloud 자격증명 JSON 파일의 경로를 지정해야 합니다.
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\guscl\OneDrive\문서\Github\api-project-397750607032-5ddc025931cd.json"

# 홈페이지 ("/")를 위한 라우트를 정의합니다.
@app.route("/")
def index():
    # 사용자가 홈페이지를 방문하면 "highlight_input.html" 템플릿을 렌더링합니다.
    return render_template("highlight_input.html")

# 파일 업로드를 처리하기 위한 라우트를 정의합니다. ("/highlight")
@app.route("/highlight", methods=["POST"])
def upload():
    # 업로드된 요청에서 "file" 키가 있는지 확인합니다.
    if "file" not in request.files:
        return "파일 부분이 없습니다."
    
    # 요청에서 업로드된 파일을 가져옵니다.
    file = request.files["file"]
    
    # 파일을 선택하지 않았는지 확인합니다.
    if file.filename == "":
        return "선택된 파일이 없습니다."
    
    # 파일이 업로드되었는지 확인합니다.
    if file:
        # Google Cloud Vision 클라이언트를 생성합니다.
        client = vision.ImageAnnotatorClient()
        
        # 업로드된 파일의 내용을 읽어옵니다.
        content = file.read()
        
        # Vision API 이미지 객체를 파일 내용에서 생성합니다.
        image = vision.Image(content=content)

        # 이미지에서 텍스트 감지를 위해 Vision API를 사용합니다.
        response = client.text_detection(image=image)
        texts = response.text_annotations

        # 텍스트가 감지되었는지 확인합니다.
        if texts:
            # 응답에서 감지된 텍스트를 추출합니다.
            detected_text = texts[0].description
            text = detected_text
            
            # "highlight.html" 템플릿을 렌더링하고 추출된 텍스트를 전달합니다.
            return render_template("highlight.html", text=text)

    # OCR이 실패하거나 텍스트가 감지되지 않으면 오류 메시지를 반환합니다.
    return "OCR 실패"

# 이 스크립트를 실행할 때 Flask 애플리케이션을 실행합니다.
if __name__ == "__main__":
    app.run(debug=True)
