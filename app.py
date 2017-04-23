from gevent import monkey
monkey.patch_all()
from flask import Flask
from flask import render_template
from flask import request
from scripts import imageProcessing
from flask_socketio import SocketIO, emit
import sys
import time
import urllib2
import requests, json
import os
sys.path.append("/scripts/")
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
prod = 'PROD' in os.environ and os.environ['PROD'] in [1, 'true', 'True']

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/images/<filename>/')
def getImg(filename):
    return app.send_static_file('images/' + filename)

@app.route('/data/facebank/<filename>/')
def getData(filename):
    return app.send_static_file('data/facebank/' + filename)

@app.route('/dashboard/', methods=['GET'])
def dashboard():
    print "IN DASHBOARD"
    if "command" in request.args or "api" in request.args:
        print "COMMAND TRUE"
        if "api" in request.args:
            print "API TRUE"
            sendCommand("image_match_"+request.args['person'])
            return "success"
        else:
            print "API FALSE"
            command = request.args['command']
            sendCommand(command)
    return render_template('dashboard.html')

@socketio.on('channel-a')
def sendCommand(message):
    print "SENDING COMMAND"
    socketio.emit("channel-a", message)

def sendCommandAPI(person, output):
    print "API - SENDING COMMAND"
    # message = json.dumps({"command":"new_bank", "data":(person, output + person + "Banked.jpg")})
    r = requests.get("http://127.0.0.1:5000/dashboard?api=True&person="+person)

if __name__ == '__main__':
    app.debug = True
    socketio.run(app, port=5000)


if prod:
    print "Facial recognition status: ON"
    imageProcessing.init(False)
    pid = os.fork()
    if pid == 0: # child processImage
        while(True):
            time.sleep(1.5)
            imageProcessing.processImage()
else:
    print "Facial recognition status: OFF"
