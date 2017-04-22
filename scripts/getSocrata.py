import pandas as pd
import subprocess
import os

#subprocess.call("../connected.setup", shell=True )

csv = os.environ["PWD"] + "/../data/crimeData.csv"

df = pd.read_csv(csv)
print(df)
df = df[(df.YEAR == 2017) &\
        (df.LAT != 0) &\
        (df.LONG != 0)]
        #(df.SHOOTING == "Y")]
df.dropna(subset=["LAT", "LONG"], inplace=True)
print(df)
jsonString = df.to_json()

with open("filteredCrimeData.json", "w") as the_file:
  the_file.write("var filteredData = " + jsonString)


