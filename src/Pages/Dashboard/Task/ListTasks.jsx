import { useState } from "react";
import useTask from "../../../hooks/useTask";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { IconContext } from "react-icons";
import {
	MdDateRange,
	MdDeleteForever,
	MdOutlineDescription,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const ListTasks = () => {
	const [myTasks, setMyTasks] = useTask();
	const { user } = useAuth();
	const [, refetch] = useTask();
	const [draggedTaskId, setDraggedTaskId] = useState([]);
	const axiosPublic = useAxiosPublic();

	const dragEnter = (event) => {
		event.currentTarget.classList.add("drop");
	};
	const dragLeave = (event) => {
		event.currentTarget.classList.remove("drop");
	};
	const drag = (event, taskId) => {
		taskId = String(event.currentTarget.dataset.id);
		// event.dataTransfer.setData("text/plain", taskId.toString());
		event.dataTransfer.setData("text/plain", taskId);

		//console.log(taskId);
		setDraggedTaskId(taskId);
		//console.log(draggedTaskId);
	};
	console.log(myTasks);

	const drop = async (event, column) => {
		const taskId = event.dataTransfer.getData("text/plain");
		//  console.log(taskId);
		//console.log(event);
		event.currentTarget.classList.remove("drop");
		//event.preventDefault();

		//const taskId = parseInt(event.dataTransfer.getData("text/plain"), 10);

		console.log("Dropped task ID:", taskId);
		console.log("Column:", column);

		if (draggedTaskId === taskId) {
			try {
				// Update the status in the database using Axios
				const response = await axiosPublic.put(`/tasks/${taskId}`, {
					status: column,
				});

				console.log("Backend response:", response.data);

				if (response.data.success) {
					// Update the state after a successful database update
					// const updatedState = myTasks.map((task) => {
					// 	if (task._id === taskId) {
					// 		task.status = column;
					// 	}
					// 	return task;
					// });
					setMyTasks((prevTasks) => {
						return prevTasks.map((task) => {
							if (task._id === taskId) {
								task.status = column;
							}
							return task;
						});
					});

					//refetch(updatedState);
					//location.reload();
					//refetch();
					setDraggedTaskId(null);
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: "Status is updated to the database.",
						showConfirmButton: false,
						timer: 1500,
					});
					//refetch();
				} else {
					console.error(
						"Failed to update task status in the database"
					);
				}
			} catch (error) {
				console.error("Error updating task status:", error);
			}
		}

		//setDraggedTaskId(null);
	};
	const allowDrop = (event) => {
		event.preventDefault();
		//refetch();
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { isDirty: resetForm },
	} = useForm();

	console.log(myTasks);

	const handleFormSubmit = async (data) => {
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

	//delete task
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
		<main className="board">
			<div className="mx-auto container pl-12 ">
				<button
					className="btn bg-cyan-500 hover:bg-cyan-700 text-white"
					onClick={() =>
						document.getElementById("my_modal_1").showModal()
					}>
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
									<input
										className="input-bordered  input"
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
									<textarea
										className="input-bordered  input"
										{...register("description", {
											required: true,
										})}
									/>
								</div>
								<div className="flex items-center gap-2">
									<label className="font-bold">
										Deadline:
									</label>
									<input
										className="input-bordered  input"
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
										onClick={() =>
											document
												.getElementById("my_modal_1")
												.close()
										}
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
				{/* todo */}
				<div
					className="column column-todo bg-gray-300 w-72 "
					data-column="todo"
					onDragEnter={dragEnter}
					onDragLeave={dragLeave}
					onDragOver={allowDrop}
					onDrop={(event) => drop(event, "todo")}>
					<h2>Todo</h2>
					{myTasks
						.filter((card) => card.status === "todo")
						.map((task) => (
							<div
								key={task._id}
								draggable="true"
								onDragStart={(event) => drag(event, task._id)}
								data-id={task._id}
								style={{ cursor: "move" }}
								className="shadow-md hover:shadow-lg border border-white rounded-lg p-6">
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
									<p className="text-sm">
										{task.description}
									</p>
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
										<button
											className="btn bg-gray-400 hover:bg-red-500 text-white p-0 min-h-0 h-9 aspect-square"
											onClick={() =>
												handleDelete(task._id)
											}>
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
						))}
				</div>

				{/* in progress */}
				<div
					className="column column-ip  w-72"
					data-column="In-Progress"
					onDragEnter={dragEnter}
					onDragLeave={dragLeave}
					onDragOver={allowDrop}
					onDrop={(event) => drop(event, "In-Progress")}>
					<h2>In-Progress</h2>
					{myTasks
						.filter((card) => card.status === "In-Progress")
						.map((task) => (
							// <article
							// 	key={todo._id}
							// 	className="card bg-orange-500 h-14 cursor-grab"
							// 	draggable="true"
							// 	onDragStart={(event) => drag(event, todo._id)}
							// 	data-id={todo._id}>
							// 	<h3>{todo.task_title}</h3>
							// </article>
							<div
								key={task._id}
								draggable="true"
								onDragStart={(event) => drag(event, task._id)}
								data-id={task._id}
								style={{ cursor: "move" }}
								className="shadow-md hover:shadow-lg border border-white rounded-lg p-6">
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
									<p className="text-sm">
										{task.description}
									</p>
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
										<button
											className="btn bg-gray-400 hover:bg-red-500 text-white p-0 min-h-0 h-9 aspect-square"
											onClick={() =>
												handleDelete(task._id)
											}>
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
						))}
				</div>
				{/* done */}
				<div
					className="column column-ip  w-72"
					data-column="Done"
					onDragEnter={dragEnter}
					onDragLeave={dragLeave}
					onDragOver={allowDrop}
					onDrop={(event) => drop(event, "Done")}>
					<h2>Done</h2>
					{myTasks
						.filter((card) => card.status === "Done")
						.map((task) => (
							<div
								key={task._id}
								draggable="true"
								onDragStart={(event) => drag(event, task._id)}
								data-id={task._id}
								style={{ cursor: "move" }}
								className="shadow-md hover:shadow-lg border border-white rounded-lg p-6">
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
									<p className="text-sm">
										{task.description}
									</p>
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
										<button
											className="btn bg-gray-400 hover:bg-red-500 text-white p-0 min-h-0 h-9 aspect-square"
											onClick={() =>
												handleDelete(task._id)
											}>
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
						))}
				</div>
			</div>
		</main>
	);
};

export default ListTasks;
