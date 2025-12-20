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
            loginHandler(email, password);

            navigate('/');
        } catch (err) {
            console.error(err.message);
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
//         <form className="login" action={formAction}>
//             <fieldset>
//                 <h2>Login Form</h2>
            
//                 <p className="field field-icon">
//                     <label htmlFor="email"><span><i className="fas fa-envelope"></i></span></label>
//                     <input type="email" {...register('email')} placeholder="Your Email" />
//                 </p>
                
//                 <p className="field field-icon">
//                     <label htmlFor="password"><span><i className="fas fa-lock"></i></span></label>
//                     <input type="password" {...register('password')} placeholder="Password" />
//                 </p>
            
//                 <button>Login</button>
            
//                 <p className="text-center">
//                     Have an account?
//                     <Link to="/register">Register</Link>
//                 </p>

//             </fieldset>
//   </form>



<section className="auth-hero">
  {/* Close the overlay immediately */}
  <div className="auth-hero__overlay" aria-hidden="true"></div>

  {/* Now the panel wraps the form */}
  <div className="auth-panel">
    <form className="auth-card" action={formAction}>
      <h2 className="auth-title">Login</h2>
      <hr className="auth-divider" />

      {/* Email */}
      <div className="auth-group">
        <label htmlFor="email" className="auth-label">Your Email</label>
        <div className="auth-inputWrap">
          <span className="auth-icon" aria-hidden="true">📧</span>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Your Email"
            autoComplete="email"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="auth-group">
        <label htmlFor="password" className="auth-label">Password</label>
        <div className="auth-inputWrap">
          <span className="auth-icon" aria-hidden="true">🔒</span>
          <input
            id="password"
            type="password"
            {...register('password')}
            placeholder="Password"
            autoComplete="current-password"
            required
          />
        </div>
      </div>

      <button type="submit" className="auth-submit">Login</button>

      <p className="auth-status" role="status" aria-live="polite">
        {status}
      </p>

      <p className="auth-helper">
        If you don't have an account.
        <Link to="/register">Register</Link>
      </p>
    </form>
  </div>
</section>


    );
}
