import users from '../data/users.json';
import { v4 as uuidv4 } from 'uuid';
import { writeDataToFile } from '../utils/writeDataToFile';
import { IUser } from '../interfaces/user';

export const findAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findById = async (id: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
};

export const create = async (user: IUser) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    writeDataToFile('./data/users.json', users);
    resolve(newUser);
  });
};

export const update = async (id: string, user: IUser) => {
  return new Promise((resolve, reject) => {
    const index: number = users.findIndex((user) => user.id === id);
    users[index] = { id, ...user };

    writeDataToFile('./data/users.json', users);
    resolve(users[index]);
  });
};

export const remove = async (id: string) => {
  return new Promise<void>((resolve, reject) => {
    const deletedUser = users.filter((user) => user.id !== id);

    writeDataToFile('./data/users.json', deletedUser);
    resolve();
  });
};
