import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";


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
					HOME
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/products"
					className={({ isActive, isPending }) =>
						isPending ? "pending" : isActive ? "active " : ""
					}>
					PRODUCTS
				</NavLink>
			</li>

			{!user ? (
				<li>
					<NavLink
						to="/login"
						className={({ isActive, isPending }) =>
							isPending ? "pending" : isActive ? "active " : ""
						}>
						LOGIN
					</NavLink>
				</li>
			) : (
				""
			)}
		</>
	);
    return (
        <div>
            <div className="navbar  bg-gradient-to-r from-sky-400 to-cyan-300 sticky-header text-white ">
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52 font-semibold">
							{navOptions}
						</ul>
					</div>
					<div className="lg:flex items-center hidden relative">
						<img src="https://i.ibb.co/54bvJxy/logo.png" alt="" className="w-20 h-20"/>
					<a className="btn btn-ghost  text-xl lg:text-3xl absolute ml-12  mt-2">
						Taskly
					</a>
					</div>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="flex gap-6 px-1  font-mercellus text-base">
						{navOptions}
					</ul>
				</div>
				<div className="lg:hidden items-center  relative">
						<img src="https://i.ibb.co/54bvJxy/logo.png" alt="" className="w-20 mr-20 h-20"/>
					<a className="btn btn-ghost  text-xl lg:text-3xl absolute ml-12  mt-2">
						atraTech
					</a>
					</div>
				
				<div className="navbar-end">
					{user?.email ? (
						<>
							<div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="btn btn-ghost btn-circle avatar">
									<div className="w-10 rounded-full border border-2">
										<img src={user.photoURL} />
									</div>
								</label>
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