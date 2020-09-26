import { Router } from 'express';
import objectIdValidator from '../../middleware/objectId.validator';
import trimmer from '../../middleware/whiteSpaceTrimmer';
import verifyToken from '../../middleware/verifyToken';
import Controller from './genre.controller';
import { apiRateLimiter } from '../../middleware/rateLimiter';

const genre: Router = Router();
const genreAdmin: Router = Router();
const controller = new Controller();

// Retrieve all Genres
genre.get('/', apiRateLimiter(15, 900), controller.findAll);

// Retrieve a Specific Genre
genre.get('/:id', apiRateLimiter(15, 900), objectIdValidator, controller.findOne);

/* ADMIN */

// Retrieve all Genres
genreAdmin.get('/', verifyToken, controller.findAll);

// Retrieve a Specific Photo By Genre
genreAdmin.get('/:id', verifyToken, objectIdValidator, controller.findOne);

// Create a Genre
genreAdmin.post('/', verifyToken, trimmer, controller.create);

// Update a Genre with Id
genreAdmin.put('/:id', verifyToken, objectIdValidator, trimmer, controller.update);

// Delete a Genre with Id
genreAdmin.delete('/:id', objectIdValidator, controller.remove);

export { genre, genreAdmin };
