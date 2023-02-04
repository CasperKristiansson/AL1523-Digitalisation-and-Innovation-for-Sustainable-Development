import React from 'react';
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
	Input: {
        paddingTop: "200px",
    },
    Row: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridGap: "15px",
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
        color: "#222222"
    },
    label: {
        textAlign: "left",
        width: "75%",
        height: "30px",
        color: "#777777",
        fontSize: "1.4em",
    },
});

export const Input: React.FC<{setState: any, state: any}> = ({ setState, state }): JSX.Element => {
	const classes = useStyles();

    const inputMapping = [
        {
            id: "location",
            label: "Location",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setState({...state, location: e.target.value});
            },
        },
        {
            id: "depth",
            label: "Depth",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setState({...state, depth: e.target.value});
            },
        },
        {
            id: "surfaceType",
            label: "Surface Type",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setState({...state, surfaceType: e.target.value});
            },
        },
        {
            id: "s",
            label: "S (mg/kg T S)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setState({...state, s: e.target.value});
            },
        },
        {
            id: "ca",
            label: "Ca (mg/kg TS)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setState({...state, ca: e.target.value});
            },
        },
        {
            id: "fe",
            label: "Fe (mg/kg T s)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setState({...state, fe: e.target.value});
            },
        },
        {
            id: "pHinit",
            label: "pH(init)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setState({...state, pHinit: e.target.value});
            },
        },
        {
            id: "pHox",
            label: "pH(ox)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setState({...state, pHox: e.target.value});
            },
        },
    ];

	return (
		<>
			<div className={classes.Input}>
                <div className={classes.Row}>
                    {inputMapping.map((input) => (
                        <div className={classes.Col4}>
                            <label htmlFor={input.id} className={classes.label}>{input.label}</label>
                            <input
                                className={classes.InputControl}
                                id={input.id}
                                type="text"
                                onChange={input.onChange}
                            />
                        </div>
                    ))}
                </div>
            </div>
		</>
	);
};