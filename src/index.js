const { fetchPackets } = require('./client');
const { writeFileSync } = require('fs');
const path = require('path');

(async () => {
    try {
        const packets = await fetchPackets();
        const outputFilePath = path.join(__dirname, '../output/data.json');
        writeFileSync(outputFilePath, JSON.stringify(packets, null, 2));
        console.log('Data saved to', outputFilePath);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
