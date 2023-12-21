import useTask from "../../../hooks/useTask";


const Task = () => {
    const [tasks,refetch] = useTask();
    console.log(tasks);
    return (
        <div className="flex gap-3">
            <h2>this is task list</h2>
            <div className="p-5 border">
                {
                    tasks.map((task)=>(
                        <div key={task._id} className="p-5 border mt-3">
                            <p className="font-bold">{task.task_title}</p>
                            <p>{task.description}</p>
                            <p>{task.deadline}</p>
                            <p>{task.status}</p>
                            <p>{task.priority}</p>
                            <button onClick={()=>{refetch(task._id)}} className="btn bg-red-500 text-white">delete</button>
                        </div>
                    ))
                }
            </div>
            <div className="p-5 border">
                {
                    tasks.map((task)=>(
                        <div key={task._id} className="p-5 border mt-3">
                            <p className="font-bold">{task.task_title}</p>
                            <p>{task.description}</p>
                            <p>{task.deadline}</p>
                            <p>{task.status}</p>
                            <p>{task.priority}</p>
                            <button onClick={()=>{refetch(task._id)}} className="btn bg-red-500 text-white">delete</button>
                        </div>
                    ))
                }
            </div>
            <div className="p-5 border">
                {
                    tasks.map((task)=>(
                        <div key={task._id} className="p-5 border mt-3">
                            <p className="font-bold">{task.task_title}</p>
                            <p>{task.description}</p>
                            <p>{task.deadline}</p>
                            <p>{task.status}</p>
                            <p>{task.priority}</p>
                            <button onClick={()=>{refetch(task._id)}} className="btn bg-red-500 text-white">delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Task;