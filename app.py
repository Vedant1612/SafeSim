from flask import Flask, request, jsonify
from flask_cors import CORS
import utils

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from the frontend

# Root route
@app.route('/')
def home():
    return "SafeSim is running!"  # You can also render an HTML page if needed for home

# Simulation route (POST request)
@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.json
    simulation_type = data.get('type')
    result = utils.run_simulation(simulation_type)
    return jsonify({"message": f"Simulation {simulation_type} started.", "status": "success"})

# Logs route (GET request)
@app.route('/logs', methods=['GET'])
def get_logs():
    logs = utils.get_logs()
    return jsonify({"logs": logs})

# Configuration route (POST request)
@app.route('/configurations', methods=['POST'])
def save_config():
    config_data = request.json
    success = utils.save_configuration(config_data)
    return jsonify({"status": "success" if success else "error"})

if __name__ == '__main__':
    app.run(debug=False)
