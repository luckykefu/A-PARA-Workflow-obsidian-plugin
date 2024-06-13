import { Editor } from "obsidian";

export async function addPdfSplit(editor: Editor) {
    //获取光标位置
	const cursorPosition = editor.getCursor();
    //获取文件内容
	const fileContent = editor.getValue();
    //获取所有的行
    const lines = fileContent.split('\n');
    let newContent = lines.map((line, index, arr) => {
        // 检查行是否以 '---' 开头
        if (line.trim() === '---') {
            // 检查下一行是否已经包含所需的 div 标签
            const nextLine = arr[index + 1]?.trim() || '';
            if (!nextLine.startsWith('<div STYLE="page-break-after: always;"></div>')) {
                // 如果下一行不包含 div 标签，则追加它
                return `${line}\n<div STYLE="page-break-after: always;"></div>`;
            }
        }
        // 其他行保持不变
        return line;
    }).join('\n');

    editor.setValue(newContent);
	editor.setCursor(cursorPosition);
}
