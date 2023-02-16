import http from 'http';
import express from 'express';
import cors from "cors";
import { Server } from 'colyseus';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { monitor } from '@colyseus/monitor';

import { TicTacToe } from "./rooms/tictactoe"

const app = express();
const port = Number(process.env.PORT || 8080);

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
  transport: new WebSocketTransport({ server: server })
});

gameServer.define('tictactoe', TicTacToe);

app.use('/colyseus', monitor())

gameServer.listen(port);

app.use(express.static(__dirname + "/../frontend/public"));
console.log(`Listening on ws://localhost:${ port }`);
