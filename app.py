from gevent import monkey
monkey.patch_all()
from flask import Flask
from flask import render_template
from flask import request
from scripts import imageProcessing
from flask_socketio import SocketIO, emit
import sys
import time
import os
sys.path.append("/scripts/")
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
prod = 'PROD' in os.environ and os.environ['PROD'] in [1, 'true', ]

if prod:
    video = "<img id='stream' src='http://192.168.1.9:88/cgi-bin/CGIStream.cgi?cmd=GetMJStream&usr=nuvision&pwd=nuvision'></img>"
else:
    video = ""

@app.route('/')
def index():
    return render_template("index.html", video=video)

@app.route('/images/<filename>/')
def getImg(filename):
    return app.send_static_file('images/' + filename)

@app.route('/dashboard/', methods=['GET'])
def dashboard():
    if "command" in request.args:
      command = request.args['command']
      sendCommand(command)
    return render_template('dashboard.html')

@socketio.on('channel-a')
def sendCommand(message):
  socketio.emit("channel-a", message)

  if __name__ == '__main__':
    app.debug = True
    socketio.run(app, port=5000)\


if prod:
    print "Facial recognition status: ON"
    imageProcessing.init(False)
    while(True):
        time.sleep(1.5)
        imageProcessing.processImage()
else:
    print "Facial recognition status: OFF"
