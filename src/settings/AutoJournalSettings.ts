export interface AutoJournalSettings {
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
	gitignore: string,
	journalFolder: string,
	schedule: string,
	startTime: string,
	toggleGitignoreSettings: boolean,
	toggleOpenAISettings: boolean,
	toggleOllamaSettings: boolean,
}

export const DEFAULT_SETTINGS: AutoJournalSettings = {
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
	gitignore: "*",
	journalFolder: "/",
	schedule: "day",
	startTime: "00:00",
	toggleGitignoreSettings: false,
	toggleOpenAISettings: false,
	toggleOllamaSettings: false
}