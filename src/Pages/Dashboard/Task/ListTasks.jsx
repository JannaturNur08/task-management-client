import { useState } from "react";
import useTask from "../../../hooks/useTask";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ListTasks = () => {
	const [myTasks, setMyTasks] = useTask();
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

		console.log(taskId);
		setDraggedTaskId(taskId);
		console.log(draggedTaskId);
	};
	console.log(myTasks);

	const drop = async (event, column) => {
		const taskId = event.dataTransfer.getData("text/plain");
		//  console.log(taskId);
		console.log(event);
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

	return (
		<main className="board">
			<div className="flex">
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
						.map((todo) => (
							<article
								key={todo._id}
								className="card bg-orange-500 h-14 cursor-grab"
								draggable="true"
								onDragStart={(event) => drag(event, todo._id)}
								data-id={todo._id}>
								<h3>{todo.task_title}</h3>
							</article>
						))}
				</div>
				<div
					className="column column-ip bg-red-300 w-72"
					data-column="In-Progress"
					onDragEnter={dragEnter}
					onDragLeave={dragLeave}
					onDragOver={allowDrop}
					onDrop={(event) => drop(event, "In-Progress")}>
					<h2>In-Progress</h2>
					{myTasks
						.filter((card) => card.status === "In-Progress")
						.map((todo) => (
							<article
								key={todo._id}
								className="card bg-orange-500 h-14 cursor-grab"
								draggable="true"
								onDragStart={(event) => drag(event, todo._id)}
								data-id={todo._id}>
								<h3>{todo.task_title}</h3>
							</article>
						))}
				</div>
				<div
					className="column column-ip bg-blue-300 w-72"
					data-column="Done"
					onDragEnter={dragEnter}
					onDragLeave={dragLeave}
					onDragOver={allowDrop}
					onDrop={(event) => drop(event, "Done")}>
					<h2>Done</h2>
					{myTasks
						.filter((card) => card.status === "Done")
						.map((todo) => (
							<article
								key={todo._id}
								className="card bg-orange-500 h-14 cursor-grab"
								draggable="true"
								onDragStart={(event) => drag(event, todo._id)}
								data-id={todo._id}>
								<h3>{todo.task_title}</h3>
							</article>
						))}
				</div>
			</div>
		</main>
	);
};

export default ListTasks;
