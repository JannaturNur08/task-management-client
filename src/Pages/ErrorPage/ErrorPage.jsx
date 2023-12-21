import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();
	return (
		<div className="text-black">
			<div
				id="error-page"
				className="mx-auto container text-center mt-20">
				<img
					className="mx-auto"
					src="https://i.ibb.co/9VmY926/oops-404-error-with-broken-robot-concept-illustration-114360-5529.jpg"
					width={400}
					alt=""
				/>
				<p className="text-xl">
					<i>{error.statusText || error.message}</i>
				</p>
				<Link to="/">
					<button className="bg-black py-3 px-4 rounded-lg text-white text-xl mt-5">
						Back to Home
					</button>
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
