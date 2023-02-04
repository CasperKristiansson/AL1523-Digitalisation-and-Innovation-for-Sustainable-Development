import React from 'react';
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
	Header: {
		color: "#72AD29",
		textAlign: "center",
		fontSize: "2em",
		lineHeight: "1.2em",
		letterSpacing: "0.08em",
	},
});

export const Header: React.FC<{}> = (): JSX.Element => {
	const classes = useStyles();

	return (
		<>
			<div className={classes.Header}>
				<h1>Sulfide & Sulfate Soils</h1>
				<h1>Classification Tool</h1>
			</div>
		</>
	);
};