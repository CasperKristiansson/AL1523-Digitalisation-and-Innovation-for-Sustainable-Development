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

	const [loading, setLoading] = React.useState(false);
	const [showResult, setShowResult] = React.useState(false);
	const [state, setState] = React.useState({
		location: "",
		depth: "",
		surfaceType: "",
		s: 0,
		ca: 0,
		fe: 0,
		pHinit: 0,
		pHox: 0,
	} as ClassificationState);

	const [result, setResult] = React.useState({} as Classification);

	const handleAnalyzeClick = () => {
		console.log(state)
		if (
			!state.location ||
			!state.depth ||
			!state.surfaceType ||
			state.s === 0 ||
			state.ca === 0 ||
			state.fe === 0 ||
			state.pHinit === 0 ||
			state.pHox === 0
		) {
			alert("Please fill all fields");
			return;
		}

		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setShowResult(true);

			setResult(computeClassification(state));

		}, 200);
	};

	return (
		<>	
			<Loader show={loading} />
			<Header />
			<Input setState={setState} state={state}/>
			<div className={classes.ButtonWrapper}>
				<button className={classes.Button} onClick={handleAnalyzeClick}>
					Analyze
				</button>
			</div>
			{showResult && (
				<Result
					result={result}
				/>
			)}
		</>
	);
};