import React from 'react';
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
	disclaimer: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    width: "80%",
    paddingTop: 100,
  },
  header: {
    fontSize: "1.7em",
  },
  text: {
    fontSize: "1.2em",
    marginTop: -20,
  },
});

export const Disclaimer: React.FC<{}> = (): JSX.Element => {
	const classes = useStyles();

	return (
		<>
			<div className={classes.disclaimer}>
        <p className={classes.header}>Varning</p>
        <p className={classes.text}>Vänligen observera att verktyget som tillhandahålls på denna webbsida endast är avsett som ett extra hjälpmedel. Användaren ansvarar för att ta hänsyn till andra relevanta faktorer och att använda verktyget på ett lämpligt sätt.</p>
			</div>
		</>
	);
};