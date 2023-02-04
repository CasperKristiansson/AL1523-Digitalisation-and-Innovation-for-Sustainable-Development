import React from 'react';
import { Header } from '../Components/header';
import { Input } from '../Components/input';

export const Tool: React.FC<{}> = (): JSX.Element => {
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
			<Header />
			<Input setState={setState} state={state}/>
		</>
	);
};