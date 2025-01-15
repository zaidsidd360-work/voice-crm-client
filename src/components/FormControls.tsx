import { useContext } from "react";
import { formStateContext } from "../formStateContext";

interface FormControlProps {
	handleNext: () => boolean;
}

const FormControls = ({ handleNext }: FormControlProps) => {
	const { currStep, setCurrStep } = useContext(formStateContext);

	return (
		<div className="flex justify-between sticky bottom-0 py-3 px-10 bg-[#242424] min-w-[70vw] border-t border-gray-500">
			<button
				onClick={() =>
					setCurrStep((prev) => {
						if (prev === 1) return 1;
						return prev - 1;
					})
				}
				disabled={currStep === 1}
				className={`${
					currStep === 1
						? "opacity-50 cursor-not-allowed border-none"
						: ""
				}`}
			>
				Previous step
			</button>
			<button
				onClick={() => {
					const isOkToContinue = handleNext();
					if (!isOkToContinue) return;
					setCurrStep((prev) => {
						if (currStep === 3) return 3;
						return prev + 1;
					});
				}}
			>
				{currStep === 3 ? "Submit" : "Next step"}
			</button>
		</div>
	);
};

export default FormControls;
