import React from 'react';
import axios from 'axios';
import { Header } from '../Components/header';
import { Input } from '../Components/input';
import { Loader } from '../Components/loader';
import { Result } from '../Components/result';

import { Classification, ClassificationState, computeClassification } from '../Utils/classification';

import { createUseStyles } from "react-jss"
import { Disclaimer } from '../Components/disclaimer';

const useStyles = createUseStyles({
	ButtonWrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: "100px",
		paddingBottom: "25px",
		"& > *": {
			margin: "0 10px",
		},
		"@media (max-width: 560px)": {
			flexDirection: "column",
			"& > *": {
				margin: "30px 0",
			},
			paddingTop: "50px",
		},
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
	Select: {
		width: "250px",
		height: "55px",
		backgroundColor: "#E9E5E5",
		border: "1px solid #A49B9B",
		borderRadius: "8px",
		fontSize: "1.4em",
		color: "#222222",
	},
	SelectWrapper: {
		display: "flex",
		flexDirection: "column",
		color: "#777777",
		marginTop: "-20px",
	},
});

export const Tool: React.FC<{}> = (): JSX.Element => {
	const classes = useStyles();

	const [loading, setLoading] = React.useState(false);
	const [showResult, setShowResult] = React.useState(false);
	const [numSamples, setNumSamples] = React.useState(1);
	const [results, setResults] = React.useState([{} as Classification]);
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
	
	const setState = (index: number, state: ClassificationState) => {
		const newStates = [...states];
		newStates[index] = state;
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

	const handleAnalyzeClick = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setShowResult(true);

			const newResults = [];
			for (let i = 0; i < numSamples; i++) {
				newResults[i] = computeClassification(states[i]);
			}
			setResults(newResults);

		}, 350);

		states.forEach(state => {
			var params = new URLSearchParams();
			params.append('location', state.location);
			params.append('depth', state.depth);
			params.append('type', state.surfaceType);
			params.append('s', state.s.toString());
			params.append('ca', state.ca.toString());
			params.append('fe', state.fe.toString());
			params.append('ph_init', state.pHinit.toString());
			params.append('ph_ox', state.pHox.toString());

			axios.post("http://verktyg.optimass.se/api/sulfidsoil.php", params)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		});
	};

	return (
		<>	
			<Loader show={loading} />
			<Header />
			<Input setState={setState} numSamples={numSamples} states={states} />
			<div className={classes.ButtonWrapper}>
				<button className={classes.Button} onClick={handleAnalyzeClick} >
					Analysera
				</button>
				<div className={classes.SelectWrapper}>
					<label>Antal Prover</label>
					<select value={numSamples} onChange={handleNumSamplesChange} className={classes.Select}>
						{Array.from({length: 10}, (_, i) => i + 1).map(i => (
						<option key={i} value={i}>{i}</option>
						))}
					</select>
				</div>
			</div>
			{showResult && (
				<Result result={results} />
			)}
			<Disclaimer />
		</>
	);
};