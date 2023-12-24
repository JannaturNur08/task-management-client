import { Link } from "react-router-dom";
import Wave from "react-wavify";

const Banner = () => {
	return (
		<div className="relative flex justify-center items-center py-36">
			<div className="">
				<h1 className="">
					Easy task <br /> management with <br />
					<span className="font-extrabold textGradEffect">
						Taskly
					</span>
				</h1>
				<p className="text-xl mt-5">Manage all your task swiftly!</p>
				<Link to="/dashboard">
					<button className="btn bg-blue-500 hover:bg-purple-400 shadow-lg hover:shadow-lg border-0 rounded-md text-xl mt-10 text-textColor">
						Let's Explore
					</button>
				</Link>
			</div>

			<div>
				<img
					src="https://i.ibb.co/JKgrCXC/Banner-image-small-3.png"
					alt=""
					width={500}
				/>
			</div>

			<Wave
				className="absolute bottom-0"
				fill="#125CB1"
				paused={false}
				style={{ display: "flex" }}
				options={{
					height: 20,
					amplitude: 30,
					speed: 0.15,
					points: 3,
				}}
			/>
			<Wave
				className="absolute bottom-0 "
				fill="#387CDC"
				paused={false}
				style={{ display: "flex" }}
				options={{
					height: 50,
					amplitude: 40,
					speed: 0.1,
					points: 3,
				}}
			/>
			<Wave
				className="absolute bottom-0 "
				fill="#FFFFFF"
				paused={false}
				style={{ display: "flex" }}
				options={{
					height: 100,
					amplitude: 40,
					speed: 0.15,
					points: 3,
				}}
			/>
		</div>
	);
};

export default Banner;
