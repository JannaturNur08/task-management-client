import { NavLink, Outlet } from "react-router-dom";

import { FaHome, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
	const { user } = useAuth();
	return (
		<div className="flex">
			{/* dashboard side bar */}
			<div className="w-64 min-h-screen bg-[#0D1B3E] text-white">
				<ul className="menu p-4">
					{user ? (
						<>
							<li>
								<NavLink to="/">
									<FaHome></FaHome>
									Home
								</NavLink>
							</li>

							<li>
								<NavLink to="/dashboard/taskManagement">
									<FaShoppingCart></FaShoppingCart>
									Task Management
								</NavLink>
							</li>
						</>
					) : null}
					
				</ul>
				<div className="divider"></div>
			</div>
			{/* dashboard content */}
			<div className="flex-1 p-8">
				<Outlet></Outlet>
			</div>
		</div>
	);
};

export default Dashboard;
