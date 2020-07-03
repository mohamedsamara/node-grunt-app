import { Request, Response } from 'express';

class NoteController {
  static async getNotes(req: Request, res: Response) {
    try {
      const notes = [
        { id: 1, title: 'Node' },
        { id: 3, title: 'Grunt' },
        { id: 3, title: 'Sass' },
        { id: 4, title: 'Pug' },
        { id: 5, title: 'TypeScript' },
        { id: 6, title: 'Nodemon' }
      ];

      res.render('notes', {
        notes
      });
    } catch (error) {
      res.render('notes', {
        error
      });
    }
  }
}

export default NoteController;
