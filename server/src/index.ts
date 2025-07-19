import { Elysia } from 'elysia';

const app = new Elysia()
      .get('/', () => ({ message: 'Hello from ElysiaJS!' }))

      .get('/hello', () => "Ahoy!!!")
      .listen(3000);

console.log(
      `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
