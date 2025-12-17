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
console.log(user);
}, [user._id]);
    

    return (
        <form className="register" action={formAction}>
            <fieldset>
            <h2>Edit User Data</h2>

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

            <button>Edit Account</button>

            <p className="text-center">
                Have an account?
                <Link to="/login">Log In</Link>
            </p>

            </fieldset>
        </form>
      
    );
}
