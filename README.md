# BetaCrewClient

A Node.js client application to interact with the BetaCrew mock exchange server. This client requests and receives stock ticker data from the server and generates a JSON file containing all packets without any missing sequences.

## Project Structure


Here's a sample README.md file for your project:

markdown
Copy code
# BetaCrewClient

A Node.js client application to interact with the BetaCrew mock exchange server. This client requests and receives stock ticker data from the server and generates a JSON file containing all packets without any missing sequences.

## Project Structure

BetaCrewClient/
│
├── src/
│ ├── index.js # Main entry point of the application
│ ├── client.js # Handles connection to the BetaCrew server and data retrieval
│ ├── packetParser.js # Parses the binary data received from the server
│
├── output/
│ └── data.json # JSON output containing all the packets (This file will be generated)
│
├── package.json # NPM package file
└── README.md # Documentation


## Installation

1. **Clone the Repository**

https://github.com/Abhis-45/betacrew_test.git

Install Dependencies

Run the following command to install the required dependencies:

npm install
Running the Client
Ensure the Server is Running

Make sure the BetaCrew mock exchange server is running on localhost:3000.

Start the Client

Run the client application to connect to the server and retrieve data:

npm start
Output

The client will generate a JSON file containing all packets in the output/ directory as data.json.

Code Explanation
1. src/index.js
This is the main entry point of the application.
It imports the fetchPackets function from client.js, retrieves the packets, and writes them to output/data.json.
2. src/client.js
This file handles the connection to the BetaCrew server.
It sends requests to the server, handles the response, and retrieves the packets.
The missing sequences are identified and retrieved from the server to ensure no data is lost.
3. src/packetParser.js
This module parses the binary data received from the server into structured objects.
It also identifies any missing sequences in the data.

Testing and Validation
Ensure the server is running on localhost:3000.
Run the project using npm start.
Verify the output: The generated data.json file should contain all packets, with no missing sequences.
