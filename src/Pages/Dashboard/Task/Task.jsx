import { useState } from "react";
import useTask from "../../../hooks/useTask";

import DraggableTask from "./DraggableTask";

import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Task = () => {
	const [myTasks, refetch] = useTask();
	const [isModalOpen, setModalOpen] = useState(false);
	const axiosPublic = useAxiosPublic();
	const { user } = useAuth();
	const {
		register,
		handleSubmit,
		reset,
		formState: { isDirty: resetForm },
	} = useForm();

	console.log(myTasks);

	// const openModal = () => {
	// 	console.log("Opening modal");
	// 	setModalOpen(true);
	// 	console.log("isModalOpen:", isModalOpen);
	// };

	const closeModal = () => {
		setModalOpen(false);
	};

	//   const handleTaskSubmit = (data) => {
	// 	// Logic to add task using Tanstack Query
	// 	// Call your Tanstack Query mutation function here
	// 	console.log('Task submitted:', data);
	//   };

	const handleFormSubmit = async (data) => {
		setModalOpen(true);
		console.log("submitted");
		const task = {
			email: user.email,
			task_title: data.task_title,
			description: data.description,
			deadline: data.deadline,
			priority: data.priority,
			status: "Todo",
		};
		//

		const TaskRes = await axiosPublic.post("/tasks", task);

		if (TaskRes.data.insertedId > 0) {
			// show success popup
			if (resetForm) {
				reset();
			}

			refetch();
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Task is added to the database.",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<div>
			<div className="mx-auto container pl-12 ">
				<button
					className="btn bg-cyan-500 hover:bg-cyan-700 text-white"
					onClick={() =>
						document.getElementById("my_modal_1").showModal() 
					} >
					Add Task
				</button>
				{/* {
					isModalOpen && <TaskModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleTaskSubmit} />
				} */}

				<dialog className="modal" id="my_modal_1">
					<div className="modal-box">
						<form
							method="dialog"
							onSubmit={handleSubmit(handleFormSubmit)}>
							{/* Form fields */}
							<div className="flex flex-col space-y-5">
								{/* title */}
								<div className="flex items-center gap-2">
									<label className="font-bold">
										Task Title:
									</label>
									<input className="input-bordered  input"
										{...register("task_title", {
											required: true,
										})}
									/>
								</div>
								{/* description */}
								<div className="flex items-center gap-2">
									<label className="font-bold">
										Description:
									</label>
									<textarea className="input-bordered  input"
										{...register("description", {
											required: true,
										})}
									/>
								</div>
								<div className="flex items-center gap-2">
								<label className="font-bold">
									Deadline:
									
								</label>
								<input className="input-bordered  input"
										type="date"
										{...register("deadline", {
											required: true,
										})}
									/>
								</div>
								{/* priority */}
							<div className="flex items-center gap-2">
							<label className="font-bold">
									Priority:
									
								</label>
								<select 
										{...register("priority", {
											required: true,
										})}>
										<option value="high">High</option>
										<option value="medium">Medium</option>
										<option value="low">Low</option>
									</select>
							</div>

								<div className="flex gap-3 justify-end">
									<button
										type="submit"
										className="btn bg-cyan-500 text-white hover:bg-cyan-400">
										Submit
									</button>
									<button
									     onClick={() => document.getElementById("my_modal_1").close()}
										className="btn bg-slate-500 text-white hover:bg-slate-700">
										Close
									</button>
								</div>
							</div>
						</form>
					</div>
				</dialog>
			</div>
			<div className="flex gap-5 p-12">
				{/* To do */}
				<div className="max-w-96">
					<div className="flex gap-2 items-center bg-gray-400 p-3 rounded-lg mb-4 ">
						<div className="h-4 aspect-square  bg-gray-300 rounded-full"></div>
						<h3 className="font-bold text-white">To-Do (3)</h3>
					</div>
					<div className="flex flex-col gap-4">
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
					<div className="w-96 h-56 border shadow-inner rounded-lg border-dashed flex items-center justify-center">
						<p className="">Drag Items Here</p>
					</div>
				</div>
				{/* Done */}
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
		</div>
	);
};

export default Task;
