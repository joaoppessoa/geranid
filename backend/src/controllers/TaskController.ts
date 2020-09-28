import { Request, Response } from 'express';
import connection from '../database/connection';

class TaskController {
    async create(request: Request, response: Response) {
        const { titulo} = request.body 

        const{ group_id } = request.params

        const task = {
            titulo,
            status: 0,
            prioridade: 0,
            data: '',
            group: group_id,
            deletado: 0
        }

        try {
           const [task_id] = await connection('tasks').insert(task);

           return response.json({...task, id: task_id});
        } catch( err ) {
            console.log(err)
            return response.status(400).json({ error: 'Não foi possivel realizar seu cadastro.'});
        }
    }

    async index(request: Request, response: Response) {
        const { group_id } = request.params;

        try {
            const tasks = await connection('tasks AS t')
                .where('t.group', group_id)
                .andWhere('t.deletado', 0)
                .orderBy(['t.data', {column: 't.prioridade', order: 'desc'}, {column: 't.status'}])
                .select('*');

            return response.json(tasks);
        } catch(err) {
            console.log(err);
            return response.status(400).json({ error: 'Não foi possivel realizar seu cadastro.'});
        }
    } 

    async getUserForTasks (request: Request, response: Response) {
        const { task_id } = request.params;

        try {
            const usersForTask = await connection('userstasks')
                .where('task', task_id)
                .select('usuarios');

            return response.json(usersForTask);
        } catch(err) {
            return response.status(400).json({ error: 'Não foi possivel realizar seu cadastro.'});
        }
    }

    async updateTitle(request:Request, response: Response) {
        const { task_id } = request.params;

        const { titulo } = request.body;

        try { 
            await connection('tasks')
                .where('id', task_id)
                .update('titulo', titulo);

            return response.status(204).send();
            
        } catch(err) {
            console.log(err)
            return response.status(400).json({ error: 'Não foi possivel realizar seu cadastro.'});
        }
    }
}

export default TaskController;