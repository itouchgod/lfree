# LFree — 个人 App 产品官网

面向国际用户的个人软件产品矩阵官网，用于展示、发布和持续更新多个自研 App。

- **官网**：https://lfree.cc
- **开发者**：itouchgod
- **联系邮箱**：ukluocn@gmail.com
- **Vercel 预览**：https://lfree.vercel.app
- **GitHub**：https://github.com/itouchgod/lfree

## 部署（Vercel）

项目已关联 Vercel 团队 `ukluos-projects/lfree`，推送 `main` 分支会自动部署。

环境变量（Production）：

| 变量 | 值 |
|------|-----|
| `NEXT_PUBLIC_SITE_URL` | `https://lfree.cc` |

### 绑定域名 lfree.cc

在域名注册商（当前 NS：`ns.yooo.org`）添加 DNS 记录：

| 类型 | 主机 | 值 |
|------|------|-----|
| A | `@` | `76.76.21.21` |
| A 或 CNAME | `www` | `76.76.21.21` 或 `cname.vercel-dns.com` |

或将 NS 改为 Vercel：`ns1.vercel-dns.com`、`ns2.vercel-dns.com`。

DNS 生效后访问 https://lfree.cc

## 技术栈

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- shadcn 风格 UI 组件
- Framer Motion（轻量动效）
- Markdown 本地内容（Blog / Docs / Changelog）

## 快速开始

```bash
npm install
cp .env.example .env.local
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)（默认会跳转到 `/en`）

## 多语言

- 英文：`/en`（例如 `/en/apps/mmh`）
- 中文：`/zh`（例如 `/zh/apps/mmh`）
- 右上角可切换 **EN / 中文**

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 本地开发 |
| `npm run build` | 生产构建 |
| `npm run start` | 启动生产服务 |
| `npm run lint` | ESLint 检查 |

## 项目结构

```
app/                 # 页面路由
components/          # 可复用 UI 组件
content/             # Markdown 内容（blog, docs, changelog）
lib/
  data/              # App 等静态数据
  content.ts         # Markdown 读取
  site.ts            # 站点配置与导航
```

## 页面

| 路径 | 说明 |
|------|------|
| `/` | 首页 |
| `/apps` | App 列表 |
| `/apps/[slug]` | App 详情 |
| `/docs` | 文档中心 |
| `/blog` | 博客 |
| `/changelog` | 更新日志 |
| `/pricing` | 定价 |
| `/about` | 关于 |
| `/privacy` | 隐私政策 |
| `/terms` | 服务条款 |

## 已发布应用

| App | 仓库 | 版本 |
|-----|------|------|
| MMH | [itouchgod/mmh](https://github.com/itouchgod/mmh) | v1.0.0 |
| FileNest | [itouchgod/filenest](https://github.com/itouchgod/filenest) | v0.1.3 |
| Tab X | [itouchgod/tab-x](https://github.com/itouchgod/tab-x) | v2.0.0 |

## 添加内容

- **新 App**：编辑 `lib/data/apps.ts`，并在 `messages/en.json` / `messages/zh.json` 的 `apps` 下增加翻译；文档放在 `content/docs/{slug}-overview.md`
- **新博客/文档/日志**：在 `content/blog|docs|changelog/` 下新增 `.md` 文件，使用 YAML frontmatter

## 环境变量

复制 `.env.example` 为 `.env.local`，设置 `NEXT_PUBLIC_SITE_URL`。

## 后续扩展（预留）

- Supabase：动态内容与用户数据
- Stripe：付费与订阅
- Resend：邮件通知（可选）
- GitHub Release Webhook：自动更新 Changelog

## 视觉风格

深色 graphite + cool blue，macOS 独立开发者官网风格，圆角卡片与柔和阴影。
