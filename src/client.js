const net = require('net');
const { parsePacket, findMissingSequences } = require('./packetParser');

const SERVER_HOST = 'localhost';
const SERVER_PORT = 3000;

function sendRequest(socket, callType, resendSeq = null) {
    const buffer = Buffer.alloc(2);
    buffer.writeUInt8(callType, 0);
    buffer.writeUInt8(resendSeq || 0, 1);
    socket.write(buffer);
}

function fetchPackets() {
    return new Promise((resolve, reject) => {
        const packets = [];
        const socket = net.createConnection({ host: SERVER_HOST, port: SERVER_PORT }, () => {
            sendRequest(socket, 1);
        });

        socket.on('data', (data) => {
            packets.push(parsePacket(data));
        });

        socket.on('end', async () => {
            const missingSequences = findMissingSequences(packets);
            for (let seq of missingSequences) {
                await requestMissingPacket(socket, seq, packets);
            }
            resolve(packets);
        });

        socket.on('error', (err) => {
            reject(err);
        });
    });
}

function requestMissingPacket(socket, sequenceNumber, packets) {
    return new Promise((resolve) => {
        const tmpSocket = net.createConnection({ host: SERVER_HOST, port: SERVER_PORT }, () => {
            sendRequest(tmpSocket, 2, sequenceNumber);
        });

        tmpSocket.on('data', (data) => {
            packets.push(parsePacket(data));
            tmpSocket.end();
            resolve();
        });

        tmpSocket.on('error', () => {
            resolve();
        });
    });
}

module.exports = { fetchPackets };
