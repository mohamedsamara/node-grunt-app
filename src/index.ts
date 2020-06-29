import App from './app';
import Server from './server';

/* eslint-disable */
const app = App.bootstrap().app;

Server.start(app);
