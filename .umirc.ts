export default {
  npmClient: "pnpm",
  apiRoute: {
    platform: 'vercel'
  },
  routes: [
    { path: '/login', component: 'login' },
    { path: '/register', component: 'register' },
    // { path: '/', component: 'index' },
    // { path: '/abc', component: 'docs' },
    { path: '/posts/create', component: 'posts/create' },
    { path: '/posts/:postId', component: 'posts/post' },
    
  ],
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
};
