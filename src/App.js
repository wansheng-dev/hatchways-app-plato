import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import Accordion from "./components/Accordion";

function App() {
	const [data, setData] = useState([]);
	const [results, setResults] = useState(data);
	const [loading, setLoading] = useState(false);
	const [nameSearch, setNameSearch] = useState("");
	const [tagSearch, setTagSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const res = await axios.get(
				"https://api.hatchways.io/assessment/students"
			);
			const modified = res.data.students.map((item) => ({ ...item, tags: [] }));
			setData(modified);
			setLoading(false);
		};
		fetchData();
	}, []);

	const addTag = (tag, id) => {
		if (!data[id - 1].tags.includes(tag)) {
			data[id - 1].tags.push(tag);
		}
	};

	useEffect(() => {
		let filteredItems = data;
		if (nameSearch !== "") {
			filteredItems = filteredItems.filter((item) =>
				(item.firstName + " " + item.lastName)
					.toLowerCase()
					.includes(nameSearch.toLowerCase())
			);
		}
		if (tagSearch !== "") {
			let filteredItems2 = [];
			filteredItems.forEach((item) => {
				let tags = item.tags;
				tags.forEach((tag) => {
					if (tag.includes(tagSearch) && !filteredItems2.includes(item)) {
						filteredItems2.push(item);
					}
				});
			});
			filteredItems = filteredItems2;
		}
		setResults(filteredItems);
	}, [data, nameSearch, tagSearch]);

	return (
		<div className="wrapper">
			<div className="content mx-auto">
				{loading ? (
					<h2>Loading...</h2>
				) : (
					<div>
						<input
							className="search-bar px-3 mx-3"
							type="text"
							placeholder="Search by name"
							onChange={(e) => setNameSearch(e.target.value)}
						/>
						<input
							className="search-bar px-3 mx-3"
							type="text"
							placeholder="Search by tag"
							onChange={(e) => setTagSearch(e.target.value)}
						/>
						{results.map((item, i) => (
							<Accordion item={item} addTag={addTag} key={i} />
						))}
						;
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
