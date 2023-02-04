import React from 'react';
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    Wrapper: {
        paddingTop: "50px",
        paddingBottom: "50px",
    },
	Header: {
		color: "#72AD29",
		textAlign: "center",
		fontSize: "2em",
		lineHeight: "1.2em",
		letterSpacing: "0.08em",
	},
    Table: {
        width: "75%",
        margin: "0 auto",
        backgroundColor: "#E9E5E5",
        border: "1px solid #A49B9B",
        borderRadius: "8px",
        fontSize: "1.4em",
        color: "#222222",
        borderStyle: "hidden",
        borderCollapse: "collapse",
        boxShadow: "0 0 0 1px #A49B9B",
        "@media (max-width: 1000px)": {
            width: "95%",
        },
    },
    Thead: {
        backgroundColor: "#E9E5E5",
        border: "1px solid #A49B9B",
        borderRadius: "8px",
    },
    Tr: {
        border: "1px solid #A49B9B",
        borderRadius: "8px",
    },
    Th: {
        padding: "10px",
        fontSize: "1.6em",
        border: "1px solid #A49B9B",
        borderRadius: "8px",
    },
    Td: {
        padding: "10px",
        border: "1px solid #A49B9B",
        width: "50%",
        textAlign: "center",
    },
});

export const Result: React.FC<{ result: any }> = ({ result }): JSX.Element => {
	const classes = useStyles();

    const table = [
        { testType: "Control A0D2", result: result.controlA0D2 },
        { testType: "Control D2A0", result: result.controlD2A0 },
        { testType: "Logical Test", result: result.logicalTest },
        { testType: "Soil Classification", result: result.soilClassification },
        { testType: "Border Zone A", result: result.borderZoneA },
        { testType: "Border Zone B", result: result.borderZoneB },
    ];

	return (
		<>
            <div className={classes.Wrapper}>
                <div className={classes.Header}>
                    <h1>Result</h1>
                </div>
                <table className={classes.Table}>
                    <thead className={classes.Thead}>
                        <tr className={classes.Tr}>
                            <th className={classes.Th}>Test Type</th>
                            <th className={classes.Th}>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row, index) => (
                            <tr key={index} className={classes.Tr}>
                                <td className={classes.Td}>{row.testType}</td>
                                <td className={classes.Td}>{row.result}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
		</>
	);
};