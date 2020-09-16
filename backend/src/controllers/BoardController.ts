import { Request, Response, response } from 'express';

import connection from '../database/connection';

class BoardController {
    async create(request: Request, response: Response) {
        const user_id = request.headers.authorization;

        const { workspace_id } = request.params;

        const { titulo, descricao } = request.body;

        const trx = await connection.transaction();

        try {
            const board = {
                titulo,
                descricao,
                workspace: workspace_id,
                deletado: 0
            };

            const [board_id] = await trx('boards').insert(board);

            await trx('userboard').insert({
                usuario: user_id,
                board: board_id
            });

            await trx.commit();

            return response.status(204).send();

        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }

    async index(request: Request, response: Response) {

        const { workspace_id } = request.params;

        try {
            const boards = await connection('boards AS b')
                .innerJoin('userboard AS ub', 'ub.board', '=', 'b.id')
                .where('b.workspace', workspace_id)
                .andWhere('b.deletado', 0)
                .select(['b.id', 'b.titulo', 'b.descricao']);

            return response.json(boards);
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }

    async update(request: Request, response: Response) {
        //const user_id = request.headers.authorization;

        /**
         * DEixar nessa estrutura caso a edição dependa exclusivamente 
         * dos usuários adcionados no board.
         */

        const { board_id } = request.params;

        const { titulo, descricao } = request.body;

        const trx = await connection.transaction();

        try {
            const [verify] = await trx('userboard')
                .where('board', board_id)
                .select('board');

            const boardUp = {
                titulo,
                descricao
            }

            await trx('boards')
                .where('id', verify.board)
                .update(boardUp);

            await trx.commit();

            return response.status(204).send('Sucesso');
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }

    async delete(request: Request, response: Response) {
        const { board_id } = request.params;

        //const trx = await connection.transaction();

        try {
            await connection('boards')
                .where('id', board_id)
                .update('deletado', 1);

            return response.status(204).send('Sucesso');
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }
}

export default BoardController;