import React from 'react';
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
	Input: {
    },
    Row: {
        // Make it a grid with 4 columns
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
    },
});

export const Input: React.FC<{}> = (): JSX.Element => {
    const [location, setLocation] = React.useState<string>("");
    const [depth, setDepth] = React.useState<string>("");
    const [surfaceType, setSurfaceType] = React.useState<string>("");
    const [s, setS] = React.useState<string>("");
    const [ca, setCa] = React.useState<string>("");
    const [fe, setFe] = React.useState<string>("");
    const [pHinit, setpHinit] = React.useState<string>("");
    const [pHox, setpHox] = React.useState<string>("");

	const classes = useStyles();

    const inputMapping = [
        {
            id: "location",
            label: "Location",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setLocation(e.target.value);
            },
        },
        {
            id: "depth",
            label: "Depth",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setDepth(e.target.value);
            },
        },
        {
            id: "surfaceType",
            label: "Surface Type",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setSurfaceType(e.target.value);
            },
        },
        {
            id: "s",
            label: "S (mg/kg T S)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setS(e.target.value);
            },
        },
        {
            id: "ca",
            label: "Ca (mg/kg TS)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setCa(e.target.value);
            },
        },
        {
            id: "fe",
            label: "Fe (mg/kg T s)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setFe(e.target.value);
            },
        },
        {
            id: "pHinit",
            label: "pH(init)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setpHinit(e.target.value);
            },
        },
        {
            id: "pHox",
            label: "pH(ox)",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setpHox(e.target.value);
            },
        },
    ];

	return (
		<>
			<div className={classes.Input}>
                <div className={classes.Row}>
                    {inputMapping.map((input) => (
                        <div className={classes.Col4}>
                            <label htmlFor={input.id}>{input.label}</label>
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