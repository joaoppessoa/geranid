import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import connection from '../database/connection';

class UserController {
    async register ( request: Request, response: Response) {
        const { nome, email, password } = request.body;

        try {
            const [emailVerification] = await connection('usuarios')
            .where('email', email)
            .count('* AS exist');
            
            if(emailVerification.exist !== 0) {
                return response.status(400).json({ error: 'Já tem alguém com esse email, use outro.' });
            }

            const salt = bcryptjs.genSaltSync(10);
            const hash = bcryptjs.hashSync(password, salt);

            const usuario = {
                nome, 
                email,
                password: hash,
                deletado: 0
            };

            const [ id_usuario ] = await connection('usuarios').insert(usuario);

            return response.json({ message: 'Cadastro realizado com sucesso.' });
        } catch(err) {
            return response.status(400).json({ error: 'Não foi possivel realizar seu cadastro.'});
        }
    }

    /*async index (request: Request, response: Response) {
        const id_session = request.headers.authorization;

        const user = await connection('usuarios')
        .where('id', id_session)
        .select(['id', 'nome']);

        return response.json(user)
    }*/

    async login (request: Request, response: Response) {
        const { email, password } = request.body;

        try {
            const [dados] = await connection('usuarios')
                .where('email', email)
                .andWhere('deletado', 0)
                .select('*');

            if(!dados || bcryptjs.compareSync(password, dados.password) === false) {
                return response.status(404).json({ error: 'O E-mail ou a Senha está incorreto(a).' });
            }

            const session = {  
                id: dados.id,
                nome: dados.nome,
                email: dados.email,
                status: dados.deletado 
            };

            return response.json(session);

        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }

    async edit (request: Request, response: Response) {
        const id_session = request.headers.authorization;

        const { nome, email } = request.body;

        try {
            const user = {
                nome,
                email
            };

            await connection('usuarios').where('id', id_session).update(user);

            return response.status(204).send();
            
        } catch(err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }
    }

    async delete (request: Request, response: Response) {
        const id_session = request.headers.authorization;

        try {
            await connection('usuarios').where('id', id_session).update('deletado', 1);

            return response.status(204).send();
            
        } catch (err) {
            return response.status(400).json({ error: 'Houve algum erro no servidor.' });
        }     
    }

}

export default UserController