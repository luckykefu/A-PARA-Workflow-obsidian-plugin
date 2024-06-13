//UTF-8 //
//Author：luckin cafe
//date：2024-05-20
//version：1.0.0
//description：A-Para-Periodic-Workflow-Obsidian-Plugin 插件的主要代码
import { OpenInVSCode, moveToArchives } from "func/FileMenu";
import { Publish } from "func/Publish";
import { addYamlAttributes, deleteYamlAttributes } from "func/YAMLAddAndDel";
import { addPdfSplit } from "func/addPdfSplit";
import { delEmptyLine } from "func/delEmptyLine";
import { test } from "gray-matter";
import { getMessage } from "i18n/i18n"; // 导入国际化函数，用于获取翻译后的消息
import { App, Editor, Plugin, TAbstractFile } from "obsidian"; // 导入 Obsidian 插件基类
import { RibbonRightClickMenu } from "src/RibbonRightClickMenu";
import { CreateView, VIEW } from "src/VIEW";
import { addCommand } from "src/addCommand";
import { myEmitterListener } from "src/myEmitterListener";
import { SampleSettingTab } from "src/settings";
import { MyPluginSettings, DEFAULT_SETTINGS } from "src/settings";
import { t } from "test/test";
// 插件类，扩展自 Plugin 类
export default class MyPlugin extends Plugin {
	settings: MyPluginSettings; // 插件设置，扩展自 MyPluginSettings 接口

	// 当插件加载时执行的逻辑
	async onload() {
		await this.loadSettings(); // 加载插件设置
		const self = this;
		this.addSettingTab(new SampleSettingTab(this.app, this)); // 添加设置标签页

		// 注册视图
		this.registerView(
			VIEW,
			(leaf) => new CreateView(leaf, this.app, this.settings)
		);

		// 在侧边栏添加一个图标，点击时执行提供的回调
		const ribbonIconEl = this.addRibbonIcon(
			"target",
			await getMessage("PARAPeriodicWorkflow"),
			async (evt: MouseEvent) => {
				if (evt.button !== 0) {
					return;
				} // 仅允许主点击操作
				this.app.workspace.detachLeavesOfType(VIEW); // 移除当前活动视图
				await this.app.workspace.getRightLeaf(false)?.setViewState({
					type: VIEW,
					active: true,
				}); // 设置视图状态为激活
				this.app.workspace.revealLeaf(
					// 显示视图
					this.app.workspace.getLeavesOfType(VIEW)[0]
				);
			}
		);

		const ribbonIconClass = "a-para-periodic-workflow-ribbon-class"; // CSS 类
		ribbonIconEl.addClass(ribbonIconClass); // 为图标添加 CSS 类

		RibbonRightClickMenu(this.app, this.settings, `.${ribbonIconClass}`); // 为图标添加右键菜单

		addCommand(this); // 注册命令

		// 注册事件，为文件菜单添加一个项  OpenInVSCode
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				menu.addItem((item) => {
					item.setTitle(`Move To ${this.settings.archivePath} 👈`)
						.setIcon("archive")
						.onClick(async () => {
							moveToArchives(this.app, this.settings, file); // 移动文件到归档文件夹中
						});
				});
				menu.addItem((item) => {
					item.setTitle("Open in VSCode 👈")
						.setIcon("target")
						.onClick(async () => {
							OpenInVSCode(this.app, file); // 打开文件在 VSCode 中
						});
				});

				menu.addItem((item) => {
					item.setTitle(`Publish To ... 👈`)
						.setIcon("upload")
						.onClick(async () => {
							Publish(this.app, file,self.settings);
						});
				});
				menu.addItem((item) => {
					item.setTitle(`test`)
						.setIcon("test")
						.onClick(async () => {
							t(this.app, this.settings, file); // 添加YAML属性
						});
				});
			})
		);
		// 当文件打开时，监听事件，并根据设置执行自动添加或删除YAML属性的操作
		this.app.workspace.on("file-open", async (event) => {
			// 如果设置为自动添加YAML属性，则调用addYamlAttributes方法
			if (this.settings.autoAddYaml) {
				addYamlAttributes(this.app, this.settings);
			}
			// 如果设置为自动删除YAML属性，则调用deleteYamlAttributes方法
			if (this.settings.autoDelYaml) {
				deleteYamlAttributes(this.app, this.settings);
			}
		});

		//删除多余空行
		this.app.workspace.on("editor-change", async (editor: Editor) => {
			// 如果设置为自动添加YAML属性，则调用addYamlAttributes方法

			if (this.settings.DelEmptyLine) {
				try {
					await delEmptyLine(editor);
				} catch (error) {
					console.error("Error in delEmptyLine:", error);
				}
			}
			if (this.settings.addPdfSplit){
				try {
					await addPdfSplit(editor);
				} catch (error) {
					console.error("Error in addPdfSplit",error);
				}
			}
		});
		//监听VIEW的点击事件
		myEmitterListener(this.app, this.settings);
	}

	// 当插件卸载时执行的逻辑
	async onunload() {
		this.app.workspace.detachLeavesOfType(VIEW); // 清理视图

		await this.saveData(this.settings); // 保存插件设置
	}

	// 加载插件设置的逻辑
	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	// 保存插件设置的逻辑
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
