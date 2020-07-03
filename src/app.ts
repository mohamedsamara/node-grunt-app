import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import BaseRoute from './routes';

class App {
  public app: express.Application;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    this.app = express();

    this.config();

    this.routes();
  }

  public config() {
    this.app.use(bodyParser.json());

    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug');

    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        err.status = 404;
        next(err);
      }
    );
  }

  private routes(): void {
    this.app.use(BaseRoute.path, BaseRoute.router);
  }
}

export default App;
