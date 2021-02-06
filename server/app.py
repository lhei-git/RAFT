import pickle
import sys
import json
import requests
# from src import lookup_list
from flask import Flask, render_template, request, jsonify, Response
from flask_cors import CORS

from helper import stateCodes
from lookup_list import lookup_list as ll
from model import LinearReg

# TODO:
# FIGURE OUT HOW TO PUT A FILE INTO A DIFF FOLDER
# WE NEED TO CONVERT THIS TO A CLASS IN ORDER TO SAVE INFORMATION FROM EACH REQUEST (We could make global vars if we are lazy coders)

app = Flask(__name__)
CORS(app)


@app.route('/data_station', methods=['GET'])
def getStationData():
    if request.method == "GET":
        fips = ll[request.args["state"]][request.args["county"]]
        fips = str(fips)
        reqString = "https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?locationid=FIPS:" + fips + "&limit=1000&datasetid=GHCND"
        print(reqString)
        response = requests.get(reqString, headers={'Token': 'iNyYxajqDfjhrLqStUAbIaddioahKEus'})
        if(json.loads(response.text) == None):
            return jsonify("NOAA's API can't be accessed"), 400
        return jsonify(json.loads(response.text)), 200
    return ""

# EXAMPLE: url/counties?state='MI'
@app.route('/counties', methods=['GET'])
def counties():
    try:
        if request.method == "GET":

            qs = request.args.to_dict(flat=False)

            if len(qs) == 0 and qs['state'] is None:
                raise Exception('State QueryString not Provided')

            state = qs['state']

            if isinstance(state, list) and len(state) == 1:
                state = state[0]
            elif isinstance(state, list) and len(state) > 1:
                print(type(state))
                raise Exception('Too many QueryString arguments passed')

            if ll.get(state.upper()) is None:
                raise KeyError('Invalid State Provided')

            data = list(ll[state.upper()].keys())

            print(data)

            return jsonify(data=data), 200

    except Exception as e:
        print(qs)
        return '[BAD REQUEST] {}'.format(e), 400



@app.route('/model_results')
def model():
    lr = LinearReg('MAR', 2021, 'testing/datastation.csv')
    results = lr.predict()
    print('[INFO] MODEL RESULTS:', results)
    return jsonify(data = list(results)), 200

if __name__ == "__main__":
    app.run(debug=True)