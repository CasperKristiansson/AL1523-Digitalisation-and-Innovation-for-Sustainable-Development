import React from 'react';
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
	Header: {
		// Set the text color to: 72AD29
		color: "#72AD29",
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