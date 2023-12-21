
import useTask from "../../../hooks/useTask";

import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import DraggableTask from "./DraggableTask";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Task = () => {
	const [tasks, refetch] = useTask();
    const axiosPublic = useAxiosPublic();
	// Define the drop target for each status
	const [, todoDrop] = useDrop({
		accept: ItemTypes.TASK,
		drop: (item) => handleDrop(item._id, "Todo"),
	});

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => handleDrop(item._id, "In-Progress"),
        
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        })
      }))

	const [, doneDrop] = useDrop({
		accept: ItemTypes.TASK,
		drop: (item) => handleDrop(item.id, "Done"),
	});

	// Function to handle drop and update task status
	const handleDrop = async (taskId, status) => {
		// Perform the API call to update the task status in the database
		// Use axios or any other method you prefer
		// After the API call, refetch the tasks to update the UI
		await updateTaskStatus(taskId, status);
		refetch();
	};

	// Function to update task status in the database
	const updateTaskStatus = async (taskId, status) => {
		// Perform the API call to update the task status in the database
		// Use axios or any other method you prefer
		// Example:
		await axiosPublic.put(`/tasks/${taskId}`, { status });
	};

	return (
		<div className="flex gap-5 p-12">
			<div className="max-w-96">
				<div className="flex gap-2 items-center bg-gray-400 p-3 rounded-lg mb-4 ">
					<div className="h-4 aspect-square  bg-gray-300 rounded-full"></div>
					<h3 className="font-bold text-white">To-Do (3)</h3>
				</div>
				<div ref={todoDrop} className="flex flex-col gap-4">
					{tasks.map((task) => (
						<DraggableTask
							key={task._id}
							task={task}
							onDrop={handleDrop}
						/>
					))}
				</div>
			</div>
			<div className="max-w-96">
				<div className="flex gap-2 items-center bg-blue-400 p-3 rounded-lg mb-4 ">
					<div className="h-4 aspect-square  bg-blue-300 rounded-full"></div>
					<h3 className="font-bold text-white">Doing (3)</h3>
				</div>
				<div ref={drop} className="w-96 h-56 border shadow-inner rounded-lg border-dashed flex items-center justify-center">
					<p className="">Drag Items Here</p>
				</div>
			</div>
			<div className="max-w-96">
				<div className="flex gap-2 items-center bg-green-400 p-3 rounded-lg mb-4 ">
					<div className="h-4 aspect-square  bg-green-300 rounded-full"></div>
					<h3 className="font-bold text-white">Done (3)</h3>
				</div>
				<div ref={doneDrop} className="w-96 h-56 border shadow-inner rounded-lg border-dashed flex items-center justify-center">
					<p className="">Drag Items Here</p>
				</div>
			</div>
		</div>
	);
};

export default Task;
