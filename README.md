pnpm dlx create-umi@latest(会自动执行set up)
pnpm dev

PlanetScale: https://auth.planetscale.com/sign-in
    create sql
    connect sql
        with prisma-> 生成 让 Prisma 连接数据库的连线信息
1. Serverless数据库
用MySQL的可靠性和开源Vitess的规模，在十秒内部署一个完全托管的数据库。内置连接池意味着您永远不会遇到数据库的连接限制。

2. PlanetScale的专有数据分支 像对待代码一样对待数据库。立即对生产数据库进行分支，以创建用于测试模式更改的登台环境
3. 非阻塞模式变化 PlanetScale的非阻塞模式更改特性使其可以安全地将模式更改部署到生产环境中。我们使模式管理作为CI/CD过程的一部分变得很容易自动化。
4. github代码对比，批注
5.  通过图形跟踪数据库读写来深入了解生产流量。使用查询统计特性识别和优化慢速查询。
ding-umi4 数据库地址： https://app.planetscale.com/organize/ding-umi4

这三个包说明
pnpm i -d prisma @types/bcryptjs @types/jsonwebtoken 
pnpm i @prisma/client bcryptjs jsonwebtoken

"build": "prisma generate && umi build",// 这可以确保每次开始构建以前都已经生成好 Prisma 客户端。

npx umi g tailwindcss // ??
<!-- npx umi g xxx -->
生成页面
npx umi g page login posts/post posts/create

<!-- *** umi配置（apiRoute ,routes 路由配置） 说明 -->
// .umirc.ts
``` 
export default {
  npmClient: 'pnpm',
  apiRoute: {
    platform: 'vercel'
  },
  routes: [
    { path: '/', component: 'index' },
    { path: '/posts/create', component: 'posts/create' },
    { path: '/login', component: 'login' },
    { path: '/posts/:postId', component: 'posts/post' },
  ],
  plugins: [require.resolve('@umijs/plugins/dist/tailwindcss')],
  tailwindcss: {}
};
```

<!-- 为了顺利部署项目到 Vercel ，你需要在项目根目录下加入一个 vercel.json 配置文件， 说明？？ -->
platform: 'vercel'

{
    "build": {
      "env": {
        "ENABLE_FILE_SYSTEM_API": "1"
      }
    },
    "rewrites": [
      {
        "source": "/api/:match*",
        "destination": "api/:match*"
      }
    ]
  }

  <!-- 动态匹配 -->
  /api/posts/1 和 /api/posts/2，这两个请求都会交给 src/api/posts/[postId].ts 处理，但他们的 req.params 分别是 { postId: 1 } 和 { postId: 2 }。

  <!-- 每个 .ts 文件就是一个 API Handler -->
  默认导出一个函数

  <!-- 定义schema, 确定数据库格式 -->
  定义好数据格式以后，我们要让 Prisma 帮我们根据 Schema 设计来生成对应的客户端，并且自动的将数据库迁移至为我们设计的格式，
  1. .env 文件， 连接到数据库 
  2. 新建 prisma/schema.prisma （内容说明？ 特殊 @@index）

  <!-- 会帮我们将 MySQL 数据库迁移为我们定义的格式 -->
  npx prisma migrate dev --name init
      可能会报错：Please make sure the database user has permission to create databases. 
      Original error: 
        create database is not supported
      https://pris.ly/d/migrate-shadow
      planetScale官网（包括）： https://planetscale.com/docs/concepts/secure-connections#ca-root-configuration

  临时解决方案： 
    npx prisma db push --preview-feature
  <!-- 会帮我们生成一个按照我们的 Schema 设计量身定制的客户端包。 -->
  npx prisma generate
  <!-- 本地prisma -->
  npx prisma studio

  <!-- jwt 加密关键词，可放在环境变量中 -->
  "dev": "cross-env PORT=3000 UMIAPP=dev umi dev",
  const secret = process.env.UMIAPP;

  import { history } from "umi";
  history.push('/posts/create')

### 根据token判断是否登录, 未登录  document.cookie.includes('token')
 ```
  useEffect(() => {
    if (!document.cookie.includes('token')) {
      alert('请先登录');
      history.push('/login');
    }
  }, []);
  ```
<!-- redis -->
fetch之后
<!--  git 发布，关联 cloud prisma -->