import { Server } from 'http';

export const closeServer = async (server: Server) => {
  return new Promise<void>((res) => {
    server.close(() => res());
  });
};
