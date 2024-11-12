import { App, PluginSettingTab, Setting } from 'obsidian';
import { openAISettings } from '@/src/settings/OpenAISettings';
import { ollamaSettings } from '@/src/settings/OllamaSettings';
import AutoJournal from '@/main';

export class SettingsTab extends PluginSettingTab {
	plugin: AutoJournal;

	constructor(app: App, plugin: AutoJournal) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
    containerEl.empty();
		containerEl.createEl('h1', { text: 'Auto Journal Settings' });

		addHorizontalRule(containerEl);
    // NOTE: folder for journal entries
    // NOTE: schedule for writing the journal entries
    // NOTE: configure them models

    addHorizontalRule(containerEl);
    openAISettings(containerEl, this.plugin, this);

    addHorizontalRule(containerEl);
    ollamaSettings(containerEl, this.plugin, this);
	}
}

function addHorizontalRule(containerEl: HTMLElement) {
	const separator = document.createElement('hr');
	separator.style.margin = '1rem 0';
	containerEl.appendChild(separator);
}
