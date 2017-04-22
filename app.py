from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/images/<filename>/')
def getImg(filename):
  return app.send_static_file('images/' + filename)
