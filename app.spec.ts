import request from 'supertest';
import { server } from './app';
import { closeServer } from './tests/closeServer';
import { IUser } from './interfaces/user';

describe('Get all users request', () => {
  let id: string;
  let user: IUser;

  beforeAll(async () => {
    console.log('tests');
  });

  afterAll(async () => {
    await closeServer(server);
  });

  it('Get all users with api/users request', async () => {
    const res = await request(server).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeTruthy();
  });

    it('Post user records with api/users/id request', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        username: 'German',
        age: 70,
        hobbies: ['swimming'],
      });

    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('German');
    expect(res.body.age).toBe(70);
    expect(res.body.hobbies).toStrictEqual(['swimming']);
  });


  it('Get user with api/users/id request', async () => {
    const res = await request(server).get(`/api/users/${id}`);
    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(user);
  });


  it('Delete user  with api/users/id request', async () => {
    const res = await request(server).delete(`/api/users/${id}`);
    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual(user);
  });
});
