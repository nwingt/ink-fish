import http from 'http';
import express, { Request, Response } from 'express';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

io.on('connection', () => {
  console.log('a user connected');
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
