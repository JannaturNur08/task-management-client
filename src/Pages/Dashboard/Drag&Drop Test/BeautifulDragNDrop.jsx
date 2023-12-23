import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useTask from "../../../hooks/useTask";
import { IconContext } from "react-icons";
import {
	MdDateRange,
	MdDeleteForever,
	MdOutlineDescription,
} from "react-icons/md";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useRef } from "react";

const BeautifulDragNDrop = () => {
	const [myTasks, refetch] = useTask();
	console.log(myTasks);
	const axiosPublic = useAxiosPublic();
	const { user } = useAuth();
	const {
		register,
		handleSubmit,
		reset,
		formState: { isDirty: resetForm },
	} = useForm();
	const mountedRef = useRef(true);

	useEffect(() => {
		return () => {
			// Component will unmount, set the ref to false
			mountedRef.current = false;
		};
	}, []);

	const handleFormSubmit = async (data) => {
		const task = {
			email: user.email,
			task_title: data.task_title,
			description: data.description,
			deadline: data.deadline,
			priority: data.priority,
			status: "Todo",
		};

		const TaskRes = await axiosPublic.post("/tasks", task);

		if (TaskRes.data.insertedId > 0) {
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

	const handleDragEnd = async (result) => {
		if (!result.destination) {
			return; // dropped outside the list
		}

		const taskId = result.draggableId;
		const newStatus = result.destination.droppableId;

		try {
			// Update the task status in the database
			await axiosPublic.patch(`/tasks/${taskId}`, { status: newStatus });

			// Check if the component is still mounted before updating the state
			if (mountedRef.current) {
				// Refetch tasks after updating the status
				refetch();
			}
		} catch (error) {
			console.error("Error updating task status:", error);
			// Handle the error as needed
		}
	};

	return (
		<div>
			{/* form submit */}
			<div className="mx-auto container pl-12">
				<button
					className="btn bg-cyan-500 hover:bg-cyan-700 text-white"
					onClick={() =>
						document.getElementById("my_modal_1").showModal()
					}>
					Add Task
				</button>

				<dialog className="modal" id="my_modal_1">
					<div className="modal-box">
						<form
							method="dialog"
							onSubmit={handleSubmit(handleFormSubmit)}>
							<div className="flex flex-col space-y-5">
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

			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="flex gap-5 p-12 task">
					<div className="max-w-96">
						<div className="flex gap-2 items-center bg-gray-400 p-3 rounded-lg mb-4 ">
							<div className="h-4 aspect-square  bg-gray-300 rounded-full"></div>
							<h3 className="font-bold text-white">
								To-Do (
								{
									myTasks.filter(
										(task) => task.status === "Todo"
									).length
								}
								)
							</h3>
						</div>
						<Droppable droppableId="Todo">
							{(provided) => (
								<div
									className="flex flex-col gap-4"
									{...provided.droppableProps}
									ref={provided.innerRef}>
									{myTasks
										.filter(
											(task) => task.status === "Todo"
										)
										.map((task, index) => (
											<Draggable
												key={task._id}
												draggableId={`${task._id}`}
												index={index}>
												{(provided) => (
													<div
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														ref={provided.innerRef}
														key={task._id}
														style={{
															cursor: "move",
														}}
														className="shadow-md hover:shadow-lg border border-white rounded-lg p-6">
														{/* Your task item content */}
														<p>{task.task_title}</p>
													</div>
												)}
											</Draggable>
										))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>

					{/* In progress */}
					<div className="max-w-96 border">
						<div className="flex gap-2 items-center bg-blue-400 p-3 rounded-lg mb-4 ">
							<div className="h-4 aspect-square  bg-blue-300 rounded-full"></div>
							<h3 className="font-bold text-white">
								In-Progress (
								{
									myTasks.filter(
										(task) => task.status === "In-Progress"
									).length
								}
								)
							</h3>
						</div>
						<Droppable droppableId="In-Progress">
							{(draggableProvided, draggableSnapshot) => (
								<div
									className="flex flex-col gap-4"
									isDragging={draggableSnapshot.isDragging}
									{...draggableProvided.droppableProps}
									ref={draggableProvided.innerRef}
									{...draggableProvided.dragHandleProps}>
									{myTasks
										.filter(
											(task) =>
												task.status === "In-Progress"
										)
										.map((task, index) => (
											<Draggable
												key={task._id}
												draggableId={`${task._id}`}
												index={index}>
												{(provided) => (
													<div
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														ref={provided.innerRef}
														key={task._id}
														style={{
															cursor: "move",
														}}
														className="shadow-md hover:shadow-lg border border-white rounded-lg p-6">
														{/* Your task item content */}
														<p>{task.task_title}</p>
													</div>
												)}
											</Draggable>
										))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>

					{/* Done */}
					<div className="max-w-96 border min-h-96">
						<div className="flex gap-2 items-center bg-green-400 p-3 rounded-lg mb-4 ">
							<div className="h-4 aspect-square  bg-green-300 rounded-full"></div>
							<h3 className="font-bold text-white">
								Done (
								{
									myTasks.filter(
										(task) => task.status === "Done"
									).length
								}
								)
							</h3>
						</div>
						<Droppable droppableId="Done">
							{(provided) => (
								<div
									className="flex flex-col gap-4"
									{...provided.droppableProps}
									ref={provided.innerRef}>
									{myTasks
										.filter(
											(task) => task.status === "Done"
										)
										.map((task, index) => (
											<Draggable
												key={task._id}
												draggableId={`${task._id}`}
												index={index}>
												{(provided) => (
													<div
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														ref={provided.innerRef}
														key={task._id}
														style={{
															cursor: "move",
														}}
														className="shadow-md hover:shadow-lg border border-white rounded-lg p-6">
														{/* Your task item content */}
														<p>{task.task_title}</p>
													</div>
												)}
											</Draggable>
										))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
				</div>
			</DragDropContext>
		</div>
	);
};

export default BeautifulDragNDrop;
