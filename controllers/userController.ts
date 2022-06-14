import * as User from '../models/userModel';
import { IUser } from '../interfaces/user';

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
// @route GET /api/user/:id
export const getUsersById = async (req, res, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc Add User
// @route POST /api/user/:id
export const createUser = async (req, res) => {
  try {
    const user: IUser = {
      username: 'test check',
      age: 36,
      hobbies: ['food'],
    };

    const newUser = await User.create(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });

    return res.end(JSON.stringify(newUser));
  } catch (err) {
    console.log(err);
  }
};
