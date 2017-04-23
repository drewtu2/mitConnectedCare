# mitConnectedCare

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

## Running Server
1. Run `flask run`
2. Go to: [http://127.0.0.1:5000/index.html]
