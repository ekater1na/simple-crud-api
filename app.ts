import * as http from 'http';

import {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  removeUser,
} from './controllers/userController';
import 'dotenv/config';

const server = http.createServer((req, res) => {
  try {
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(req, res);
    } else if (req.url.match(/\/api\/users\/\w+/) && req.method === 'GET') {
      const id = req.url.split('/')[3];
      getUsersById(req, res, id);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else if (req.url.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
      const id = req.url.split('/')[3];
      updateUser(req, res, id);
    } else if (req.url.match(/\/api\/users\/\w+/) && req.method === 'DELETE') {
      const id = req.url.split('/')[3];
      removeUser(req, res, id);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'No answer from server' }));
  }
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
