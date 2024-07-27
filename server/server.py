from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Update the connection string to point to the local MongoDB instance
app.config["MONGO_URI"] = "mongodb://localhost:27017/dummy"
mongo = PyMongo(app)

# Initial dummy user
dummy_user = {
    "username": "testuser@test.com",
    "password": "testpassword"
}

# Save dummy user to DB
if not mongo.db.users.find_one({"username": dummy_user["username"]}):
    mongo.db.users.insert_one(dummy_user)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = mongo.db.users.find_one({"username": username})

    if user and user["password"] == password:
        return jsonify({"success": True, "message": "Login successful!"})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})

if __name__ == '__main__':
    app.run(debug=True)
