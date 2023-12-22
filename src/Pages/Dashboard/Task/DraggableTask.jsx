import { useDrag } from "react-dnd";

import { IconContext } from "react-icons";
import { MdDateRange, MdDeleteForever } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useTask from "../../../hooks/useTask";

const DraggableTask = ({ task }) => {
	const [, refetch] = useTask();
	const axiosPublic = useAxiosPublic();
	const [{ isDragging }, drag] = useDrag(() => ({
		type: "task",
		item: { id: task._id },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));


	console.log(isDragging);

	//delete coupon
	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosPublic.delete(`/tasks/${id}`).then((res) => {
					if (res.data.deletedCount > 0) {
						refetch();
						Swal.fire({
							title: "Deleted!",
							text: "Your task has been deleted.",
							icon: "success",
						});
					}
				});
			}
		});
	};

	return (
		<div
			ref={drag}
			className={`shadow-md hover:shadow-lg border border-white rounded-lg p-6 ${
				isDragging ? "opacity-50" : ""
			}`}>
			<p className="text-white w-max text-xs bg-blue-700 p-1 px-2 rounded-full mb-1">
				{task.priority}
			</p>

			{/* Task Title */}
			<h4 className="font-bold">{task.task_title}</h4>

			{/* Task Description */}
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

			{/* Task Deadline */}
		<div className="flex justify-between items-center">
				<div className="flex items-center  gap-1 w-max my-3">
					<IconContext.Provider
						value={{
							size: 20,
						}}>
						<MdDateRange />
					</IconContext.Provider>
					<p className="text-white text-xs bg-slate-500 p-1 px-2 rounded-full">
						{task.deadline}
					</p>
					
				</div>
				<div>
						<button className="btn bg-gray-400 hover:bg-red-500 text-white p-0 min-h-0 h-9 aspect-square" onClick={()=>handleDelete(task._id)}>
							<IconContext.Provider
								value={{
									size: 20,
								}}>
								<MdDeleteForever />
							</IconContext.Provider>
						</button>
					</div>
		</div>
		</div>
	);
};

export default DraggableTask;
