import { IconContext } from "react-icons";
import useTask from "../../../hooks/useTask";
import { MdDateRange } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const Task = () => {
	const [tasks, refetch] = useTask();

	return (
		<div className="flex gap-5 p-12">
			<div className="max-w-96">
				<div className="flex gap-2 items-center bg-gray-400 p-3 rounded-lg mb-4 ">
					<div className="h-4 aspect-square  bg-gray-300 rounded-full"></div>
					<h3 className="font-bold text-white">To-Do (3)</h3>
				</div>
				<div className="flex flex-col gap-4">
					{tasks.map((task) => (
						<div
							key={task._id}
							className="shadow-md hover:shadow-lg border border-white rounded-lg p-6">
							<p className="text-white w-max text-xs bg-blue-700 p-1 px-2 rounded-full mb-1">
								{task.priority}
							</p>
							<h4 className="font-bold">{task.task_title}</h4>
							<div className="flex gap-1 my-3">
								<div>
									<IconContext.Provider
										value={{
											size: 20,
										}}>
										<MdOutlineDescription />
									</IconContext.Provider>
								</div>
								<p className="text-sm">{task.description}</p>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-1 w-max my-3">
									<IconContext.Provider
										value={{
											size: 20,
										}}>
										<MdDateRange />
									</IconContext.Provider>
									<p className="text-white text-xs  bg-slate-500 p-1 px-2 rounded-full">
										{task.deadline}
									</p>
								</div>

								<button
									onClick={() => {
										refetch(task._id);
									}}
									className="btn bg-gray-400 hover:bg-red-500 text-white p-0 min-h-0 h-9 aspect-square">
									<IconContext.Provider
										value={{
											size: 20,
										}}>
										<MdDeleteForever />
									</IconContext.Provider>
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="max-w-96">
				<div className="flex gap-2 items-center bg-blue-400 p-3 rounded-lg mb-4 ">
					<div className="h-4 aspect-square  bg-blue-300 rounded-full"></div>
					<h3 className="font-bold text-white">Doing (3)</h3>
				</div>
				<div className="w-96 h-56 border shadow-inner rounded-lg border-dashed flex items-center justify-center">
					<p className="">Drag Items Here</p>
				</div>
			</div>
			<div className="max-w-96">
				<div className="flex gap-2 items-center bg-green-400 p-3 rounded-lg mb-4 ">
					<div className="h-4 aspect-square  bg-green-300 rounded-full"></div>
					<h3 className="font-bold text-white">Done (3)</h3>
				</div>
				<div className="w-96 h-56 border shadow-inner rounded-lg border-dashed flex items-center justify-center">
					<p className="">Drag Items Here</p>
				</div>
			</div>
		</div>
	);
};

export default Task;
