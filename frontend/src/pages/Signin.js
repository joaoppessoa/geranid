import React from 'react';
import {Link} from 'react-router-dom';
import '../css/styleSignin.css';

class Signin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="body-log">
                <div className="form">
                    <form className="login-form">

                        <div className="title">Ger<span>ANID</span></div>

                        <i className="fas fa-user-circle"></i>
                        <input className="user-input" type="text" placeholder="E-mail" required />
                        <input className="user-input" type="password" placeholder="Senha" required />
                
                        <div className="option-01">
                            <Link className="link" to="#">Esqueceu sua senha?</Link>
                        </div>

                        <input className="btn" type="submit" value="LOGIN" />

                        <div className="option-02">
                            <p>Não tem registro? <Link to="/sign-up">Criar uma conta</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            
        )
        
    }
}

export default Signin;