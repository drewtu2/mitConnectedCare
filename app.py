from flask import Flask
from flask import render_template
import sys
sys.path.append("/opencv-2.4.11/modules/python/src2")

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/images/<filename>/')
def getImg(filename):
  return app.send_static_file('images/' + filename)
