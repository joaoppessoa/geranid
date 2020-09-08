import { Request, Response } from 'express';
import connection from '../database/connection';

class WorkspaceController {
    async create(request: Request, response: Response) {
        const user_id = request.headers.authorization;

        const { titulo } = request.body;

        try {
            const workspace = {
                titulo,
                usuario: user_id,
                deletado: 0
            };
            
            await connection('workspaces').insert(workspace);

            return response.status(204).send();
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    } 

    async index(request: Request, response: Response) {
        const user_id = request.headers.authorization;

        try {
            const workspaces = await connection('workspaces')
                .where('usuario', user_id)
                .andWhere('deletado', 0)
                .select(['id', 'titulo']);

            response.json(workspaces);
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }

    async update(request: Request, response: Response) {
        const user_id = request.headers.authorization;

        const {titulo} = request.body;

        console.log(titulo);

        try {
            const workspaces = await connection('workspaces')
                .where('usuario', user_id)
                .andWhere('deletado', 0)
                .update('titulo', titulo);

            return response.status(204).send();
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }
}

export default WorkspaceController;