const { spawn } = require('child_process');
const os = require('os');

// Get Network IP
const interfaces = os.networkInterfaces();
let networkIp = 'localhost';
for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
        if ('IPv4' === iface.family && !iface.internal) {
            networkIp = iface.address;
            break;
        }
    }
}

const PORT = 3001;

console.log(`\n> Starting server on Network...`);
console.log(`> Local:   http://localhost:${PORT}`);
console.log(`> Network: http://${networkIp}:${PORT}\n`);

const next = spawn('npm', ['exec', 'next', 'dev', '--', '-H', '0.0.0.0', '-p', PORT.toString()], {
    stdio: 'inherit',
    shell: true
});

next.on('close', (code) => {
    process.exit(code);
});
