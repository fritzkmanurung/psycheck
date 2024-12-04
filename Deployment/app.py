from flask import Flask, render_template, request, jsonify
import pickle
import pandas as pd
import numpy as np
import warnings
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler

# Menonaktifkan peringatan untuk XGBoost
warnings.filterwarnings("ignore", category=UserWarning, module="xgboost")

app = Flask(__name__)

# Memuat model XGBoost untuk Student dan Working Professional
with open('../Application/nn.pkl', 'rb') as file:
    model = pickle.load(file)

# Memuat Scaler
with open('../Application/scale.pkl', 'rb') as file:
    scale = pickle.load(file)

# Pastikan semua data yang diperlukan ada
feature_names = [
    'Age', 'Work/Study Hours', 'Financial Stress', 'Gender', 'Working Professional or Student', 
    'Sleep Duration', 'Dietary Habits', 'Have you ever had suicidal thoughts ?', 'Family History of Mental Illness'
]

# Route untuk halaman utama
@app.route('/')
def home():
    return render_template('depresi.html')

# Route untuk melakukan prediksi
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Ambil data dari form
        data = request.get_json()
        print(f"Received input: {data}")
        
        input_data_values = data.get('input')
        
        # Ubah input menjadi DataFrame dengan nama kolom yang sama seperti saat fit scaler
        input_data = pd.DataFrame([input_data_values], columns=feature_names)
        print(f"Input data as DataFrame: {input_data}")
        
        # Standarisasi data input menggunakan scaler
        input_data_scaled = scale.transform(input_data)
        print(f"Scaled input data: {input_data_scaled}")
        
        # Prediksi menggunakan model
        prediction = model.predict(input_data_scaled)[0]
        print(f"Prediction: {prediction}")
        
        # Kembalikan hasil prediksi dalam format JSON
        return jsonify({'prediction': int(prediction)})
    
    except Exception as e:
        # Tangani error dan kembalikan pesan error sebagai JSON response
        print(f"Error: {e}")  # Log error untuk debugging
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
