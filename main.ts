import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { SettingsTab } from 'src/settings/SettingsTab';
import { execSync } from 'child_process';

interface AutoJournalSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: AutoJournalSettings = {
	mySetting: 'default'
}

export default class AutoJournal extends Plugin {
	settings: AutoJournalSettings;

	async onload() {
		await this.loadSettings();

		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			new Notice('This is a notice!');
		});
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		this.addCommand({
			id: 'show-git-diff',
			name: 'Show Git Diff',
			callback: () => {
				try {
					const vaultAdapter = this.app.vault.adapter as any;
					const vaultPath = vaultAdapter.basePath;
					console.log("vault path: ", vaultPath);

					const diff = execSync('git diff', { cwd: vaultPath }).toString();

					new GitDiffModal(this.app, diff).open()

				} catch (error) {
						console.error('Error running git command:', error);
				}
			}
		});

		this.addSettingTab(new SettingsTab(this.app, this));

		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class GitDiffModal extends Modal {
	diff: string;
	constructor(app: App, diff: string) {
		super(app);
		this.diff = diff;
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText(this.diff);
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

