import React from 'react';
import { Header } from '../Components/header';
import { Input } from '../Components/input';
import { Loader } from '../Components/loader';
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
	ButtonWrapper: {
		// Center the button
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

	return (
		<>
			<Loader />
			<Header />
			<Input setState={setState} state={state}/>
			<div className={classes.ButtonWrapper}>
				<button className={classes.Button}

				>Analyze</button>
			</div>
		</>
	);
};