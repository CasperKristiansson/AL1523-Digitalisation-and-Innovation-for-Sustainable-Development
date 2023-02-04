import React from 'react';
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
	Input: {
        paddingTop: "200px",
        "@media (max-width: 600px)": {
            paddingTop: "100px",
        },
    },
    Row: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridGap: "15px",
        "@media (max-width: 1000px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
        },
        "@media (max-width: 500px)": {
            gridTemplateColumns: "repeat(1, 1fr)",
        },
    },
    RowHeader: {
        paddingLeft: "3%",
        paddingTop: "10px",
        marginBottom: "-20px",
        color: "#22222"
    },
    Col4: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    InputControl: {
        width: "75%",
        height: "50px",
        backgroundColor: "#E9E5E5",
        border: "1px solid #A49B9B",
        borderRadius: "8px",
        fontSize: "1.4em",
        color: "#222222",
        "@media (max-width: 1000px)": {
            width: "90%",
        },
    },
    label: {
        textAlign: "left",
        width: "75%",
        height: "30px",
        color: "#777777",
        fontSize: "1.4em",
        "@media (max-width: 1000px)": {
            width: "90%",
        },
    },
});

export const Input: React.FC<{setState: any, numSamples: number, states: any}> = ({ setState, numSamples, states }): JSX.Element => {
	const classes = useStyles();

    const inputMapping = [
        {
            id: "location",
            label: "Location",
            onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
                setState(index, {...states[index], location: e.target.value});
            },
            type: "text",
        },
        {
            id: "depth",
            label: "Depth",
            onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
                setState(index, {...states[index], depth: e.target.value});
            },
            type: "text",
        },
        {
            id: "surfaceType",
            label: "Surface Type",
            onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
                setState(index, {...states[index], surfaceType: e.target.value});
            },
            type: "text",
        },
        {
            id: "s",
            label: "S (mg/kg T S)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
                // Add it as a number and not a string
                setState(index, {...states[index], s: parseInt(e.target.value)});
            },
            type: "number",
        },
        {
            id: "ca",
            label: "Ca (mg/kg TS)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
                setState(index, {...states[index], ca: parseInt(e.target.value)});
            },
            type: "number",
        },
        {
            id: "fe",
            label: "Fe (mg/kg T s)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
                setState(index, {...states[index], fe: parseInt(e.target.value)});
            },
            type: "number",
        },
        {
            id: "pHinit",
            label: "pH(init)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
                setState(index, {...states[index], pHinit: parseInt(e.target.value)});
            },
            type: "number",
        },
        {
            id: "pHox",
            label: "pH(ox)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
                setState(index, {...states[index], pHox: parseInt(e.target.value)});
            },
            type: "number",
        },
    ];

	return (
		<>
			<div className={classes.Input}>
                {/* Map for every NumSample */}
                {[...Array(numSamples)].map((_, index) => (
                    <div key={index}>
                        {numSamples > 1 &&
                            <div className={classes.RowHeader}>
                                <h2>Sample {index + 1}</h2>
                            </div>
                        }

                        <div className={classes.Row}>
                            {inputMapping.map((input) => (
                                <div className={classes.Col4} key={input.id}>
                                    <label htmlFor={input.id} className={classes.label}>{input.label}</label>
                                    <input
                                        className={classes.InputControl}
                                        id={input.id}
                                        type={input.type}
                                        onChange={(e) => input.onChange(e, index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
		</>
	);
};