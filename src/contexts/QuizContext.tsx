import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface QuizContextType {
	answers: string[];
	setAnswers: (answers: string[]) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
	const [answers, setAnswers] = useState<string[]>([]);

	return (
		<QuizContext.Provider value={{ answers, setAnswers }}>
			{children}
		</QuizContext.Provider>
	);
};

export const useQuiz = (): QuizContextType => {
	const context = useContext(QuizContext);
	if (!context) {
		throw new Error("useQuiz must be used within a QuizProvider");
	}
	return context;
};
