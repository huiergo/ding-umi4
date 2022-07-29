export default {
  npmClient: "pnpm",
  apiRoute: {
    platform: 'vercel'
  },
  routes: [
    { path: '/',   redirect: '/login'  },
    // { exact: true, path: '/home', component: 'home' },
    { path: '/login', component: 'login' },
    { path: '/register', component: 'register' },
    { path: '/list', component: 'list' },
    // { path: '/chart/:postId', component: 'chart' },
    // { path: '/posts/create', component: 'posts/create'},
    // { path: '/posts/:postId', component: 'posts/post' },
    { path: '/project/create', component: 'project/create'},
    { path: '/project/:postId', component: 'project/chart' },
    
  ],
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
};
