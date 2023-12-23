/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";

const initialState = [
	{ id: 1, name: "Todo #1", state: "todo" },
	{ id: 2, name: "Todo #2", state: "todo" },
	{ id: 3, name: "Todo #3", state: "todo" },
	{ id: 4, name: "IP #1", state: "doing" },
	{ id: 5, name: "IP #2", state: "doing" },
	{ id: 6, name: "IP #3", state: "doing" },
	{ id: 7, name: "Done #1", state: "done" },
	{ id: 8, name: "Done #2", state: "done" },
	{ id: 9, name: "Done #3", state: "done" },
];

const DragNDrop = () => {
	const [cards, setCards] = useState(initialState);

	const dragEnter = (event) => {};
	const dragLeave = (event) => {};
	const drag = (event) => {
		event.dataTransfer.setData(
			"text/plain",
			event.currentTarget.dataset.id
		);
	};
	const drop = (event) => {
		const column = event.currentTarget.dataset.column;
		const id = Number(event.dataTransfer.getData("text/plain"));

		event.currentTarget.classList.remove("drop");

		event.preventDefault();

		const updatedState = cards.map((card) => {
			if (card.id === id) {
				card.state = column;
                
			}

			return card;
		});

		setCards(updatedState);
	};
	const allowDrop = (event) => {
		event.preventDefault();
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
					onDrop={drop}>
					<h2>Todo</h2>
					{cards
						.filter((card) => card.state === "todo")
						.map((todo) => (
							<article
								key={todo.id}
								className="card bg-orange-500 h-14 cursor-grab"
								draggable="true"
								onDragStart={drag}
								data-id={todo.id}>
								<h3>{todo.name}</h3>
							</article>
						))}
				</div>
				<div
					className="column column-ip bg-red-300 w-72"
					data-column="doing"
					onDragEnter={dragEnter}
					onDragLeave={dragLeave}
					onDragOver={allowDrop}
					onDrop={drop}>
					<h2>Doing</h2>
					{cards
						.filter((card) => card.state === "doing")
						.map((todo) => (
							<article
								key={todo.id}
								className="card bg-orange-500 h-14 cursor-grab"
								draggable="true"
								onDragStart={drag}
								data-id={todo.id}>
								<h3>{todo.name}</h3>
							</article>
						))}
				</div>
				<div
					className="column column-ip bg-blue-300 w-72"
					data-column="done"
					onDragEnter={dragEnter}
					onDragLeave={dragLeave}
					onDragOver={allowDrop}
					onDrop={drop}>
					<h2>Done</h2>
					{cards
						.filter((card) => card.state === "done")
						.map((todo) => (
							<article
								key={todo.id}
								className="card bg-orange-500 h-14 cursor-grab"
								draggable="true"
								onDragStart={drag}
								data-id={todo.id}>
								<h3>{todo.name}</h3>
							</article>
						))}
				</div>
			</div>
		</main>
	);
};

export default DragNDrop;
