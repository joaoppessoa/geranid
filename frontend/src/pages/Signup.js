import React from 'react';
import {Link} from 'react-router-dom';
import '../css/styleSignup.css';

class Signup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="body-log-up">
                <form className="signup-form" >
                    <div className="title">Ger<span>ANID</span></div>
                    <i className="fas fa-user-plus"></i>
                    <input className="user-input" type="text" placeholder="Nome" required />
                    <input className="user-input" type="email" placeholder="e-mail" required />
                    <input className="user-input" type="password" placeholder="Senha" required />
                    <input className="btn" type="submit" value="SIGN UP" />
                    <div className="option-02">
                        <p>Já tem uma conta? <Link to="/sign-in">Sign In</Link></p>
                    </div>
                </form>
            </div>
            
        )
        
    }
}

export default Signup;