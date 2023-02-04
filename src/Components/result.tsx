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
    RowHeader: {
        paddingLeft: "12.5%",
        marginBottom: "-15px",
        color: "#22222",
        "@media (max-width: 1000px)": {
            paddingLeft: "2.5%",
        },
        "@media (max-width: 500px)": {
            paddingLeft: "5%",
        },
    },
});

export const Result: React.FC<{ result: any }> = ({ result }): JSX.Element => {
	const classes = useStyles();

	return (
		<>
            <div className={classes.Wrapper}>
                <div className={classes.Header}>
                    <h1>Result</h1>
                </div>
                {result.map((sample: any, index: number) => {
                    const table = [
                        { testType: "Control A0D2", result: sample.controlA0D2 },
                        { testType: "Control D2A0", result: sample.controlD2A0 },
                        { testType: "Logical Test", result: sample.logicalTest },
                        { testType: "Soil Classification", result: sample.soilClassification },
                        { testType: "Border Zone A", result: sample.borderZoneA },
                        { testType: "Border Zone B", result: sample.borderZoneB },
                    ];

                    return (
                        <div key={index}>
                            {result.length > 1 &&
                                <div className={classes.RowHeader}>
                                    <h2>Sample {index + 1}</h2>
                                </div>
                            }

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
                    )})}
            </div>
		</>
	);
};