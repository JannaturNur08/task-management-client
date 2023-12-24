import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./Navbar.css";
import logo from "../../../../public/LOGO.svg";

const Navbar = () => {
	const { user, logOut } = useAuth();

	console.log(user);
	const handleLogOut = () => {
		logOut()
			.then(() => {})
			.catch((error) => console.log(error));
	};

	const navOptions = (
		<>
			<li>
				<NavLink
					to="/"
					className={({ isActive, isPending }) =>
						isPending ? "pending" : isActive ? "active " : ""
					}>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/products"
					className={({ isActive, isPending }) =>
						isPending ? "pending" : isActive ? "active " : ""
					}>
					Dashboard
				</NavLink>
			</li>

			{!user ? (
				<li>
					<NavLink
						to="/login"
						className={({ isActive, isPending }) =>
							isPending ? "pending" : isActive ? "active " : ""
						}>
						Login
					</NavLink>
				</li>
			) : (
				""
			)}
		</>
	);
	return (
		<div>
			<div className="navbar bg-white shadow-md  sticky-header text-black ">
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex={0} className=" lg:hidden">
							<img src={logo} alt="" />
						</label>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52 font-semibold">
							{navOptions}
						</ul>
					</div>
					<div className="lg:flex items-center hidden relative">
						<img src={logo} alt="" className="w-28 ml-7" />
					</div>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="flex gap-6 px-1  font-mono text-base">
						{navOptions}
					</ul>
				</div>
				<div className="lg:hidden items-center  relative">
					<img src={logo} alt="" className="w-28" />
				</div>

				<div className="navbar-end">
					{user?.email ? (
						<>
							<div className="dropdown dropdown-end">
								<div className="flex items-center">
									<label tabIndex={0} className="">
										<p className="justify-between ">
											{user.displayName}
										</p>
									</label>
									<label
										tabIndex={0}
										className="btn btn-ghost btn-circle avatar">
										<div className="w-10 rounded-full border border-2">
											<img src={user.photoURL} />
										</div>
									</label>
								</div>
								<ul
									tabIndex={0}
									className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#002B44] rounded-box w-52">
									<li>
										<p className="justify-between">
											{user.displayName}
										</p>
									</li>
									<li>
										{user && (
											<li>
												<Link
													to="/dashboard"
													className="justify-between">
													Dashboard
												</Link>
											</li>
										)}
									</li>
									<li>
										<button
											onClick={handleLogOut}
											className="btn btn-ghost justify-between">
											LogOut
										</button>
									</li>
								</ul>
							</div>
						</>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
