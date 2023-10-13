import http from 'http';
import express, { Request, Response } from 'express';
import { Server } from 'socket.io';
import { Firestore } from '@google-cloud/firestore';
import session from 'express-session';
import { FirestoreStore } from '@google-cloud/connect-firestore';

const {
  SESSION_SECRET = 'my-secret',
} = process.env;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const sessionMiddleware = session({
  store: new FirestoreStore({
    dataset: new Firestore(),
    kind: 'express-sessions',
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
});
app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

io.on('connection', (socket) => {
  const sessionId = (socket.request as any).session.id;

  console.log(`user ${sessionId} connected`);
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
