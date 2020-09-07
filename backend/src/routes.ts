import express from 'express';

import UserController from './controllers/UserController'

const routes = express.Router();

const userController = new UserController();

routes.post('/session', userController.login);

routes.post('/users', userController.register);

routes.put('/users', userController.edit);

routes.get('/users', userController.index);

routes.delete('/users', userController.delete);

export default routes;