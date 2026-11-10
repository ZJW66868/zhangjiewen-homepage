# 张杰文 · 个人主页

> 《开发工具与工程实践》期末作品 · 学号 2026316010006 · 张杰文

一个用 AI 辅助开发的个人主页 + 兴趣展示静态网站，部署在 Linux 虚拟机的 Nginx 上。

## 项目简介

这是一个单页多板块的个人主页，记录自我介绍、学习理念、当前关注的技术方向，
并展示阅读、运动、音乐、摄影、做饭等日常兴趣领域。整体风格简洁现代，
完全使用原生 HTML/CSS/JS 实现，无任何外部依赖，解压后可直接用浏览器打开。

## 技术栈

- HTML5（语义化结构）
- CSS3（Flexbox / Grid / CSS 变量 / 渐入动画 / 响应式）
- 原生 JavaScript（导航高亮、IntersectionObserver 滚动渐入、技能进度条、表单验证）
- SVG 内嵌资源（头像 / favicon，无外部图片依赖）
- 部署：Nginx（Linux 虚拟机）

## 目录结构

```
website-src/
├── index.html           # 网站首页（含全部板块）
├── css/
│   └── style.css        # 全站样式
├── js/
│   └── main.js          # 交互脚本
├── assets/
│   ├── avatar.svg       # 头像
│   └── favicon.svg      # 站点图标
└── README.md            # 本说明文件
```

## 本地预览

直接双击 `index.html` 用浏览器打开即可。或在该目录下启动一个静态服务器：

```bash
# Python 3
python -m http.server 8080
# 然后访问 http://localhost:8080
```

## 部署到 Nginx

详见作业包中的 `03-部署步骤记录.md`。核心步骤：

```bash
# 1. 安装 Nginx
sudo apt update && sudo apt install -y nginx

# 2. 把网站源码放到 Nginx 根目录
sudo mkdir -p /var/www/zhangjiewen
sudo cp -r website-src/* /var/www/zhangjiewen/

# 3. 配置 Nginx root
sudo vim /etc/nginx/sites-available/default
#   root /var/www/zhangjiewen;
#   index index.html;

# 4. 语法检查并重启
sudo nginx -t && sudo systemctl reload nginx
```

## 浏览器兼容

支持现代浏览器（Chrome / Edge / Firefox / Safari 最新版本）。
使用了 IntersectionObserver、CSS Grid 等现代特性，已对老浏览器做降级处理。

## 致谢

本项目在开发过程中使用 AI 工具辅助完成设计与编码，
完整过程记录在作业包的 `02-网站规划.md` 与 `03-部署步骤记录.md` 中。

## 在线仓库

- 代码仓库（GitHub，公开）：`https://github.com/ZJW66868/zhangjiewen-homepage`
- 访问地址：本地虚拟机部署，无公网地址（局域网 IP 形如 `http://192.168.x.x/`）

## 更新日志

- v0.1 (2026-11-10): 初始化项目，完成首页五大板块与全站样式

© 2026 张杰文 · 学号 2026316010006
