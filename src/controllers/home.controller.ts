import { Request, Response } from 'express';

class HomeController {
  static async getHomePage(req: Request, res: Response) {
    try {
      res.render('index');
    } catch (error) {
      res.render('index', {
        error
      });
    }
  }
}

export default HomeController;
