module.exports = class CopySidebarButtonPlugin extends require('obsidian').Plugin {
  async onload() {
    this.ribbon = this.addRibbonIcon('clipboard-copy', 'Copy Note Content', async () => {
      const activeFile = this.app.workspace.getActiveFile();
      if (!activeFile) {
        new Notice('No active file.');
        return;
      }

      const content = await this.app.vault.read(activeFile);

      try {
        await navigator.clipboard.writeText(content);
        new Notice('✅ Copied!');
      } catch (err) {
        console.error('Clipboard error:', err);
        new Notice('❌ Copy failed.');
      }
    });
  }

  onunload() {
    this.ribbon?.remove();
  }
};
