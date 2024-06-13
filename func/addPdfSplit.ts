import { App, Editor, TAbstractFile, TFile } from "obsidian";
import matter from "gray-matter";
import { MyPluginSettings } from "src/settings";

export async function addPdfSplit(editor: Editor) {
	try {
    //获取光标位置
	const cursorPosition = editor.getCursor();
    //获取文件内容
	const fileContent = editor.getValue();
	const parsedContent = matter(fileContent);
	// 定义替换的正则表达式和替换内容
	const delimiter = '---\n';
	const pageBreakHTML = '<div style="page-break-after: always;"></div>';
	parsedContent.content= parsedContent.content.replace(/<div\s*style\s*=\s*"\s*page-break-after\s*:\s*always\s*;\s*"><\/div>/gi, '');
	parsedContent.content= parsedContent.content.replace(/---\n/g, `${delimiter}${pageBreakHTML}`);
	const updatedContent = matter.stringify(parsedContent.content, parsedContent.data);
	
	if (updatedContent!==fileContent){
		editor.setValue(updatedContent);
		editor.setCursor(cursorPosition);
	}

	} catch (error) {
		console.error("Error in addPdfSplit:", error);
	}
}
export async function addPdfSplitFileMenu(app:App,settings: MyPluginSettings,file: TAbstractFile) {
	try {
		// 判断是否是md文件
		if (!(file instanceof TFile) || file.extension !== "md") {
			// console.error("Not a Markdown file:", file);
			return;
		}
        // 获取文件内容
        const fileContent = await app.vault.read(file);
		const parsedContent = matter(fileContent);
		// 定义替换的正则表达式和替换内容
		const delimiter = '---\n';
		const pageBreakHTML = '<div style="page-break-after: always;"></div>';
		parsedContent.content= parsedContent.content.replace(/<div\s*style\s*=\s*"\s*page-break-after\s*:\s*always\s*;\s*"><\/div>/gi, '');
		parsedContent.content= parsedContent.content.replace(/---\n/g, `${delimiter}${pageBreakHTML}`);
 		const updatedContent = matter.stringify(parsedContent.content, parsedContent.data);
		// 写回文件内容
		if (updatedContent !== fileContent) {
			await app.vault.modify(file, updatedContent);
		}

	} catch (error) {
		console.error("Error in addPdfSplitFileMenu:", error);
	  }
}