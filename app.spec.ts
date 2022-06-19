import request from 'supertest';
import { server } from './app';
import { closeServer } from './tests/closeServer';
import { IUser } from './interfaces/user';

let id: string;
let user: IUser;

const notUuidId = '001';
const notExistId = '499dcef0-7b55-4e04-94c9-e1ff01d419ea';

import { requiredFieldsMessage, notFoundMessage,  invalidIdMessage } from './utils/messages';

// GET ALL scenarios

describe('GET users requests', () => {
  afterAll(async () => {
    await closeServer(server);
  });

  it('Get all users with api/users request', async () => {
    const res = await request(server).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeTruthy();
  });

  it('Get all users with wrong api/user request', async () => {
    const res = await request(server).get('/api/user');

    expect(res.statusCode).toBe(404);
  });

  it('Get all users without any request from start page', async () => {
    const res = await request(server).get('');

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual('Route not found');
  });
});

// POST scenarios

describe('POST user requests', () => {
  afterAll(async () => {
    await closeServer(server);
  });

  it('Post user records with api/users/id request', async () => {
    const data = {
      username: 'German',
      age: 70,
      hobbies: ['swimming'],
    }

    const res = await request(server)
      .post('/api/users')
      .send(data)
      .set("Accept", "application/json");

    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('German');
    expect(res.body.age).toBe(70);
    expect(res.body.hobbies).toStrictEqual(['swimming']);

  });

  it('Post user records with api/users/id request with wrong field', async () => {
    const data = { name: 88 };

    const res = await request(server).post('/api/users')
    .send(data)
    .set("Accept", "application/json");    

    user = res.body;

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(requiredFieldsMessage);
  });

  it('Post user records with api/users/id request with   not existed  field', async () => {
    const data = {
      username: 'Garry',
      age: '88',
      address: 'Minsk, 15 Garden Street',
    }

    const res = await request(server).post('/api/users')
      .send(data)
      .set("Accept", "application/json");

    user = res.body;

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(requiredFieldsMessage);
  });
});

// GET user scenarios

describe('GET user requests', () => {
  afterAll(async () => {
    await closeServer(server);
  });

  it('Get user with api/users/id request', async () => {
    const res = await request(server).get(`/api/users/${id}`);
    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(user);
  });

  it('Get user with not uuid id with api/users/id request', async () => {
    const res = await request(server).get(`/api/users/${notUuidId}`);
    user = res.body;

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual(invalidIdMessage);
  });

  it('Get user with not exist id with api/users/id request', async () => {
    const res = await request(server).get(`/api/users/${notExistId}`);
    user = res.body;

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual(notFoundMessage);
  });
});

// PUT user scenarios

describe('PUT user requests', () => {
  afterAll(async () => {
    await closeServer(server);
  });

  it('Put user data with api/users/id request', async () => {
    const res = await request(server).put(`/api/users/${id}`).send({
      age: 44,
    });
    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(200);
    expect(res.body.age).toBe(44);
  });

  it('Put user data with not uuid id with api/users/id request', async () => {
    const res = await request(server).put(`/api/users/${notUuidId}`).send({
      age: 30,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(invalidIdMessage);
  });

  it('Put user data with not exist with api/users/id request', async () => {
    const res = await request(server).put(`/api/users/${notExistId}`).send({
      age: 78,
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe(notFoundMessage);
  });
});

// DELETE scenarios

describe('DELETE user requests', () => {
  afterAll(async () => {
    await closeServer(server);
  });

  it('Delete user  with api/users/id request', async () => {
    const res = await request(server).delete(`/api/users/${id}`);
    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual(user);
  });

  it('Delete user with not uuid id with api/users/id request', async () => {
    const res = await request(server).delete(`/api/users/${notUuidId}`);
    user = res.body;

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual(invalidIdMessage);
  });

  it('Delete user with not exist id with api/users/id request', async () => {
    const res = await request(server).delete(`/api/users/${notExistId}`);
    user = res.body;

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual(notFoundMessage);
  });
});

// GET deleted user scenarios

describe('GET deleted user requests', () => {
  afterAll(async () => {
    await closeServer(server);
  });

  it('Get deleted user with api/users/id request', async () => {

    const res = await request(server)
      .delete(`/api/users/${id}`)
      .get(`/api/users/${id}`)  

    expect(res).toBe(undefined);
  });

  it('Get deleted user with not uuid id with api/users/id request', async () => {
    const res = await request(server)
    .delete(`/api/users/${notUuidId}`)
    .get(`/api/users/${id}`);

    expect(res).toBe(undefined);
  });

  it('Get deleted user with not exist id with api/users/id request', async () => {
    const res = await request('server')
    .delete(`/api/users/${notUuidId}`)
    .get(`/api/users/${id}`);
    
    expect(res).toBeFalsy();
  });
});