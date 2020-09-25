import { Request, Response } from 'express';
import connection from '../database/connection';

class GroupController {
    async create(request: Request, response: Response) {
        const { board_id } = request.params;

        const { titulo, cor } = request.body;

        try {
            const group = {
                titulo,
                cor,
                board: board_id,
                deletado: 0
            }

            await connection('groups').insert(group);

            return response.json({...group});
        } catch(err) {
            console.log(err);
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }

    async index(request: Request, response: Response) {
        const { board_id } = request.params;

        try {
            const groups = await connection('groups')
                .where('board', board_id)
                .andWhere('deletado', 0)
                .select('*');

            return response.json(groups);
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }

    async update(request: Request, response: Response) {
        const { group_id } = request.params;

        const { titulo, cor } = request.body;

        try {
            const groupUp = {
                titulo,
                cor
            };

            await connection('groups')
                .where('id', group_id)
                .update(groupUp);

            return response.status(204).send();
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }
    
    async delete(request: Request, response: Response) {
        const { group_id } = request.params;

        try {
            await connection('groups')
                .where('id', group_id)
                .update('deletado', 1);

            return response.status(204).send();
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }
}

export default GroupController;