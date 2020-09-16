import express from 'express';

import UserController from './controllers/UserController';
import WorkspaceController from './controllers/WorkspaceController';
import BoardController from './controllers/BoardController';
import GroupController from './controllers/GroupController';

const routes = express.Router();

const userController = new UserController();
const workspaceController = new WorkspaceController();
const boardController = new BoardController();
const groupController = new GroupController();

routes.post('/session', userController.login);

routes.post('/users', userController.register);

routes.put('/users', userController.edit);

//routes.get('/users', userController.index);

routes.delete('/users', userController.delete);


routes.post('/workspaces', workspaceController.create);

routes.get('/workspaces', workspaceController.index);

routes.put('/workspaces/:workspace_id', workspaceController.update);

routes.delete('/workspaces/:workspace_id', workspaceController.delete);


routes.post('/boards/:workspace_id', boardController.create);

routes.get('/boards/:workspace_id', boardController.index);

routes.put('/boards/:board_id', boardController.update);

routes.delete('/boards/:board_id', boardController.delete);



routes.post('/groups/:board_id', groupController.create);

routes.get('/groups/:board_id', groupController.index);

routes.put('/groups/:group_id', groupController.update);

routes.delete('/groups/:group_id', groupController.delete);

export default routes;