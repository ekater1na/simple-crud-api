import users from '../data/users.json';

export const findAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findById = async (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id)
    resolve(user);
  });
};