import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Login/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const SignUp = () => {
    const { signUp, updateUserProfile } = useAuth();
    const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
		signUp(data.email, data.password).then((result) => {
			const newUser = result.user;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
            });
			console.log(newUser);
			updateUserProfile(data.name, data.photoURL)
				.then(() => {
					
					navigate("/login");
				})
				.catch((error) => console.log(error));
		});
	};

    return (
        <div className="lg:w-3/4 mx-auto mt-40 mb-10">
			<h2 className="font-mercellus text-4xl">SignUp</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Name</span>
					</label>
					<input
						type="text"
						{...register("name", { required: true })}
						name="name"
						placeholder="name"
						className="input input-bordered rounded"
					/>
					{errors.name && (
						<span className="text-red-500">Name is required</span>
					)}
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Email</span>
					</label>
					<input
						type="text"
						{...register("email", { required: true })}
						name="email"
						placeholder="email"
						className="input input-bordered rounded"
					/>
					{errors.email && (
						<span className="text-red-500">Email is required</span>
					)}
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Photo URL</span>
					</label>
					<input
						type="text"
						{...register("photoURL", { required: true })}
						placeholder="Photo URL"
						className="input input-bordered"
					/>
					{errors.photoURL && (
						<span className="text-red-500">
							Photo URL is required
						</span>
					)}
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Password</span>
					</label>
					<input
						type="password"
						{...register("password", {
							required: true,
							minLength: 6,
							maxLength: 20,
							pattern:
								/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
						})}
						placeholder="password"
						className="input input-bordered"
					/>
					{errors.password?.type === "required" && (
						<p className="text-red-500">Password is required</p>
					)}
					{errors.password?.type === "minLength" && (
						<p className="text-red-500">
							Password must be 6 characters
						</p>
					)}
					{errors.password?.type === "maxLength" && (
						<p className="text-red-500">
							Password must be less than 20 characters
						</p>
					)}
					{errors.password?.type === "pattern" && (
						<p className="text-red-500">
							Password must have one Uppercase one lower case, one
							number and one special character.
						</p>
					)}
					<label className="label">
						<a href="#" className="label-text-alt link link-hover">
							Forgot password?
						</a>
					</label>
				</div>
				<div className="lg:w-1/12 w-1/2  bg-primary text-white hover:bg-[#AB916C] font-mercellus text-center py-3 text-base">
					<input type="submit" value="Sign Up" />
				</div>
			</form>
			<p className="my-4">
				Already Have an Account?{" "}
				<Link className="text-black font-bold" to="/login">
					Login
				</Link>{" "}
			</p>
			<SocialLogin></SocialLogin>
		</div>
    );
};

export default SignUp;