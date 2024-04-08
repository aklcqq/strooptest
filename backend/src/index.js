
const { createServer } = require('./server');
const { connectDB } = require('./config/db');

async function start() {
    await connectDB();
    const { url } = await createServer(); // Await the creation
    console.log(
        `🚀 Query endpoint ready at ${url}`,
    );
}

start().catch(error => console.error('Failed to start server:', error));
