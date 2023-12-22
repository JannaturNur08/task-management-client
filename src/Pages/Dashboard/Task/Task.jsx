
import { useState } from "react";
import useTask from "../../../hooks/useTask";


import DraggableTask from "./DraggableTask";
import TaskModal from "./TaskModal";


const Task = () => {
	const [myTasks, refetch] = useTask();
	const [isModalOpen, setModalOpen] = useState(false);
    
	console.log(myTasks);

	const openModal = () => {
		console.log("Opening modal");
		setModalOpen(true);
		console.log("isModalOpen:", isModalOpen);
	  };
	
	  const closeModal = () => {
		setModalOpen(false);
	  };

	  const handleTaskSubmit = (data) => {
		// Logic to add task using Tanstack Query
		// Call your Tanstack Query mutation function here
		console.log('Task submitted:', data);
	  };
	

	return (
		<div>
			<div className="mx-auto container pl-12 ">
				<button className="btn bg-cyan-500 hover:bg-cyan-700 text-white"  onClick={openModal}>Add Task</button>
				{
					isModalOpen && <TaskModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleTaskSubmit} />
				}
			</div>
			<div className="flex gap-5 p-12">
			{/* To do */}
			<div className="max-w-96">
				
				<div className="flex gap-2 items-center bg-gray-400 p-3 rounded-lg mb-4 ">
					<div className="h-4 aspect-square  bg-gray-300 rounded-full"></div>
					<h3 className="font-bold text-white">To-Do (3)</h3>
				</div>
				<div  className="flex flex-col gap-4">
					{myTasks.map((task) => (
						<DraggableTask
							key={task._id}
							task={task}
							refetch={refetch}
						/>
					))}
				</div>
			</div>
			{/* In progress */}
			<div className="max-w-96">
				<div className="flex gap-2 items-center bg-blue-400 p-3 rounded-lg mb-4 ">
					<div className="h-4 aspect-square  bg-blue-300 rounded-full"></div>
					<h3 className="font-bold text-white">Doing (3)</h3>
				</div>
				<div  className="w-96 h-56 border shadow-inner rounded-lg border-dashed flex items-center justify-center">
					<p className="">Drag Items Here</p>
				</div>
			</div>
			{/* Done */}
			<div className="max-w-96">
				<div className="flex gap-2 items-center bg-green-400 p-3 rounded-lg mb-4 ">
					<div className="h-4 aspect-square  bg-green-300 rounded-full"></div>
					<h3 className="font-bold text-white">Done (3)</h3>
				</div>
				<div  className="w-96 h-56 border shadow-inner rounded-lg border-dashed flex items-center justify-center">
					<p className="">Drag Items Here</p>
				</div>
			</div>
		</div>
		
  
		</div>
	);
};

export default Task;
