import prisma from './config/db'; 
import app from './app';

const PORT = process.env.PORT || 3000;

// Start the server
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database.');

    app.listen(PORT, () => {
      console.log(`Server is running on PORT:${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

startServer();
