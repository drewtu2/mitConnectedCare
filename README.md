# mitConnectedCare

This project is an augmented reality hackathon project developed for the 2017
Connected Care Design Hackathon hosted by the MIT Design Labs in honor of Bill
Mitchell. This project is called "Nuvision" and is inteded to be a simulation of
a connected eyepiece (whether they by contact lenses, glasses, or other form of
glasses). Nuvision integrates data from a number of sources and provides them in
clean, concise manner overlayed into user vision.

## Integrated technologies
- Google Maps API
  - Heat maps
  - Marker locations
- Boston Open Data Resources (Socrata)
  - Utilized real crime data offered by the City of Boston.
- Kairos Facial Recognition API
- Bootstrap Web Framework
- Foscam IP Camera 

## Setup
1. Clone the repository: 
  ```git clone https://github.com/drewtu2/mitConnectedCare.git```
2. Initialize Submodule Dependencies (requires github SSH keys)
  ```
  git submodule update --init --recursive  
  cd kairos-face-sdk-python
  pip install .  
  ```  
3. Install the rest of the pip requirements from requirements.txt
  ```
  cd ..  
  pip install -r requirements.txt  
  ```
3. Set up the flask app variable
  ```
  export FLASK_APP=app.py
  ```
4. To turn on facial recognition
  ```
  export PROD=True
  ```
5. Camera: requires an IP camera on with MJPEG video stream on 192.168.1.9:88. 

## Running Simulation
1. Run `flask run`
2. Go to: [http://127.0.0.1:5000/]
3. Dashboard controls can be found at [http://127.0.0.1:5000/dashboard]
Note: Feed may take a couple minutes to configure. May require occasional refreshes
to attempt to load background feed. 

## Presentation and Results
Nuvision ultimate placed Top 5 at the Connected Care Hackathon. Competition was
a mix of undergrads through PhD students. 
- Slide Deck: https://drive.google.com/open?id=1IcgVUkzcntxwA6RsAlXG6zQTU9aUqKPnZ5QtAqGHIWg
- Hackathon Recap Video: https://vimeo.com/219319639
- Video of presentation: 

## TODO: 
~~ - Add better comments ~~
- Add Links to README for documentation of results purposes
