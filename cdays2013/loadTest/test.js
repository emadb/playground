var nl = require('nodeload');

nl.run({
    name: "Read",
    host: 'www.codiceplastico.com',
    port: 80,
    numUsers: 1000,
    timeLimit: 600,
    targetRps: 500,
    stats: [
        'result-codes', 
        { name: 'latency', percentiles: [0.9, 0.99] },
        'concurrency',
        'rps',
        'uniques',
        { name: 'http-errors', successCodes: [200,404], log: 'http-errors.log' }
    ],
    requestGenerator: function(client) {
        return client.request('GET', "/" , { 'host': 'localhost' });
    }
});