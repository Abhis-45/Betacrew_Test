const parsePacket = (buffer) => {
    const symbol = buffer.toString('ascii', 0, 4);
    const buySellIndicator = buffer.toString('ascii', 4, 5);
    const quantity = buffer.readInt32BE(5);
    const price = buffer.readInt32BE(9);
    const packetSeq = buffer.readInt32BE(13);

    return {
        symbol,
        buySellIndicator,
        quantity,
        price,
        packetSeq
    };
};

const findMissingSequences = (packets) => {
    const sequences = packets.map(packet => packet.packetSeq).sort((a, b) => a - b);
    const missingSequences = [];
    for (let i = sequences[0]; i <= sequences[sequences.length - 1]; i++) {
        if (!sequences.includes(i)) {
            missingSequences.push(i);
        }
    }
    return missingSequences;
};

module.exports = { parsePacket, findMissingSequences };
