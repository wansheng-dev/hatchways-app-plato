import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import Content from "./components/Content";

function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const res = await axios.get(
				"https://api.hatchways.io/assessment/students"
			);
			setData(res.data.students);
			setLoading(false);
		};
		fetchData();
	}, []);

	const handleChange = (e) => {
		setKeyword(e.target.value);
	};
	const filteredItems = data.filter((item) =>
		(item.firstName + " " + item.lastName)
			.toLowerCase()
			.includes(keyword.toLowerCase())
	);

	return (
		<div className="wrapper">
			<div className="content mx-auto">
				{loading ? (
					<h2>Loading...</h2>
				) : (
					<Content
						data={data}
						filteredItems={filteredItems}
						handleChange={handleChange}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
