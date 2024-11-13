import { App, PluginSettingTab, Setting } from 'obsidian';
import { openAISettings } from '@/src/settings/OpenAISettings';
import { ollamaSettings } from '@/src/settings/OllamaSettings';
import { gitignoreSettings } from '@/src/settings/GitignoreSettings';
import AutoJournal from '@/main';

export class SettingsTab extends PluginSettingTab {
  app: App;
	plugin: AutoJournal;

	constructor(app: App, plugin: AutoJournal) {
		super(app, plugin);
    this.app
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
    containerEl.empty();
		containerEl.createEl('h1', { text: 'Auto Journal Settings' });


    // new Setting(containerEl)
    //   .setName('Exclude Files and Folders')
    //   .setDesc('Exclude specific files and folders')
    //   .addTextArea(text => {
    //     text
    //       .setPlaceholder('file1.md, /Notes')
    //       .setValue(this.plugin.settings.fileExclusions.join(', '))
    //       .onChange(async (value) => {
    //         this.plugin.settings.fileExclusions = value.split(',').map((v: string) => v.trim());
    //         await this.plugin.saveSettings();
    //       })
    //       .then((cb) => {
    //         cb.inputEl.style.width = '100%';
    //         cb.inputEl.style.resize = 'vertical';
    //       });
    //   });

    gitignoreSettings(containerEl, this.plugin, this.app, this);

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
