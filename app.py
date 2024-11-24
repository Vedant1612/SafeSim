from flask import Flask, request, jsonify
from flask_cors import CORS

import utils  # Assuming your utility functions are defined in a module named `utils`

app = Flask(__name__)

# Configure CORS to allow requests from the frontend
cors = CORS(app, resources={
    r"/*": {"origins": ["https://safe-sim.vercel.app"]}
})

# Root route
@app.route('/')
def home():
    return "SafeSim is running!"  # Optional: Replace with an HTML page or message

# Simulation route (POST request)
@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.json
    simulation_type = data.get('type')

    # Call utility function to start simulation
    result = utils.run_simulation(simulation_type)

    return jsonify({
        "message": f"Simulation {simulation_type} started.",
        "status": "success",
        "result": result  # Optionally include additional results
    })

# Logs route (GET request)
@app.route('/logs', methods=['GET'])
def get_logs():
    logs = utils.get_logs()

    return jsonify({"logs": logs})

# Configuration route (POST request)
@app.route('/configurations', methods=['POST'])
def save_config():
    config_data = request.json

    # Save configuration using utility function
    success = utils.save_configuration(config_data)

    return jsonify({"status": "success" if success else "error"})

# Entry point
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)  # Ensure it's accessible externally
