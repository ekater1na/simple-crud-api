import * as http from 'http';
import 'dotenv/config';

import {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  removeUser,
} from './controllers/userController';

export const server = http.createServer((req, res) => {
  const path = '/api/users';
  const id = req.url.split('/')[3];

  try {
    if (req.url === path && req.method === 'GET') {
      getUsers(req, res);
    } else if (req.url === path && req.method === 'POST') {
      createUser(req, res);
    } else if (req.url.match(/\/api\/users\/\w+/)) {
      if (req.method === 'GET') {
        getUsersById(req, res, id);
      } else if (req.method === 'PUT') {
        updateUser(req, res, id);
      } else if (req.method === 'DELETE') {
        removeUser(req, res, id);
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'No answer from server' }));
  }
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
}
