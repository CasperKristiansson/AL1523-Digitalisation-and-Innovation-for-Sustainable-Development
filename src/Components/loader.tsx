import React from 'react';
import { createUseStyles } from "react-jss"
import FadeLoader from "react-spinners/ClipLoader";

const useStyles = createUseStyles({
	Overlay: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "1000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },            
});

export const Loader: React.FC<{}> = (): JSX.Element => {
	const classes = useStyles();

	return (
		<>
			<div className={classes.Overlay}>
                <FadeLoader color="#36d7b7" size={150}/>
            </div>
		</>
	);
};