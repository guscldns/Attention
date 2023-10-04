from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
text_to_display = ""

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_text', methods=['POST'])
def process_text():
    global text_to_display
    text_to_display = request.form['text_input'].replace('\n', '<br/>')  # \n을 <br>로 변환
    return redirect(url_for('test_page'))

@app.route('/test_page')
def test_page():
    global text_to_display
    words = text_to_display.split()
    return render_template('test_page.html', words=words)

if __name__ == '__main__':
    app.run(debug=True)
