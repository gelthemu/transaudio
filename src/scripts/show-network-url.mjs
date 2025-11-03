import os from "os";

const interfaces = os.networkInterfaces();
const addresses = [];

Object.keys(interfaces).forEach((interfaceName) => {
  interfaces[interfaceName].forEach((iface) => {
    if (iface.family === "IPv4" && !iface.internal) {
      addresses.push(iface.address);
    }
  });
});

process.stdin.on("data", (data) => {
  process.stdout.write(data);
});

setTimeout(() => {
  if (addresses.length > 0) {
    console.log("\nYou can also access your app at:");
    addresses.forEach((addr) => {
      console.log(` - http://${addr}:5173`);
    });
  }
}, 1000);
