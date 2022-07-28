export default {
  npmClient: "pnpm",
  apiRoute: {
    platform: 'vercel'
  },
  routes: [
    { path: '/',   redirect: '/login'  },
    { path: '/login', component: 'login' },
    { path: '/register', component: 'register' },
    // { path: '/abc', component: 'docs' },
    { path: '/posts/create', component: 'posts/create'},
    { path: '/posts/:postId', component: 'posts/post' },
    
  ],
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
};
