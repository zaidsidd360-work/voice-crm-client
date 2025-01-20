import React from "react";
import { X } from "lucide-react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div className="relative w-full max-w-md p-6 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl">
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-xl font-bold text-white">{title}</h3>
					<button
						onClick={onClose}
						className="p-1 rounded-lg hover:bg-white/10 transition-colors"
					>
						<X className="h-5 w-5 text-gray-400" />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
