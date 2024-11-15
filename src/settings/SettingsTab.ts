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

    new Setting(containerEl)
      .setName('Journal Entries Folder')
      .setDesc('Folder to store journal entries')
      .addText(text => {
        text
          .setPlaceholder('Journal')
          .setValue(this.plugin.settings.journalFolder)
          .onChange(async (value) => {
            this.plugin.settings.journalFolder = value;
            await this.plugin.saveSettings();
          })
          .then((cb) => {
            cb.inputEl.style.width = '100%';
          });
      });


    new Setting(containerEl)
      .setName("Writing Schedule")
      .setDesc("How often the days journal entry should be updated.")
      .addDropdown(dropdown =>
        dropdown
          .addOption("minute", "Every Minute")
          .addOption("hour", "Every Hour")
          .addOption("day", "Once a Day")
          .setValue(this.plugin.settings.schedule)
          .onChange(async (value) => {
            this.plugin.settings.schedule = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Start Time")
      .setDesc("Specify the  (HH:MM).")
      .addText(text =>
        text
          .setPlaceholder("08:00")
          .setValue(this.plugin.settings.startTime)
          .onChange(async (value) => {
            this.plugin.settings.startTime = value;
            await this.plugin.saveSettings();
          })
      );

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
