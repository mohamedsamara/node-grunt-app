import * as express from 'express';

import NoteRoute from './note';
import HomeRoute from './home';

class BaseRoute {
  public static path = '/';

  private router = express.Router();

  private constructor() {
    this.router.use(NoteRoute.path, NoteRoute.router);
    this.router.use(HomeRoute.path, HomeRoute.router);
  }

  static get router() {
    const baseInstance = new BaseRoute();
    return baseInstance.router;
  }
}

export default BaseRoute;
