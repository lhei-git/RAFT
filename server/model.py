import pandas as pd
import numpy as np 
from sklearn.model_selection import train_test_split

# Model
from sklearn.linear_model import LinearRegression

# MSE
from sklearn.metrics import mean_squared_error
# R^2 
from sklearn.metrics import r2_score

class LinearReg:
    def __init__(self, month, year, path, state = '', county = ''):
        self.state = state
        self.county = county
        self.path = path
        self.month = month
        self.year = year
        self.LR = LinearRegression()
        
    def dataToDF(self):
        df = pd.read_csv(self.path)

        if df.isnull().values.any():
            df.dropna()
        
        return self.clean_data(df, 999.90)

    def clean_data(self, df, value):
        # Clears all unuseable rows with null values
        # value - "NULL" Value to clear
        cols = df.columns
            
        for i in cols:
            df = df[df[i] != value]
            
        return df
        
    def split(self, df):
        try:
            X = df.loc[:, 'YEAR']
            y = df.loc[:, self.month]

            print(X.shape)
            if len(X.shape) < 2:
                X = self.to_2D_list(X)

            return train_test_split(X, y, test_size=0.20, random_state=42)

        except Exception as e:
            print('[MODEL ERROR]', e)
            return 0, 0, 0, 0

    def metrics(self, preds, true_y):
        mse = mean_squared_error(true_y, preds)
        # r2 - typically higher the better model fit, negative means wrong model chosen
        r2 = r2_score(true_y, preds)
        print('[MODEL METRICS] r2: {}, mse: {}'.format(r2, mse))
        return r2, mse

    def to_2D_list(self, Series):    
        print('rached')
        return np.array(Series).reshape(-1, 1)

    def predict(self):
        try:
            df = self.dataToDF()
            X_train, X_test, y_train, y_test = self.split(df)

            if len(X_train) == 1:
                raise Exception('[X_TRAIN ERROR] Shape: {}, Type: {}'.format(len(X_train.shape), type(X_train)))

            if len(X_test) == 1:
                raise Exception('[X_TEST ERROR] Shape: {}, Type: {}'.format(len(X_test.shape), type(X_test)))

            # train model
            self.LR.fit(X_train, y_train)

            # Testing
            preds = self.LR.predict(X_test)

            # metrics
            r2, mse = self.metrics(preds, y_test)

            return self.LR.predict([[self.year]])

        except Exception as e:
            print('[MODEL PREDICTING ERROR]', e)
            return None

# Testing
# lr = LinearReg('MAR', 2021, 'testing/datastation.csv')
# results = lr.predict()

# print(*results)



    
