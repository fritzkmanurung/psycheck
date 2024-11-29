import pickle
import warnings
import numpy as np
import pandas as pd
from flask import Flask, render_template, request
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb

app = Flask(__name__)

warnings.filterwarnings("ignore", category=UserWarning, module="xgboost")

# Memuat Model XGB Student
with open('../Application/student_xgb.pkl', 'rb') as file:
    student_model = pickle.load(file)

# Memuat Model XGB Working
with open('../Application/working_xgb.pkl', 'rb') as file:
    working_model = pickle.load(file)

# Memuat Label Encoder
with open('../Application/le.pkl', 'rb') as file:
    le = pickle.load(file)

# Memuat Scaler
with open('../Application/scaler.pkl', 'rb') as file:
    scaler = pickle.load(file)
    
print(f"Scaler type: {type(scaler)}")
print(f"Label Encoder type: {type(le)}")

# Route untuk halaman utama
@app.route('/')
def home():
    return render_template('depresi.html')

# Route untuk API Prediksi

# Menjalankan Server Flask
if __name__ == '__main__':
    app.run(debug=True)