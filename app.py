from flask import Flask, render_template, request, jsonify
import pickle
import pandas as pd
import warnings

# Menonaktifkan peringatan untuk XGBoost
warnings.filterwarnings("ignore", category=UserWarning, module="xgboost")

app = Flask(__name__)

# Memuat model XGBoost untuk Student dan Working Professional
with open('xgb_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Pastikan semua data yang diperlukan ada
feature_names = [
    'Gender', 'Age', 'Working Professional or Student', 'Sleep Duration', 'Dietary Habits', 
    'Have you ever had suicidal thoughts ?', 'Work/Study Hours', 'Financial Stress',
    'Family History of Mental Illness', 'Job/Study Satisfaction', 'Work/Academic Pressure'
]

@app.route('/contoh')
def example():
    return render_template('index.html')

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
        
        # Ubah input menjadi DataFrame dengan nama kolom yang sama
        input_data = pd.DataFrame([input_data_values], columns=feature_names)
        print(f"Input data as DataFrame: {input_data}")
        
        input_data = input_data[feature_names]
        
        # Prediksi menggunakan model
        prediction = model.predict(input_data)[0]
        print(f"Prediction: {prediction}")
        
        # Kembalikan hasil prediksi dalam format JSON
        return jsonify({'prediction': int(prediction)})
    
    except Exception as e:
        # Tangani error dan kembalikan pesan error sebagai JSON response
        print(f"Error: {e}")  # Log error untuk debugging
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
