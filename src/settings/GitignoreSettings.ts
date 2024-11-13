import {
  Setting, setIcon, SettingTab, App
} from 'obsidian';
import { execSync } from 'child_process';
import AutoJournal from '@/main';

export async function gitignoreSettings(
  containerEl: HTMLElement, plugin: AutoJournal, app: App, settingTab: SettingTab
) {
  const toggleSettingContainer = containerEl.createDiv({ cls: 'toggle-setting' });
  toggleSettingContainer.createEl('h2', {text: 'Gitignore'});

  const initialState = plugin.settings.toggleGitignoreSettings;
  const chevronIcon = toggleSettingContainer.createEl('span', { cls: 'chevron-icon' });
  setIcon(chevronIcon, initialState ? 'chevron-down' : 'chevron-right');

  const settingsContainer = containerEl.createDiv();
	settingsContainer.style.display = initialState ? 'block' : 'none';

  toggleSettingContainer.addEventListener('click', async () => {
		const open = settingsContainer.style.display !== 'none';
		if (open) {
			setIcon(chevronIcon, 'chevron-right');
			settingsContainer.style.display = 'none';
			plugin.settings.toggleGitignoreSettings = false;
		} else {
			setIcon(chevronIcon, 'chevron-down');
			settingsContainer.style.display = 'block';
			plugin.settings.toggleGitignoreSettings = true;
		}
		await plugin.saveSettings();
	});

  new Setting(settingsContainer)
    .setName('Gitignore')
    .setDesc('Include or exclude specific files and folders')
    .addTextArea(text => {
      text
        .setValue(plugin.settings.gitignore)
        .onChange(async (value) => {
          plugin.settings.gitignore = value.trim();
        })
        .then((cb) => {
          cb.inputEl.style.width = '100%';
          cb.inputEl.style.resize = 'vertical';
        });
    });

  new Setting(settingsContainer)
    .addButton((button) => {
      button.setButtonText('Save Gitignore')
        .onClick(async () => {
          const vaultAdapter = app.vault.adapter as any;
          const currGitignore = await vaultAdapter.read(".gitignore");
          if(plugin.settings.gitignore === currGitignore){
            return;
          }

          await plugin.saveSettings();
          await vaultAdapter.write(
            ".gitignore",
            plugin.settings.gitignore
          );

          const vaultPath = vaultAdapter.basePath;
          const gitCmd = `git commit -m "update gitignore" "${vaultPath}/.gitignore"`
          await execSync(gitCmd, { cwd: vaultPath });
        });
    });
}