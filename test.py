import pickle

# Load the vectorizer and classifier
vectorizer = pickle.load(open("vectorizer_svm.pkl", 'rb'))
classifier = pickle.load(open("svm_model.pkl", 'rb'))

# Multiple test inputs
test_texts = [
    "The president met with international leaders today.",
    "Aliens just landed in the White House!",
    "Scientists discovered a cure for the common cold.",
    "Click here to win a free iPhone!"
]

# Convert raw text to feature vectors
X_test = vectorizer.transform(test_texts)

# Predict
predictions = classifier.predict(X_test)

# Print results
for i, (text, pred) in enumerate(zip(test_texts, predictions), 1):
    print(f"Test {i}:")
    print(f"Text: {text}")
    print(f"Prediction: {pred}")
    print("-" * 40)
