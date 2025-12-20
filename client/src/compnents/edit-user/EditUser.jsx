import { Link, useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";


export default function EditUser({
   user
}) {
    const navigate = useNavigate();
    const { registerHandler } = useContext(UserContext)
    

    const registerSubmitHandler = async (values) => {
        const { email, password, confirmPassword } = values;

        // Validation
        if (!email || !password) {
            return alert('Email and password are required!');
        }

        if (email.length < 4 ) {
            return alert('Email is invalid!');
        }

        if (password.length < 6 ) {
            return alert('Password is too short!');
        }
        
        if (password !== confirmPassword) {
            return alert('Password missmatch!');
        }

        try {
            // Register User
            registerHandler(email, password);

            // redirect to home page
            navigate('/');
        } catch (err) {
            console.error(err.message);
            //alert(err.message);
        }
    }

    
    
    const {
        register,
        formAction,
        setValues
    } = useForm(registerSubmitHandler, {
        email:'',
        password:'',
        confirmPassword:'',
    });


useEffect(() => {
    setValues(user);
}, [user._id]);
    

    return (
        <section className="auth-hero">
            {/* Close the overlay immediately */}
            <div className="auth-hero__overlay" aria-hidden="true"></div>

            {/* Now the panel wraps the form */}
            <div className="auth-panel">
                <form className="auth-card" action={formAction}>
                <h2 className="auth-title">Edit User Password</h2>
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

                    {/* Confirm Password */}
                <div className="auth-group">
                    <label htmlFor="rePassword" className="auth-label">Confirm Password</label>
                    <div className="auth-inputWrap">
                    <span className="auth-icon" aria-hidden="true">🔒</span>
                    <input
                        id="confirm-password"
                        type="password"
                        {...register('confirmPassword')}
                        placeholder="Repeat Password"
                        autoComplete="confirm-password"
                        required
                    />
                
                    </div>
                </div>
                <button type="submit" className="auth-submit">Submit</button>

                <p className="auth-status" role="status" aria-live="polite">
                    {status}
                </p>

                </form>
            </div>
        </section>
      
    );
}
