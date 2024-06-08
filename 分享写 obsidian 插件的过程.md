---
tags:
  - resource
created: '2024-05-01 '
---

Obsidian
什么是 obsidian
	个人知识管理软件
	本地化
	markdown 实时预览
	支持中文
	插件丰富
	界面简洁，第三方主题丰富
	易上手
	...
总之，好用

所以就有了写插件的过程
为什么自己写插件？
	软件换来换去，麻烦
	插件开发教程参考资源多
	软件本身插件够多了，但部分插件年久失修，无人维护
	我想要的功能很简单，允许自己写，而市面上也没有相应的插件
插件名叫：A-Para-Periodic-Workflow-Obsidian-Plugin
github：[GitHub - iskefu/A-Para-Periodic-Workflow-Obsidian-Plugin: see the repo name](https://github.com/iskefu/A-Para-Periodic-Workflow-Obsidian-Plugin)
gitee：[Site Unreachable](https://gitee.com/kefu1252/a-para-periodic-workflow-obsidian-plugin)
# 插件的第一个功能
## 初始化 para 文件夹和模板

- 目标：PARA 个人知识管理系统的搭建
	PARA 是企业项目管理办法的个人化，
	私以为受益良多
	为在 Obsidian 中 更方便
	更称手
	更懒的使用 PARA 管理办法
	于是就编写了这个功能
- 功能：
	- 初始化 para 文件夹和模板
		- 创建 Projects 文件夹
			- 用于存放项目文件
		- 创建 Areas文件夹
			- 用于存放领域文件
		- 创建 Resources 文件夹
			- 用于存放资源文件
		- 创建 Archeives 文件夹
			- 用于存放归档文件
		- 创建 Templates 文件夹
			- 用于存放模板文件
		- 创建 Project，Area，Resource 模板文件
			- 位置/Templates
- 第一个功能就这么简单
- 初始化时，para 四个文件夹和模板文件的位置，名称均可自定义
调用：
-  右击侧边栏图标---菜单里
- Ctrl+P 面板
- 左键单击侧边栏图标-->右侧插件视图init
