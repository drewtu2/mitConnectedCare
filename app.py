from flask import Flask
from flask import render_template
from flask import request
app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/images/<filename>/')
def getImg(filename):
  return app.send_static_file('images/' + filename)

@app.route('/dashboard/', methods=['GET'])
def dashboard():
  if "command" in request.args:
    command = request.args['command']
    sendCommand(command)
  return render_template('dashboard.html')

def sendCommand(command):
  socketio.emit("channel-a", command)
