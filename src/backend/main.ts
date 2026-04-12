import index from '../frontend/index.html';
import { Service } from "./service";

const server = Bun.serve({
  port: 3000,
  development: Bun.env.NODE_ENV !== "production",
  routes: {
    '/': index,

    "/api/subscribers": {
      POST: async (request) => {
        const { email } = await request.json() as { email: string };
        const { message, type, status } = await Service.createSubscriber(email);
        return Response.json({ message, type }, { status });
      },
    },
  },
});

console.log(`Server running at ${server.url}`);
