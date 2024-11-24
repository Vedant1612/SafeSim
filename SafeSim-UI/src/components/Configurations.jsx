import { useState } from "react";
import {
  AiOutlineFile,
  AiOutlineLock,
  AiOutlineCloud,
  AiOutlineKey,
  AiOutlineDatabase,
  AiOutlineSafetyCertificate,
  AiOutlineEye,
  AiOutlineDesktop,
} from "react-icons/ai";
import axios from "axios";

const Configurations = () => {
  const [config, setConfig] = useState({
    simulate_file_operations: false,
    simulate_registry_operations: false,
    simulate_network_traffic: false,
    network_traffic: { url: "" },
    simulate_ransomware: false,
    ransomware_simulation: { target_directory: "" },
    simulate_credential_harvesting: false,
    simulate_data_exfiltration: false,
    data_exfiltration: { target_url: "" },
    simulate_persistence: false,
    simulate_rat: false,
    rat_simulation: { host: "", port: 4444 },
    simulate_screenshot_capture: false,
  });

  const handleToggleChange = (key) => (event) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [key]: event.target.checked,
    }));
  };

  const handleNestedChange = (key, field) => (event) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [key]: {
        ...prevConfig[key],
        [field]: event.target.value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://safesim.onrender.com/configurations", config);
      alert("Configurations saved successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error saving configurations:", error);
      alert("Failed to save configurations.");
    }
  };

  return (
    <div className="bg-gray-50 py-8 px-6 sm:px-8 lg:px-10">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">
        Malware Simulation Configurations
      </h2>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              key: "simulate_file_operations",
              icon: <AiOutlineFile className="text-4xl text-orange-400" />,
              label: "Simulate File Operations",
              description: "Simulates file creation, modification, and deletion.",
            },
            {
              key: "simulate_registry_operations",
              icon: <AiOutlineDatabase className="text-4xl text-orange-300" />,
              label: "Simulate Registry Operations",
              description:
                "Modifies system registry entries to mimic registry-based malware.",
            },
            {
              key: "simulate_network_traffic",
              icon: <AiOutlineCloud className="text-4xl text-orange-400" />,
              label: "Simulate Network Traffic",
              description:
                "Generates network traffic like HTTP requests and data transfers.",
              nested: { key: "network_traffic", field: "url", placeholder: "Enter target URL" },
            },
            {
              key: "simulate_ransomware",
              icon: <AiOutlineLock className="text-4xl text-orange-500" />,
              label: "Simulate Ransomware",
              description:
                "Encrypts files in a target directory to mimic ransomware behavior.",
              nested: {
                key: "ransomware_simulation",
                field: "target_directory",
                placeholder: "Enter target directory",
              },
            },
            {
              key: "simulate_credential_harvesting",
              icon: <AiOutlineKey className="text-4xl text-orange-300" />,
              label: "Simulate Credential Harvesting",
              description:
                "Collects credentials from input fields or browsers.",
            },
            {
              key: "simulate_data_exfiltration",
              icon: <AiOutlineCloud className="text-4xl text-orange-400" />,
              label: "Simulate Data Exfiltration",
              description:
                "Simulates sending data to a remote server.",
              nested: {
                key: "data_exfiltration",
                field: "target_url",
                placeholder: "Enter target URL for exfiltration",
              },
            },
            {
              key: "simulate_persistence",
              icon: <AiOutlineSafetyCertificate className="text-4xl text-orange-300" />,
              label: "Simulate Persistence",
              description:
                "Adds mechanisms for malware to persist after reboots.",
            },
            {
              key: "simulate_rat",
              icon: <AiOutlineDesktop className="text-4xl text-orange-400" />,
              label: "Simulate Remote Access Trojan (RAT)",
              description: "Simulates remote access to a device.",
              nested: {
                key: "rat_simulation",
                fields: [
                  { field: "host", placeholder: "Enter RAT host" },
                  { field: "port", placeholder: "Enter RAT port" },
                ],
              },
            },
            {
              key: "simulate_screenshot_capture",
              icon: <AiOutlineEye className="text-4xl text-orange-300" />,
              label: "Simulate Screenshot Capture",
              description:
                "Captures screenshots to mimic spyware behavior.",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="p-4 bg-gray-100 rounded-lg shadow flex items-center space-x-4 hover:bg-orange-50 transition duration-300"
            >
              {item.icon}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-orange-500">{item.label}</p>
                  <input
                    type="checkbox"
                    checked={config[item.key]}
                    onChange={handleToggleChange(item.key)}
                    className="w-6 h-6 border-gray-400 rounded focus:ring-orange-500 focus:ring-2 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm text-gray-700">{item.description}</p>
                {item.nested && (
                  <div className="mt-3">
                    {item.nested.fields ? (
                      item.nested.fields.map((nestedField) => (
                        <input
                          key={nestedField.field}
                          type="text"
                          value={config[item.nested.key][nestedField.field]}
                          onChange={handleNestedChange(
                            item.nested.key,
                            nestedField.field
                          )}
                          placeholder={nestedField.placeholder}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-orange-500 focus:ring-2"
                        />
                      ))
                    ) : (
                      <input
                        type="text"
                        value={config[item.nested.key][item.nested.field]}
                        onChange={handleNestedChange(
                          item.nested.key,
                          item.nested.field
                        )}
                        placeholder={item.nested.placeholder}
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-orange-500 focus:ring-2"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg shadow hover:bg-orange-400 transition-transform duration-300 transform hover:scale-105"
          >
            Save Configurations
          </button>
        </form>
      </div>
    </div>
  );
};

export default Configurations;
