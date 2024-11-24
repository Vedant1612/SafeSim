from flask import Flask, request, jsonify
from flask_cors import CORS
import utils  # Assuming your utility functions are defined in a module named `utils`

app = Flask(__name__)

# Configure CORS to allow requests from the frontend
cors = CORS(app, resources={
    r"/*": {"origins": ["https://safe-sim.vercel.app"]}  # Replace with your actual frontend URL
})

# Root route
@app.route('/')
def home():
    return "SafeSim is running!"  # Optional: Replace with an HTML page or message

# Simulation route (POST request)
@app.route('/start-simulation', methods=['POST', 'OPTIONS'])
def simulate():
    if request.method == 'OPTIONS':
        return '', 200  # Handle preflight requests (CORS)

    data = request.json
    simulation_type = data.get('type')

    # Call utility function to start simulation
    try:
        result = utils.run_simulation(simulation_type)
        return jsonify({
            "message": f"Simulation {simulation_type} started.",
            "status": "success",
            "result": result  # Optionally include additional results
        })
    except Exception as e:
        return jsonify({
            "message": "An error occurred while starting the simulation.",
            "status": "error",
            "error": str(e)
        }), 500

# Logs route (GET request)
@app.route('/logs', methods=['GET'])
def get_logs():
    try:
        logs = utils.get_logs()
        return jsonify({"logs": logs})
    except Exception as e:
        return jsonify({
            "message": "An error occurred while fetching logs.",
            "status": "error",
            "error": str(e)
        }), 500

# Configuration route (POST request)
@app.route('/configurations', methods=['POST'])
def save_config():
    config_data = request.json

    # Save configuration using utility function
    try:
        success = utils.save_configuration(config_data)
        return jsonify({"status": "success" if success else "error"})
    except Exception as e:
        return jsonify({
            "message": "An error occurred while saving configuration.",
            "status": "error",
            "error": str(e)
        }), 500

# Entry point
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)  # Ensure it's accessible externally
