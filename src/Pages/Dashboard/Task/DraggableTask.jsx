
import { useDrag } from "react-dnd";

import { IconContext } from "react-icons";
import { MdDateRange } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";

const DraggableTask = ({ task }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item:{id: task._id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))

      console.log(isDragging);

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
				<div className="flex items-center gap-1 w-max my-3">
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
			</div>
		
	);
};

export default DraggableTask;
