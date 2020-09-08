import express from 'express';

import UserController from './controllers/UserController';
import WorkspaceController from './controllers/WorkspaceController';

const routes = express.Router();

const userController = new UserController();
const workspaceController = new WorkspaceController();

routes.post('/session', userController.login);

routes.post('/users', userController.register);

routes.put('/users', userController.edit);

routes.get('/users', userController.index);

routes.delete('/users', userController.delete);


routes.post('/workspaces', workspaceController.create);

routes.get('/workspaces', workspaceController.index);

routes.put('/workspaces', workspaceController.update);

export default routes;