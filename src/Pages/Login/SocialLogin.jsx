import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";


const SocialLogin = () => {
    const { googleLogIn } = useAuth();
	
	const navigate = useNavigate();
    

	const handleGoogleSignIn = () => {
		googleLogIn()
			.then((result) => {
				console.log(result.user);
				
				Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Google Logged in successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
			})
			
	};
    return (
        <div>
            <div className=" mt-3 ">
				<button
					onClick={handleGoogleSignIn}
					className="btn btn-outline ">
					<FcGoogle className="text-3xl"></FcGoogle>
					Login with Google
				</button>
			</div>
        </div>
    );
};

export default SocialLogin;