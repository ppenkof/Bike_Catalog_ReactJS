import { Link, useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import './login.css'

export default function Login() {
    const navigate = useNavigate();
    const { loginHandler } = useContext(UserContext);

    const submitHandler = async ({ email, password }) => {
        if (!email || !password) {
            return alert('Email and password are required!');
        }

        try {
            await loginHandler(email, password);

            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    }

    const {
        register,
        formAction,
    } = useForm(submitHandler, {
        email: '',
        password: '',
    });

    return (
        <form className="login" action={formAction}>
            <fieldset>
                <h2>Login Form</h2>
            
                <p className="field field-icon">
                    <label htmlFor="email"><span><i className="fas fa-envelope"></i></span></label>
                    <input type="email" {...register('email')} placeholder="Your Email" />
                </p>
                
                <p className="field field-icon">
                    <label htmlFor="password"><span><i className="fas fa-lock"></i></span></label>
                    <input type="password" {...register('password')} placeholder="Password" />
                </p>
            
                <button>Login</button>
            
                <p className="text-center">
                    Have an account?
                    <Link to="/register">Register</Link>
                </p>

            </fieldset>
  </form>
    );
}
