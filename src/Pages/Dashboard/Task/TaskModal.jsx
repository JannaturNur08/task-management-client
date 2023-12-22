import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useTask from "../../../hooks/useTask";
import Swal from "sweetalert2";

const TaskModal = ({ isOpen, onClose }) => {
	const [myTasks, refetch] = useTask();
	const { user } = useAuth();
	const axiosPublic = useAxiosPublic();
	console.log("TaskModal is rendering");
	const {
		register,
		handleSubmit,
		reset,
		formState: { isDirty: resetForm },
	} = useForm();
	const handleFormSubmit = async (data) => {
		const task = {
			email: user.email,
			task_title: data.task_title,
			description: data.description,
			deadline: data.date,
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
		onClose();
	};
	return (
		<div className={`modal ${isOpen ? "visible" : "hidden"} z-50`}>
			<dialog className="modal" id="my_modal_1">
				<div className="modal-box">
                <button onClick={onClose}>Close</button>
				<form
					onSubmit={handleSubmit(handleFormSubmit)}
					className="bg-black">
					{/* Form fields */}
					<label>
						Task Title:
						<input
							{...register("task_title", { required: true })}
						/>
					</label>
					<label>
						Description:
						<textarea
							{...register("description", { required: true })}
						/>
					</label>
					<label>
						Deadline:
						<input
							type="date"
							{...register("deadline", { required: true })}
						/>
					</label>
					<label>
						Priority:
						<select {...register("priority", { required: true })}>
							<option value="high">High</option>
							<option value="medium">Medium</option>
							<option value="low">Low</option>
						</select>
					</label>

					<button type="submit">Submit</button>
				</form>
                </div>
			</dialog>
		</div>
	);
};

export default TaskModal;
