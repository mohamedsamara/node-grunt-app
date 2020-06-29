import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

class App {
  public app: express.Application;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    this.app = express();

    this.config();

    this.api();
  }

  public config() {
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug');

    this.app.use(bodyParser.json());

    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

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

  public api() {}
}

export default App;
