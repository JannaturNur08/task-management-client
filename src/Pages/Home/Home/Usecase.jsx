import { Tab } from "@headlessui/react";

const Usecase = () => {
	return (
		<div className="">
			<h2 className="text-center pt-20">
				Task Management for{" "}
				<span className="textGradEffect">Everyone</span>
			</h2>

			<div className="w-full flex justify-center py-16 ">
				<Tab.Group>
					<div>
						<Tab.List
							className={"flex justify-around items-start mb-20"}>
							<Tab className=" hover:border-purple-500 hover:border-b-2 border-purple-700 pb-3 px-3 ui-selected:border-b-4 focus:outline-none focus:border-b-4  ui-selected:text-purple-700 ui-not-selected: ui-not-selected:text-black">
								<h4>Developers</h4>
							</Tab>

							<Tab className=" hover:border-purple-500 hover:border-b-2 border-purple-700 pb-3 px-3 ui-selected:border-b-4 focus:outline-none focus:border-b-4  ui-selected:text-purple-700 ui-not-selected: ui-not-selected:text-black">
								<h4>Managers</h4>
							</Tab>
							<Tab className="hover:border-purple-500 hover:border-b-2 border-purple-700 pb-3 px-3 ui-selected:border-b-4 focus:outline-none focus:border-b-4  ui-selected:text-purple-700 ui-not-selected: ui-not-selected:text-black">
								<h4>Students</h4>
							</Tab>
						</Tab.List>
						<Tab.Panels className={" max-w-screen-sm my-10"}>
							<Tab.Panel>
								<div className="flex gap-10">
									<div>
										<h4 className="mb-10">
											Note your work list
										</h4>
										<p>
											Developers benefit from task
											management systems, streamlining
											collaboration and project
											development. These tools enable
											efficient task allocation, tracking,
											and completion, maintaining an
											organized workflow with features
											like version control and real-time
											communication.
										</p>
									</div>
									<img
										className="h-64 aspect-square"
										src="https://media.giphy.com/media/3ohhwJbytwUSJyvvHi/giphy.gif"
										alt=""
									/>
								</div>
							</Tab.Panel>
							<Tab.Panel>
								<div className="flex gap-10">
									<div>
										<h4 className="mb-10">
											Manage company task
										</h4>
										<p>
											Managers gain insights into team
											performance and project progression,
											optimizing task allocation,
											real-time tracking, and resource
											utilization. This enhances
											decision-making, identifies
											bottlenecks, and ensures project
											success.
										</p>
									</div>
									<img
										className="h-64 aspect-square"
										src="https://media.giphy.com/media/3owyp2SViuDIGh8YoM/giphy.gif"
										alt=""
									/>
								</div>
							</Tab.Panel>
							<Tab.Panel>
								<div className="flex gap-10">
									<div>
										<h4 className="mb-10">
											Track class works
										</h4>
										<p>
											Students find task management
											systems essential for academic
											success, helping organize studies,
											assignments, and group projects.
											With features like to-do lists and
											reminders, students prioritize
											tasks, manage coursework
											efficiently, and collaborate on
											group projects, contributing to an
											organized and streamlined academic
											experience.
										</p>
									</div>
									<img
										className="h-64 aspect-square"
										src="https://media.giphy.com/media/VIKOfvqJHcVDrdVivT/giphy.gif"
										alt=""
									/>
								</div>
							</Tab.Panel>
						</Tab.Panels>
					</div>
				</Tab.Group>
			</div>
		</div>
	);
};

export default Usecase;
