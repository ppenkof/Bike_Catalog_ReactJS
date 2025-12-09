import { Link, useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import './register.css'

export default function Register() {
    const navigate = useNavigate();
    const { registerHandler } = useContext(UserContext)

    const registerSubmitHandler = async (values) => {
        const { email, password, confirmPassword } = values;

        // Validation
        if (!email || !password) {
            return alert('Email and password are required!');
        }

        if (password !== confirmPassword) {
            return alert('Password missmatch!');
        }

        try {
            // Register User
            await registerHandler(email, password);

            // redirect to home page
            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    }

    const {
        register,
        formAction,
    } = useForm(registerSubmitHandler, {
        email: '',
        password: '',
        confirmPassword: '',
    });

    return (
        // <section id="register-page" className="content auth">
        //     <form id="register" action={formAction}>
        //         <div className="container">
        //             <div className="brand-logo"></div>
        //             <h1>Register</h1>

        //             <label htmlFor="email">Email:</label>
        //             <input type="email" id="email" {...register('email')} placeholder="Your Email" />

        //             <label htmlFor="pass">Password:</label>
        //             <input type="password" id="register-password" {...register('password')} placeholder="Password" />

        //             <label htmlFor="con-pass">Confirm Password:</label>
        //             <input type="password" id="confirm-password" {...register('confirmPassword')} placeholder="Repeat Password" />

        //             <input className="btn submit" type="submit" value="Register" />
        //         </div>
        //     </form>
        // </section>

        <form className="register" action={formAction}>
            <fieldset>
            <h2>Registration Form</h2>

            {/* <!-- email --> */}
            <p className="field field-icon">
                <label htmlFor="email"><span><i className="fas fa-envelope"></i></span></label>
                <input type="email" id="email" {...register('email')} placeholder="Your Email" />
            </p>
                       
            {/* <!-- password --> */}
            <div className="passwords">
                <p className="field field-icon">
                <label htmlFor="password"><span><i className="fas fa-lock"></i></span></label>
                <input type="password" id="register-password" {...register('password')} placeholder="Password" />
                </p>
               
                {/* <!-- rePassword --> */}
                <p className="field field-icon">
                <label htmlFor="rePassword"><span><i className="fas fa-lock"></i></span></label>
                <input type="password" id="confirm-password" {...register('confirmPassword')} placeholder="Repeat Password" />
                </p>
               
            </div>

            <button>Create Account</button>

            <p className="text-center">
                Have an account?
                <Link to="/login">Log In</Link>
            </p>

            </fieldset>
        </form>

    );
}
