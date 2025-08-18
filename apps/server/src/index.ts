import 'dotenv/config';
import { google } from '@ai-sdk/google';
import { trpcServer } from '@hono/trpc-server';
import { auth } from '@immo/core/auth';
import { convertToModelMessages, streamText } from 'ai';
import { Hono } from 'hono';
import { handle, streamHandle } from 'hono/aws-lambda';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { appRouter } from './routers/index';
import { createContext } from './trpc/context';

const app = new Hono();

app.use(logger());
app.use(
  '/*',
  cors({
    origin: process.env.CORS_ORIGIN || '',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext: (_opts, context) => {
      return createContext({ context });
    },
  })
);

app.post('/ai', async (c) => {
  const body = await c.req.json();
  const uiMessages = body.messages || [];
  const result = streamText({
    model: google('gemini-1.5-flash'),
    messages: convertToModelMessages(uiMessages),
  });

  return result.toUIMessageStreamResponse();
});

app.get('/', (c) => {
  return c.text('OK');
});

export const handler = process.env.SST_LIVE ? handle(app) : streamHandle(app);
