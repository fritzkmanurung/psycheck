from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
import warnings
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler

# Menonaktifkan peringatan untuk XGBoost
warnings.filterwarnings("ignore", category=UserWarning, module="xgboost")

app = Flask(__name__)

# Memuat model XGBoost untuk Student dan Working Professional
with open('../Application/student_xgb.pkl', 'rb') as file:
    student_model = pickle.load(file)

with open('../Application/working_xgb.pkl', 'rb') as file:
    working_model = pickle.load(file)

# Memuat Label Encoder
with open('../Application/le.pkl', 'rb') as file:
    le = pickle.load(file)

# Memuat Scaler
with open('../Application/scaler.pkl', 'rb') as file:
    scaler = pickle.load(file)

# Route untuk halaman utama
@app.route('/')
def home():
    return render_template('depresi.html')

# Route untuk API Prediksi
@app.route('/predict', methods=['POST'])
def predict():
    # Ambil data dari form
    data = request.get_json()

    # Pastikan semua data yang diperlukan ada
    required_fields = [
        'age', 'gender', 'city', 'professionType', 'academicPressure', 'cgpa', 
        'workPressure', 'studySatisfaction', 'workStudyHours', 'financialStress', 
        'sleepDuration', 'dietaryHabits', 'haveYouEverHadSuicidalThoughts', 'familyHistoryofMentalIllnes'
    ]

    # Periksa jika ada data yang tidak ada
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

    try:
        # Mengonversi data kategorikal menggunakan LabelEncoder
        gender_encoded = le.transform([data['gender']])[0]

        # Membuat fitur berdasarkan jenis profesi
        if data['professionType'] == 'student':
            features = np.array([[
                data['age'],
                data['academicPressure'], data['cgpa'], 0  # Placeholder untuk 'workPressure' 
            ]])
        else:
            features = np.array([[ 
                data['age'],
                0, 0, data['workPressure']  # Placeholder untuk 'academicPressure' dan 'cgpa'
            ]])

        # Melakukan scaling data
        features_scaled = scaler.transform(features)

        # Pilih model berdasarkan profesi
        model = student_model if data['professionType'] == 'student' else working_model

        # Melakukan prediksi
        prediction = model.predict(features_scaled)

        # Menentukan hasil prediksi
        result = "Depression Detected" if prediction[0] == 1 else "No Depression Detected"

        # Mengembalikan hasil prediksi dalam bentuk JSON
        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
