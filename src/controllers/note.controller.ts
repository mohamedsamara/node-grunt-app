import { Request, Response } from 'express';

class NoteController {
  static async getNotes(req: Request, res: Response) {
    try {
      const notes = [
        { id: 1, name: 'note one' },
        { id: 2, name: 'note two' }
      ];

      res.render('notes', {
        notes
      });
    } catch (error) {
      res.render('index', {
        error
      });
    }
  }
}

export default NoteController;
