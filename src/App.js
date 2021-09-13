import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

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

	console.log(data);

	return (
		<div className="wrapper">
			<div className="content mx-auto">
				{loading ? (
					<h2>Loading...</h2>
				) : (
					data.map((item) => (
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
										{item.grades.reduce(
											(a, b) => parseInt(a) + parseInt(b),
											0
										) / item.grades.length}
										%
									</p>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default App;
