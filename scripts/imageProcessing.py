#Author: Paul Langton
import sys
sys.path.append("../")

import urllib
import kairos_face
import time
import json
import app
from PIL import Image

# paths to templates
output = "static/data/facebank/"
latestImage = "static/resources/latestStill.jpg"
paul = "static/resources/PaulTemplate.jpg"
andrew = "static/resources/AndrewTemplate.jpg"
mark = "static/resources/MarkTemplate.jpg"
nick = "static/resources/NickTemplate.jpg"
federico = "static/resources/FedericoTemplate.jpg"
meg = "static/resources/MegTemplate.jpg"

# adds faces
def initAPI():
    kairos_face.enroll_face(file=paul, subject_id='Paul', gallery_name='nuvision')
    kairos_face.enroll_face(file=mark, subject_id='Mark', gallery_name='nuvision')
    kairos_face.enroll_face(file=andrew, subject_id='Andrew', gallery_name='nuvision')
    kairos_face.enroll_face(file=nick, subject_id='Nick', gallery_name='nuvision')
    kairos_face.enroll_face(file=federico, subject_id='Federico', gallery_name='nuvision')
    kairos_face.enroll_face(file=meg, subject_id='Meg', gallery_name='nuvision')
    print "API init successful."

# initializes api keys
def init(doAPI):
    kairos_face.settings.app_id = "e5746d4b"
    kairos_face.settings.app_key = "229f51c0bdccd36001103cf989c56fbe"
    if doAPI:
        initAPI()

# gets latest camera image
def latestStill(address):
    resource = urllib.urlopen(address)
    print("Retrieving latest image...")
    with open(latestImage, 'wb') as output:
        output.write(resource.read())

# process, recognize, crop, and bank images. sends command with person data to
# flask app
def processImage():
    latestStill("http://192.168.1.9:88/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=nuvision&pwd=nuvision")
    recognized_faces = ""
    try:
        data = kairos_face.recognize_face(file=latestImage, gallery_name='nuvision')
        print data
        #status =data[u'images'][0][u'transaction'][u'topLeftY']
        topLeftY = data[u'images'][0][u'transaction'][u'topLeftY']
        topLeftX = data[u'images'][0][u'transaction'][u'topLeftX']
        width = data[u'images'][0][u'transaction'][u'width']
        height = data[u'images'][0][u'transaction'][u'height']
        person = data[u'images'][0][u'transaction'][u'subject_id']
        still = Image.open(latestImage)
        banked = still.crop((topLeftX, topLeftY, topLeftX + width, topLeftY + height))
        #scaled = banked.thumbnail(100, Image.ANTIALIAS)
        banked.save(output + person + "Banked.jpg")
        app.sendCommand(json.loads(json.dumps({"command":"new_bank", "data":(person, output + person + "Banked.jpg")})))
        print data
        print "Recognized " + person + ". Hi " + person + "!"
    except Exception as e:
        print e
        print "No faces recognized."
