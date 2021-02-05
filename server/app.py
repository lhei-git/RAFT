import pickle
import sys
# from src import lookup_list
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

from lookup_list import lookup_list as ll
from model import LinearReg

# FIGURE OUT HOW TO PUT A FILE INTO A DIFF FOLDER


app = Flask(__name__)
CORS(app)
@app.route('/state')
def index():
    if request.method == 'POST':
        my_abst = request.get_json() ['']
    return render_template('index.html')

@app.route('/data_station')
def getStationData():
    if request.method == "POST":
        state = stateCodes(str(request.json["state"]))
        zipCode = str(request.json["zip"])
        reqString = "https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?locationid=FIPS:26&limit=1000&datasetid=GHCND&locationid=ZIP:" + zipCode
        response = requests.get(reqString, headers={'Token': 'iNyYxajqDfjhrLqStUAbIaddioahKEus'})
        x = json.loads(r.text)
        return x
    return ""

@app.route('/counties_check')
def test():
    print(ll['MI'])
    return

@app.route('/model_results')
def model():
    lr = LinearReg('MAR', 2021, 'testing/datastation.csv')
    results = lr.predict()
    print('[INFO] MODEL RESULTS:', results)
    return ''.join(str(results))


def stateCodes(state):
    states = {
        'AL':'01',
        'AK':'02',
        'AZ':'04',
        'AR':'05',
        'CA':'06',
        'CO':'08',
        'CT':'09',
        'DC':'11',
        'DE':'10',
        'FL':'12',
        'GA':'13',
        'HI':'15',
        'ID':'16',
        'IL':'17',
        'IN':'18',
        'IA':'19',
        'KS':'20',
        'KY':'21',
        'LA':'22',
        'ME':'23',
        'MD':'24',
        'MA':'25',
        'MI':'26',
        'MN':'27',
        'MS':'28',
        'MO':'29',
        'MT':'30',
        'NE':'31',
        'NV':'32',
        'NH':'33',
        'NJ':'34',
        'NM':'35',
        'NY':'36',
        'NC':'37',
        'ND':'38',
        'OH':'39',
        'OK':'40',
        'OR':'41',
        'PA':'42',
        'RI':'44',
        'SC':'45',
        'SD':'46',
        'TN':'47',
        'TX':'48',
        'UT':'49',
        'VT':'50',
        'VA':'51',
        'WA':'53',
        'WV':'54',
        'WI':'55',
        'WY':'56',
    }

    return states.get(state,"Invalid State")

if __name__ == "__main__":
    app.run(debug=True)
