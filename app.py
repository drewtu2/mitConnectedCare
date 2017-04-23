from gevent import monkey
monkey.patch_all()
from flask import Flask
from flask import render_template
from flask import request
from flask_socketio import SocketIO, emit
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

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

@socketio.on('channel-a')
def sendCommand(message):
    socketio.emit("channel-a", message)

if __name__ == '__main__':
    app.debug = True
    socketio.run(app, port=5000)
