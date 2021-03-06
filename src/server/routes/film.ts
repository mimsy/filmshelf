import { Request, Response } from "express";

import filmController from '../../controllers/film';
import { FilmShelfRouter } from "./router";

/**
 * routes relating to films
 */
export class FilmRouter extends FilmShelfRouter {
  /**
   * add a film to the collection
   */
  public async addFilm(req: Request, res: Response) {
    const filmInfo = req.body;
    const film = await filmController.addFilm(filmInfo);
    res.send({ film });
  }

  /**
   * get a film from the collection
   */
  public async getFilm(req: Request, res: Response) {
    const filmId = req.params.id;
    const film = await filmController.getFilm(filmId);
    res.send({ film });
  }

  /**
   * edit a film in the collection
   */
  public async editFilm(req: Request, res: Response) {
    const filmId = req.params.id;
    const filmInfo = req.body;
    const film = await filmController.editFilm(filmId, filmInfo);
    res.send({ film });
  }

  /**
   * delete a film from the collection
   */
  public async deleteFilm(req: Request, res: Response) {
    const filmId = req.params.id;
    const deleted = await filmController.deleteFilm(filmId);
    res.send({ deleted });
  }

  /**
   * list the films in the collection
   */
  public async listFilms(req: Request, res: Response) {
    const sortBy = req.query.sortBy;
    const sortDir = req.query.sortDir;
    const films = await filmController.listFilms(sortBy, sortDir);
    res.send({ films });
  }

  /**
   * add handlers to routes
   */
  init() {
    this.router.post("/add", this.addFilm);
    this.router.get("/get/:id", this.getFilm);
    this.router.put("/edit/:id", this.editFilm);
    this.router.delete("/delete/:id", this.deleteFilm);
    this.router.get("/list", this.listFilms);
  }
}

// create router & export routes
const filmRoutes = new FilmRouter();
const router = filmRoutes.router;
export default router;
