import * as express from 'express';

import HomeController from '../controllers/home.controller';

class HomeRoute {
  public static path = '/';

  private router = express.Router();

  private constructor() {
    this.get();
  }

  static get router() {
    const homeInstance = new HomeRoute();
    return homeInstance.router;
  }

  private async get() {
    this.router.get('/', HomeController.getHomePage);
  }
}

export default HomeRoute;
