import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";


const Login = () => {
    const { logIn } = useAuth();
	const [errors, setErrors] = useState("");
	const navigate = useNavigate();
    const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		setErrors("");
		logIn(email, password)
			.then((result) => {
				const loggedInUser = result.user;
				//navigate(location?.state ? location?.state : "/");

				console.log(loggedInUser);
				Swal.fire({
					title: "User Login Successful.",
					showClass: {
						popup: "animate__animated animate__fadeInDown",
					},
					hideClass: {
						popup: "animate__animated animate__fadeOutUp",
					},
				});
				navigate('/dashboard');
			})
			.catch((error) => {
				const errorCode = error.code;
				if (errorCode === "auth/invalid-login-credentials")
					//alert('email and password does not match' );
					setErrors("Email or password does not match");
			});
	};
    return (
        <div className="lg:w-3/4 mx-auto mt-40">
        <h2 className="font-mercellus text-4xl">Login</h2>
        <form onSubmit={handleLogin}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    className="input input-bordered rounded"
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered rounded"
                />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                    </a>
                </label>
                <p className="text-left font-bold text-red-700">{errors}</p>
            </div>
            <div className="lg:w-1/12 w-1/2  bg-primary text-white hover:bg-[#AB916C] font-mercellus text-center py-3 text-base">
                <input type="submit" value="Login" />
            </div>
            <SocialLogin></SocialLogin>
        </form>
        <p className="my-4">
            New User?{" "}
            <Link className="text-black font-bold" to="/signup">
                Sign Up
            </Link>{" "}
        </p>
    </div>
    );
};

export default Login;