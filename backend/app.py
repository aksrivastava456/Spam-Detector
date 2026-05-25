from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import string

app = Flask(__name__)

CORS(app)

# Load model and vectorizer
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

# Cleaning function
def clean_text(text):
    text = text.lower()
    text = ''.join([char for char in text if char not in string.punctuation])
    return text

# Home route
@app.route("/")
def home():
    return "Spam Detector Backend Running"

# Prediction route
@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    message = data["message"]

    cleaned_message = clean_text(message)

    message_vector = vectorizer.transform([cleaned_message])

    prediction = model.predict(message_vector)

    result = "Spam" if prediction[0] == 1 else "Not Spam"

    return jsonify({
        "prediction": result
    })

if __name__ == "__main__":
    app.run(debug=True)