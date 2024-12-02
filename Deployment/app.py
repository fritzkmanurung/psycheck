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

# Route untuk halaman from student
@app.route('/student', methods=['POST'])
def form_student():
    # Ambil data dari form
    data_student = request.get_json()
    
    # Pastikan semua data yang diperlukan ada
    required_fields_student = [
        'student-age', 'academicPressure', 'cgpa', 'studySatisfaction', 'studentWorkStudyHours', 
        'studentFinancialStress', 'student-gender', 'studentSleepDuration', 'studentDietaryHabits', 
        'studentHaveYouEverHadSuicidalThoughts', 'studentFamilyHistoryofMentalIllnes'
    ]
    
    # Periksa jika ada data yang tidak ada
    missing_fields_student = [field for field in required_fields_student if field not in data_student]
    if missing_fields_student:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields_student)}"}), 400

    try:
        # Mengonversi data kategorikal menggunakan LabelEncoder
        gender_student_encoded = le.transform([data_student['student-gender']])[0]

        # Membuat fitur berdasarkan jenis profesi
        features_student = np.array([[
            data_student['student-age'],
            data_student['academicPressure'], 
            data_student['cgpa'],
            data_student['studySatisfaction'],
            data_student['studentWorkStudyHours'],
            data_student['studentFinancialStress'],
            gender_student_encoded,
            data_student['studentSleepDuration'],
            data_student['studentDietaryHabits'],
            data_student['studentHaveYouEverHadSuicidalThoughts'],
            data_student['studentFamilyHistoryofMentalIllnes'],
            ]])

        # Melakukan scaling data_student
        features_student_scaled = scaler.transform(features_student)

        # Pilih model berdasarkan profesi
        model = student_model

        # Melakukan prediksi
        prediction = model.predict(features_student_scaled)

        # Menentukan hasil prediksi
        result = "Depression Detected" if prediction[0] == 1 else "No Depression Detected"

        # Mengembalikan hasil prediksi dalam bentuk JSON
        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

# Route untuk halaman from working
@app.route('/working', methods=['POST'])
def form_working():
    # Ambil data dari form
    data_working = request.get_json()
    
    # Pastikan semua data yang diperlukan ada
    required_fields_working = [
        'working-age', 'workPressure', 'jobSatisfaction', 'workingWorkStudyHours', 
        'workingFinancialStress', 'working-gender', 'workingSleepDuration', 'workingDietaryHabits', 
        'workingHaveYouEverHadSuicidalThoughts', 'workingFamilyHistoryofMentalIllnes'
    ]
    
    # Periksa jika ada data yang tidak ada
    missing_fields_working = [field for field in required_fields_working if field not in data_working]
    if missing_fields_working:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields_working)}"}), 400

    try:
        # Mengonversi data kategorikal menggunakan LabelEncoder
        gender_working_encoded = le.transform([data_working['working-gender']])[0]

        # Membuat fitur berdasarkan jenis profesi
        features_working = np.array([[
            data_working['working-age'],
            data_working['workPressure'],
            data_working['jobSatisfaction'],
            data_working['workingWorkStudyHours'],
            data_working['workingFinancialStress'],
            gender_working_encoded,
            data_working['workingSleepDuration'],
            data_working['workingDietaryHabits'],
            data_working['workingHaveYouEverHadSuicidalThoughts'],
            data_working['workingFamilyHistoryofMentalIllnes'],
            ]])

        # Melakukan scaling data_working
        features_working_scaled = scaler.transform(features_working)

        # Pilih model berdasarkan profesi
        model = working_model

        # Melakukan prediksi
        prediction = model.predict(features_working_scaled)

        # Menentukan hasil prediksi
        result = "Depression Detected" if prediction[0] == 1 else "No Depression Detected"

        # Mengembalikan hasil prediksi dalam bentuk JSON
        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500



if __name__ == '__main__':
    app.run(debug=True)
