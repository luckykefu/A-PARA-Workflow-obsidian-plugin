import { App, Notice, TAbstractFile } from "obsidian";
import path from "path";
import fs from "fs";
import { getMessage } from "i18n/i18n";
import { SuggestModal } from "obsidian";
import { WXGZHAutoPublish } from "./publishFunc/WXGZHAutoPublish";
import { CSDNAutoPublish } from "./publishFunc/CSDNAutoPublish";
import { ZhihuAutoPublish } from "./publishFunc/ZhihuAutoPublish";
import { JianshuAutoPublish } from "./publishFunc/JianshuAutoPublish";
import { JuejinAutoPublish } from "./publishFunc/JuejinAutoPublish";
import { ToutiaoAutoPublish } from "./publishFunc/ToutiaoAutoPublish";
import { BaijiahaoAutoPublish } from "./publishFunc/BaijiahaoAutoPublish";
import { BilibiliAutoPublish } from "./publishFunc/BilibiliAutoPublish";
import { TencentCloudAutoPublish } from "./publishFunc/TencentCloudAutoPublish";
import { MyPluginSettings } from "src/settings";

export async function Publish(app: App, file: TAbstractFile,settings:MyPluginSettings ) {
	const full_path = path.join(app.vault.adapter.getBasePath(), file.path);
	// console.log(full_path);
	if (!fs.statSync(full_path).isFile()) {
		new Notice(await getMessage("publish_folder_not_supported"));
		return;
	}

	new PublishModal(app, full_path,settings).open();
}

interface Platform {
	name: string;
}
const ALL_PLATFORMS = [
	{
		name: "Publish To :    All Platforms",
	},
	{
		name: "Publish To :    知乎",
	},
	{
		name: "Publish To :    CSDN",
	},
	{
		name: "Publish To :    百家号",
	},
	{
		name: "Publish To :    今日头条",
	},
	{
		name: "Publish To :    哔哩哔哩",
	},
	{
		name: "Publish To :    微信公众号",
	},
	{
		name: "Publish To :    掘金",
	},
	{
		name: "Publish To :    简书",
	},
	{
		name: "Publish To :    腾讯云",
	},
];
export class PublishModal extends SuggestModal<Platform> {
	private filePath: string; // 添加一个成员变量来存储文件信息
	private settings: MyPluginSettings;
	constructor(app: App, filePath: string,settings:MyPluginSettings ) {
		super(app);
		this.filePath = filePath;
		this.settings = settings;
	}
	getSuggestions(query: string): Platform[] {
		return ALL_PLATFORMS.filter((platform) =>
			platform.name.toLowerCase().includes(query.toLowerCase())
		);
	}

	// Renders each suggestion item.
	renderSuggestion(platform: Platform, el: HTMLElement) {
		el.createEl("div", { text: platform.name });
	}

	// Perform action on the selected suggestion.
	onChooseSuggestion(platform: Platform, evt: MouseEvent | KeyboardEvent) {
		publishToPlatform(this.app, platform.name, this.filePath,this.settings);
	}
}
function publishToPlatform(
app: App, platformName: string, filePath: string, settings: MyPluginSettings) {
	// 根据平台名称执行不同的发布逻辑
	switch (platformName) {
		case "Publish To :    All Platforms":
			AllPlatformsAutoPublish(app, filePath,settings);
			break;
		case "Publish To :    知乎":
			ZhihuAutoPublish(app, filePath,settings);
			break;
		case "Publish To :    CSDN":
			CSDNAutoPublish(app, filePath,settings);
			break;
		case "Publish To :    百家号":
			BaijiahaoAutoPublish(app, filePath,settings);
			break;
		case "Publish To :    今日头条":
			ToutiaoAutoPublish(app, filePath,settings);
			break;
		case "Publish To :    哔哩哔哩":
			BilibiliAutoPublish(app, filePath,settings);
			break;
		case "Publish To :    微信公众号":
			WXGZHAutoPublish(app, filePath,settings);
			break;
		case "Publish To :    掘金":
			JuejinAutoPublish(app, filePath,settings);
			break;
		case "Publish To :    简书":
			JianshuAutoPublish(app, filePath,settings);
			break;
		case "Publish To :    腾讯云":
			TencentCloudAutoPublish(app, filePath,settings);
			break;
		default:
			break;
	}
}

export async function AllPlatformsAutoPublish(app: App, filePath: string,settings:MyPluginSettings) {
	await WXGZHAutoPublish(app, filePath,settings);
	await CSDNAutoPublish(app, filePath,settings);
	await ZhihuAutoPublish(app, filePath,settings);
	await JianshuAutoPublish(app, filePath,settings);
	await JuejinAutoPublish(app, filePath,settings);
	await BaijiahaoAutoPublish(app, filePath,settings);
	await BilibiliAutoPublish(app, filePath,settings);
	await TencentCloudAutoPublish(app, filePath,settings);
}
