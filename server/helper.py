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

def endpoint_to_dict(data):
    num_to_month = {
        '01':'JAN',
        '02':'FEB',
        '03':'MAR',
        '04':'APR',
        '05':'MAY',
        '06':'JUN',
        '07':'JUL',
        '08':'AUG',
        '09':'SEP',
        '10':'OCT',
        '11':'NOV',
        '12':'DEC'
    }

    model_data = {
        'YEAR': set()
    }
    
    for i in data:
        date = i['date'].split('-')
        model_data['YEAR'].add(int(date[0]))
        month = num_to_month[date[1]]
        
        if model_data.get(month):
            model_data[month].append(i['value'])
        else:
            model_data[month] = []
            model_data[month].append(i['value'])
        
    model_data['YEAR'] = list(model_data['YEAR'])
        
    return model_data