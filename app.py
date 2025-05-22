from flask import Flask, request, render_template
import pickle
import requests
import os

app = Flask(__name__)

# Load model and vectorizer
model = pickle.load(open("logistic_model.pkl", 'rb'))
vectorizer = pickle.load(open("vectorizer.pkl", 'rb'))

# API key for Google Fact Check Tools
API_KEY = "AIzaSyCzigrdagvpYKtsRe2MA4V_7MdQAZnYmNc"

def get_correction_sources(text):
    """Fetch correction sources from fact-checking APIs"""
    sources = []
    
    # Google Fact Check API
    google_url = f"https://factchecktools.googleapis.com/v1alpha1/claims:search?query={text}&key={API_KEY}"
    try:
        response = requests.get(google_url)
        if response.status_code == 200:
            data = response.json()
            if "claims" in data:
                for claim in data["claims"]:
                    for review in claim.get("claimReview", []):
                        if review.get("url"):
                            sources.append({
                                "source": review.get("publisher", {}).get("name", "Unknown"),
                                "url": review["url"],
                                "rating": review.get("textualRating", "Unrated")
                            })
    except Exception as e:
        print(f"Google API error: {e}")
    
    return sources[:3]  # Return max 3 sources

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/prediction', methods=['POST'])
def prediction():
    news_text = request.form.get('news_input')

    if not news_text:
        return render_template("index.html", error="Please enter news content.")

    # Vectorize and predict
    X_input = vectorizer.transform([news_text])
    prediction = model.predict(X_input)[0]
    
    # Get confidence score
    if hasattr(model, "predict_proba"):
        confidence = round(model.predict_proba(X_input)[0].max() * 100, 2)
    else:
        confidence = 100.0 if prediction == "REAL" else 88.8

    result = "Fake News" if prediction == 'FAKE' else "Real News"
    
    # Get corrections if fake
    correction_sources = []
    if prediction == 'FAKE':
        correction_sources = get_correction_sources(news_text)
    
    correction_message = "This appears to be reliable information." if prediction == 'REAL' else \
        "⚠ This content may be misleading. Here are verified sources:"

    return render_template(
        "index.html",
        show_result=True,
        result=result,
        confidence=confidence,
        correction=correction_message,
        news_input=news_text,
        correction_sources=correction_sources
    )

if __name__ == '__main__':
    app.run(debug=True)