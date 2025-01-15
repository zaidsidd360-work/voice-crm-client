import React, { createContext, useState } from "react";
import { Pool } from "./IndustryPool/helper";

interface FormState {
	selectedPool?: Pool;
	package?: "silver" | "gold";
}

interface FormStateContext {
	formState: FormState | undefined;
	setFormState: React.Dispatch<React.SetStateAction<FormState | undefined>>;
	currStep: number;
	setCurrStep: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContextValue: FormStateContext = {
	formState: undefined,
	setFormState: () => {},
	currStep: 1,
	setCurrStep: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const formStateContext = createContext(defaultContextValue);

const FormStateContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [formState, setFormState] = useState<FormState>();
	const [currStep, setCurrStep] = useState<number>(1);

	console.log(formState);
	return (
		<formStateContext.Provider
			value={{ formState, setFormState, currStep, setCurrStep }}
		>
			{children}
		</formStateContext.Provider>
	);
};

export default FormStateContextProvider;
