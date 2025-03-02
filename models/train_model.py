import os
import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import pickle

# Load data from JSON file
data_path = os.path.join(os.path.dirname(__file__), '../data/Obat-Real.json')
with open(data_path, 'r') as f:
    data = json.load(f)

# Convert to DataFrame
df = pd.DataFrame(data)

# Select features and target variable
features = df[['Indikasi', 'Kontraindikasi']]  # Using 'Indikasi' and 'Kontraindikasi' as features
target = df['Nama_Obat']  # Using 'Nama_Obat' as the target variable

# Encode categorical features
features = pd.get_dummies(features, drop_first=True)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

# Train the KNN model
model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)

# Save the model
with open('../data/knn_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model trained and saved successfully.")
