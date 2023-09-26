# app.py, 백엔드 부분(사용자에게 보여주지 않는 부분)
# -*- coding: utf-8 -*- (디버그 관련)
from flask import Flask, render_template
# render_template: 화면 보기 위함

#Flask 객체 인스턴스 생성
app = Flask(__name__)

# 주소 매핑, url 주소에 따른 실행
@app.route('/') # 접속하는 url(예시:www.naver.com/blog 중 blog 인식 위해 사용 )
def main():
    # 어떤 화면(index.html)을 보여줘라
    return render_template('index.html')

# 주소 매핑, url 주소에 따른 실행
@app.route('/test') # 접속하는 url(예시:www.naver.com/blog 중 blog 인식 위해 사용 )
# /test를 하면 http://127.0.0.1:5000/test해야 index.html에서 작성한 내용이 보인다

def main2(): # 함수이름 동일하게 쓰지 말것
    # 어떤 화면(index.html)을 보여줘라
    return render_template('index3.html')

from flask import request

@app.route("/test", methods = ["POST"]) 
def main2_post():
    id_result= request.form['input']
    password_result= request.form['pwd']
    
    print(id_result,password_result)
    
    return render_template('index3.html')


# 주소 매핑, url 주소에 따른 실행
@app.route('/main') 
def main3():
    # url에서 값 가져오기
    temp = request.args.get('uid') # uid 값 가져와라
    temp2 = request.args.get('cid') # cid 값 가져와라
    
    print(temp,temp2)
    # 어떤 화면(index.html)을 보여줘라
    return render_template('index2.html')

if __name__=="__main__":
    app.run(debug=True)
    # host 등을 직접 지정하고 싶다면
    # app.run(host = "127.0.0.1", port =  "5000", debug=True)
    
# get 방식 :http://127.0.0.1:5000/Content?uid=osh&cid=30?변수=값&변수=값
# 터미널 가상환경에서 python app.py 실행시키면 flask 실행