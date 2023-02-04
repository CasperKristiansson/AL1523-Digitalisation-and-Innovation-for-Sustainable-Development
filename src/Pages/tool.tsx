import React from 'react';
import { Header } from '../Components/header';
import { Input } from '../Components/input';
import { Loader } from '../Components/loader';
import { Result } from '../Components/result';

import { Classification, ClassificationState, computeClassification } from '../Utils/classification';

import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
	ButtonWrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: "100px",
		paddingBottom: "25px",
	},
	Button: {
		backgroundColor: "#72AD29",
		color: "white",
		width: "250px",
		height: "55px",
		border: "none",
		borderRadius: "8px",
		fontSize: "2em",
		cursor: "pointer",
	},
});

export const Tool: React.FC<{}> = (): JSX.Element => {
	const classes = useStyles();

	//

	const [loading, setLoading] = React.useState(false);
	const [showResult, setShowResult] = React.useState(false);
	const [numSamples, setNumSamples] = React.useState(1);
	// Instead of having one state like this:
	// const [state, setState] = React.useState({
	// 	location: "",
	// 	depth: "",
	// 	surfaceType: "",
	// 	s: 0,
	// 	ca: 0,
	// 	fe: 0,
	// 	pHinit: 0,
	// 	pHox: 0,
	// } as ClassificationState);
	// Keep track of a array of states. The standard should be one empty
	// state, and then add more states as needed.
	const [states, setStates] = React.useState([{
		location: "",
		depth: "",
		surfaceType: "",
		s: 0,
		ca: 0,
		fe: 0,
		pHinit: 0,
		pHox: 0,
	} as ClassificationState]);
	// This function will be passed to the Input component, and will be
	// called when the user changes the value of an input.
	const setState = (index: number, state: ClassificationState) => {
		// Create a copy of the states array.
		const newStates = [...states];
		// Replace the state at the given index with the new state.
		newStates[index] = state;
		// Update the states array.
		setStates(newStates);
	};

	const handleNumSamplesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newNumSamples = parseInt(event.target.value);
		const newStates = [...states];
		if (newNumSamples > numSamples) {
			for (let i = numSamples; i < newNumSamples; i++) {
				newStates.push({
					location: "",
					depth: "",
					surfaceType: "",
					s: 0,
					ca: 0,
					fe: 0,
					pHinit: 0,
					pHox: 0,
				} as ClassificationState);
			}
		}
		else if (newNumSamples < numSamples) {
			for (let i = numSamples; i > newNumSamples; i--) {
				newStates.pop();
			}
		}
		setNumSamples(newNumSamples);
		setStates(newStates);
	};

	const [result, setResult] = React.useState({} as Classification);

	// const handleAnalyzeClick = () => {
	// 	if (
	// 		!state.location ||
	// 		!state.depth ||
	// 		!state.surfaceType ||
	// 		state.s === 0 ||
	// 		state.ca === 0 ||
	// 		state.fe === 0 ||
	// 		state.pHinit === 0 ||
	// 		state.pHox === 0
	// 	) {
	// 		alert("Please fill all fields");
	// 		return;
	// 	}

	// 	setLoading(true);
	// 	setTimeout(() => {
	// 		setLoading(false);
	// 		setShowResult(true);

	// 		setResult(computeClassification(state));

	// 	}, 350);
	// };

	return (
		<>	
			<Loader show={loading} />
			<Header />
			<Input setState={setState} numSamples={numSamples} states={states} />
			<div className={classes.ButtonWrapper}>
				<button className={classes.Button} >
					Analyze
				</button>
				<select value={numSamples} onChange={handleNumSamplesChange}>
					{Array.from({length: 10}, (_, i) => i + 1).map(i => (
					<option key={i} value={i}>{i}</option>
					))}
				</select>
			</div>
			{showResult && (
				<Result
					result={result}
				/>
			)}
		</>
	);
};