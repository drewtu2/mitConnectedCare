"""
Andrew Tu
MIT Connected Care Hackathon 
April 2017
Python3
"""

import pandas as pd
import subprocess
import os

# Filters and converts a csv of Boston crime data to a json object file. 

#subprocess.call("../connected.setup", shell=True )

csv = os.environ["PWD"] + "/static/data/crimeData.csv"

df = pd.read_csv(csv)
print(df)
df = df[(df.YEAR == 2017) &\
        (df.LAT != 0) &\
        (df.LONG != 0)]
        #(df.SHOOTING == "Y")]
df.dropna(subset=["LAT", "LONG"], inplace=True)
print(df)
jsonString = df.to_json()

with open("static/data/filteredCrimeData.json", "w") as the_file:
  the_file.write("var filteredData = " + jsonString)


