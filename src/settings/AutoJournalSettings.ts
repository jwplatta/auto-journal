export interface AutoJournalSettings {
  gitignore: string,
  llm: string;
  openAI: {
		key: string;
		model: string;
	},
	ollama: {
		host: string;
		model: string;
		models: string[];
	},
}

export const DEFAULT_SETTINGS: AutoJournalSettings = {
  gitignore: "",
  llm: "gpt-4o-mini",
	openAI: {
		key: '',
		model: 'gpt-4o-mini',
	},
	ollama: {
		host: 'http://localhost:11434',
		model: 'llama3.2:latest',
		models: [],
	},
}