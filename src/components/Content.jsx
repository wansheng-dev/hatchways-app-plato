import Accordion from "./Accordion";

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
			{items.map((item, i) => (
				<Accordion item={item} key={i} />
			))}
			;
		</div>
	);
}
