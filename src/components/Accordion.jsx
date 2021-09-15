import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function Accordion({ item }) {
	const { id, pic, firstName, lastName, email, company, skill, grades } = item;

	const [dropdown, setDropdown] = useState(false);

	return (
		<div className="row border-bottom py-3" key={id}>
			<div className="col-3 d-flex justify-content-center align-self-start">
				<img className="thumbnail" src={pic} alt={firstName + " " + lastName} />
			</div>
			<div className="col-9">
				<div className="row d-flex justify-content-between align-items-center">
					<p className="name h1 col-10 mb-0">
						{firstName.toUpperCase()} {lastName.toUpperCase()}
					</p>
					<div
						className="col-2"
						onClick={() => setDropdown(!dropdown)}
						key={id}
					>
						{dropdown ? (
							<FaMinus size="40px" color="#bfbfbf" />
						) : (
							<FaPlus size="40px" color="#bfbfbf" />
						)}
					</div>
				</div>
				<div className="detail row px-5">
					<p>Email: {email}</p>
					<p>Comapny: {company}</p>
					<p>Skill: {skill}</p>
					<p>
						Grade:{" "}
						{grades.reduce((a, b) => parseInt(a) + parseInt(b), 0) /
							grades.length}
						%
					</p>
				</div>
				{dropdown ? (
					<div className="grade row px-5 mt-3">
						<ul>
							{grades.map((grade, i) => (
								<li key={i} className="list-unstyled d-flex">
									<p className="me-4">Test {i + 1}:</p>
									<p>{parseInt(grade)}%</p>
								</li>
							))}
						</ul>
					</div>
				) : null}
			</div>
		</div>
	);
}
