from flask import Flask, request, jsonify
from flask_cors import CORS
import utils  # Assuming utility functions are here

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

# Example endpoints
@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.json
    simulation_type = data.get('type')
    result = utils.run_simulation(simulation_type)
    return jsonify({"message": f"Simulation {simulation_type} started.", "status": "success"})

@app.route('/logs', methods=['GET'])
def get_logs():
    logs = utils.get_logs()  # Fetch logs from a function or file
    return jsonify({"logs": logs})

@app.route('/save-config', methods=['POST'])
def save_config():
    config_data = request.json
    success = utils.save_configuration(config_data)
    return jsonify({"status": "success" if success else "error"})

if __name__ == '__main__':
    app.run(debug=True)
