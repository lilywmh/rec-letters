# rec-letters

推荐信进度页。教授打开自己的专属链接，就能看到材料、提交方式和 checklist，交完可以自己打勾。你在 `admin.html` 后台统一管理所有内容。

- 教授页面：`https://lilywmh.github.io/rec-letters/#<专属码>`（专属码在后台的 Professors 标签里复制）
- 你的后台：`https://lilywmh.github.io/rec-letters/admin.html`

## 一次性设置（约 10 分钟）

### 1. 上传文件
在 GitHub 仓库页面点 **Add file → Upload files**，把这 6 个文件拖进去：
`index.html`、`admin.html`、`style.css`、`firebase-config.js`、`firestore.rules`、`README.md`，然后点 Commit。

### 2. 打开 GitHub Pages
仓库里点 **Settings → Pages**，Source 选 **Deploy from a branch**，Branch 选 `main`、文件夹选 `/ (root)`，然后 Save。等一两分钟，网站就上线了。

### 3. 建 Firebase 项目
1. 打开 console.firebase.google.com，点 **Add project**，名字随便取（比如 rec-letters）。Analytics 可以关掉。
2. 进入项目后点 **</>（Web）** 添加一个 Web app，把生成的 `firebaseConfig` 里的几行复制下来。
3. 左侧菜单进 **Build → Firestore Database → Create database**，选 production mode，地区选 `us-west`。
4. 左侧菜单进 **Build → Authentication → Get started**，在 Sign-in method 里开启 **Google**。
5. 在 Authentication → **Settings → Authorized domains** 里点 Add domain，填入 `lilywmh.github.io`。

### 4. 填配置
- 在 GitHub 上打开 `firebase-config.js`，点铅笔图标编辑。把 `PASTE_HERE` 换成第 3 步复制的值，`ADMIN_EMAIL` 换成你登录用的 Gmail，然后保存。
- 打开 Firebase 的 **Firestore → Rules**，把 `firestore.rules` 的全部内容粘贴进去，把里面的 Gmail 换成你的，再点 Publish。

### 5. 第一次登录
打开 `admin.html`，用 Google 登录。把 `starter.json` 的全部内容粘贴进输入框，点 **Load starter data**。
`starter.json` **不要上传到仓库**，它只在你自己电脑上用这一次。仓库里只有代码，不含任何个人信息。

## 日常使用
- **改状态**：在 Status 标签里点格子，会立刻保存。
- **改学校、材料链接、写信要点**：改完点底部的 **Publish changes**，所有教授的页面会一起更新。
- **催信**：在 Reminder email 标签里选教授和情况，复制邮件就能用。

## 隐私
这个仓库可以设为公开：代码里没有你的学校、教授或材料信息，`firebase-config.js` 里的值也可以公开，真正保护数据的是 Firebase 的规则。
每位教授的页面用一串随机码命名。只有拿到准确链接的人才能打开那一页，没有人能列出或猜到其他页面。总表只有你登录后才能看到。教授只能修改自己页面上的勾选状态，其他内容都改不了。
