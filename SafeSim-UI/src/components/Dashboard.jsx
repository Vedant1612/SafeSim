import { useState } from "react";
import axios from "axios";
import SimulationCard from './SimulationCard';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Start Simulation
  const startSimulation = async (simulationType) => {
    setIsLoading(true);

    try {
      // Adjust simulation type to match the backend's expected values
      const validSimulationTypes = {
        "File Operations": "file_operations",
        "Ransomware": "ransomware",
        "Network Traffic": "network_traffic",
      };

      // Map the user-friendly names to the valid backend simulation types
      const backendSimulationType = validSimulationTypes[simulationType];

      if (!backendSimulationType) {
        throw new Error("Invalid simulation type.");
      }

      const response = await axios.post(`https://safesim.onrender.com/start-simulation`, { simulationType: backendSimulationType });
      alert(`${simulationType} simulation started successfully!`);
      console.log(response.data); // Handle response as needed
    } catch (error) {
      console.error("Error starting simulation:", error);
      alert(`Failed to start ${simulationType} simulation.`);
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 py-12 px-6">
      <h2 className="text-4xl font-semibold text-center text-gray-900 mb-6">Simulation Dashboard</h2>
      <p className="text-center text-lg text-gray-700 mb-12">
        Get started by simulating various system operations and monitor their progress in real time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <SimulationCard
          title="File Operations"
          description="Simulate file creation, modification, and deletion."
          onClick={() => startSimulation('File Operations')}
          progress={40} 
        />
        <SimulationCard
          title="Ransomware"
          description="Simulate ransomware encryption of files."
          onClick={() => startSimulation('Ransomware')}
          progress={60} 
        />
        <SimulationCard
          title="Network Traffic"
          description="Simulate network traffic with HTTP requests."
          onClick={() => startSimulation('Network Traffic')}
          progress={80} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
