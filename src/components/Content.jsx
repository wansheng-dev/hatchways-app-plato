import React from "react";

export default function Content({ data, filteredItems, handleChange }) {
	let items = data;

	if (filteredItems.length !== items.length) {
		items = filteredItems;
	}

	return (
		<div>
			<input
				className="search-bar px-3 mx-3"
				type="text"
				placeholder="Search by name"
				onChange={handleChange}
			/>
			{items.map((item) => (
				<div className="row border-bottom py-3" key={item.id}>
					<div className="col-3 d-flex justify-content-center align-self-center">
						<img
							className="thumbnail"
							src={item.pic}
							alt={item.firstName + " " + item.lastName}
						/>
					</div>
					<div className="col-9">
						<p className="name h1">
							{item.firstName.toUpperCase()} {item.lastName.toUpperCase()}
						</p>
						<div className="detail row px-5">
							<p>Email: {item.email}</p>
							<p>Comapny: {item.company}</p>
							<p>Skill: {item.skill}</p>
							<p>
								Grade:{" "}
								{item.grades.reduce((a, b) => parseInt(a) + parseInt(b), 0) /
									item.grades.length}
								%
							</p>
						</div>
					</div>
				</div>
			))}
			;
		</div>
	);
}
