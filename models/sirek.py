from flask import Flask, jsonify, request
import pickle
import pandas as pd

app = Flask(__name__)

#  Load pre-trained model & TF-IDF Vectorizer
model_path = "data/knn_model.pkl"
tfidf_path = "data/tfidf_encoder.pkl"  # Simpan TF-IDF Vectorizer saat training
with open(model_path, 'rb') as f:
    model = pickle.load(f)
with open(tfidf_path, 'rb') as f:
    tfidf = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    # Ambil input dari JSON atau Form Data
    if request.is_json:
        data = request.get_json()
    else:
        data = request.form

    indikasi = data.get('Indikasi')
    kontraindikasi = data.get('Kontraindikasi')

    if not indikasi or not kontraindikasi:
        return jsonify({'error': 'Missing Indikasi or Kontraindikasi'}), 400

    try:
        #Ubah input teks menjadi vektor numerik menggunakan TF-IDF
        input_text = [f"{indikasi} {kontraindikasi}"]
        input_vector = tfidf.transform(input_text)

        # Prediksi menggunakan model KNN
        predictions = model.predict(input_vector)

        return jsonify({'predictions': predictions.tolist()})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
