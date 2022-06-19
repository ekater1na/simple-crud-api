import * as User from '../models/userModel';
import { IUser } from '../interfaces/user';
import { getPostData } from '../utils/getPostData';
import { validate as isValidUUID } from 'uuid';

// @desc Get all Users
// @route GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
};

// @desc Get User bi Id
// @route GET /api/users/:id
export const getUsersById = async (req, res, id) => {
  try {
    const user = await User.findById(id);

    if (user && isValidUUID(id)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else if (user && !isValidUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User ID is invalid' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc Add User
// @route POST /api/users
export const createUser = async (req, res) => {
  try {
    const body: unknown = await getPostData(req);

    const { username, age, hobbies } = JSON.parse(body as string);

    const user: IUser = {
      username,
      age,
      hobbies,
    };

    if (user.username && user.age && user.hobbies) {
      const newUser = await User.create(user);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Please, fill required fields' }));
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc Update User
// @route PUT /api/users/:id
export const updateUser = async (req, res, id) => {
  try {
    const user: IUser = (await User.findById(id)) as IUser;

    if (user && isValidUUID(id)) {
      const body = await getPostData(req);

      const { username, age, hobbies } = JSON.parse(body as string);

      const userData: IUser = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updUser = await User.update(id, userData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updUser));
    } else if (user && !isValidUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User ID is invalid' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc Delete User
// @route DELETE /api/users/:id
export const removeUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);
    if (user && isValidUUID(id)) {
      await User.remove(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    } else if (user && !isValidUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User ID is invalid' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } catch (err) {
    console.log(err);
  }
};
