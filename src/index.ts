import dotenv from 'dotenv';
// load all environment variables
dotenv.config();

import app from './app';

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('UNCAUGHT EXCEPTION 🚫 Shutting down....');
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
// eslint-disable-next-line
const start = async () => {
  const server = app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
  });

  process.on('unhandledRejection', (err) => {
    console.log(err);
    console.log('UNHANDLED REJECTION 🚫 Shutting down ....');
    server.close(() => {
      process.exit(1);
    });
  });
};

start();
