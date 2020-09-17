import { Request, Response } from 'express';
import connection from '../database/connection';

class WorkspaceController {
    async create(request: Request, response: Response) {
        const user_id = request.headers.authorization;

        const { titulo } = request.body;

        const trx = await connection.transaction();

        try {
            const workspace = {
                titulo,
                deletado: 0
            };
            
           const [workspace_id] = await trx('workspaces').insert(workspace);

           const tablePivor = {
               usuario: user_id,
               workspace: workspace_id
           };

           await trx('responsibleworkspace').insert(tablePivor);

           await trx.commit();

            return response.json({ 
                id: workspace_id,
                titulo
            });

        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    } 

    async index(request: Request, response: Response) {
        const user_id = request.headers.authorization;

        try {
            const workspaces = await connection('workspaces AS w')
                .innerJoin('responsibleworkspace AS rw', 'rw.workspace', '=', 'w.id')
                .where('rw.usuario', user_id)
                .andWhere('w.deletado', 0)
                .select(['w.id', 'w.titulo']);

            response.json(workspaces);
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }

    async update(request: Request, response: Response) {
        const user_id = request.headers.authorization;

        const {workspace_id} = request.params;

        const {titulo} = request.body;

        const trx = await connection.transaction();

        try {
            const [verify] = await trx('responsibleworkspace')
                .where('usuario', user_id)
                .andWhere('workspace', workspace_id)
                .select('workspace');

            await trx('workspaces')
                .where('id', verify.workspace)
                .update('titulo', titulo);

            await trx.commit();

            return response.status(204).send();
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }

    async delete(request: Request, response: Response) {
        const user_id = request.headers.authorization;

        const {workspace_id} = request.params;

        const trx = await connection.transaction();

        try {
            const [verify] = await trx('responsibleworkspace')
                .where('usuario', user_id)
                .andWhere('workspace', workspace_id)
                .select('workspace');

            await trx('workspaces')
                .where('id', verify.workspace)
                .update('deletado', 1);

            await trx.commit();

            return response.status(204).send();
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }
}

export default WorkspaceController;