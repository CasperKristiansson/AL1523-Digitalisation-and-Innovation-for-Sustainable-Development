import React from 'react';
import { Header } from '../Components/header';
import { Input } from '../Components/input';
import { Loader } from '../Components/loader';
import { Result } from '../Components/result';

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
		s: "",
		ca: "",
		fe: "",
		pHinit: "",
		pHox: "",
	});
	const [result, setResult] = React.useState({
		controlA0D2: "",
		controlD2A0: "",
		logicalTest: "",
		soilClassification: "",
		borderZoneA: "",
		borderZoneB: "",
	});

	const handleAnalyzeClick = () => {
		if (
			state.location === "" ||
			state.depth === "" ||
			state.surfaceType === "" ||
			state.s === "" ||
			state.ca === "" ||
			state.fe === "" ||
			state.pHinit === "" ||
			state.pHox === ""
		) {
			alert("Please fill all fields");
			return;
		}
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setShowResult(true);
		}, 500);
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