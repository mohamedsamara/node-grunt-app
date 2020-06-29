import * as express from 'express';

import NoteController from '../controllers/note.controller';

class NoteRoute {
  public static path = '/notes';

  private router = express.Router();

  private constructor() {
    this.get();
  }

  static get router() {
    const notesInstance = new NoteRoute();
    return notesInstance.router;
  }

  private async get() {
    this.router.get('/', NoteController.getNotes);
  }
}

export default NoteRoute;
