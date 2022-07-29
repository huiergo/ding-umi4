import React, { useEffect, useState } from "react";
import { history } from 'umi';
// @ts-ignore
import { useParams } from 'umi';

export default function Page() {
  const params = useParams();
  const [post, setPost] = useState<any>()

  useEffect(() => {
    refresh();
  }, [])

  useEffect(() => {
    console.log('didmount  cookie ......')
    // cookie设置有效期，登出
    if (!document.cookie.includes('token')) {
      alert('请先登录');
      history.push('/login');
    }
  }, []);

  async function refresh() {
    try {
      const res = await fetch('/api/posts/' + params.postId)
      const post = await res.json()
      if (res.status === 200) {
        setPost(post)
      } else {
        setPost(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function gotoChart(id:string|number){
    history.push(`/chart/${id}`)
  }

  if (post === null) {
    return <div>Post with ID {params.postId} not found.</div>
  }
  return <div className="max-w-screen overflow-x-hidden">
    {post === undefined && <div
        className="fixed w-screen h-screen flex justify-center items-center">
        <p className="animate-pulse">Loading...</p>
    </div>}
    {post &&
     <>
      <section>
  <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
    <div className="flex items-center justify-between">
      <h2 className="font-semibold text-slate-900">Projects</h2>
      <a href="/posts/create" className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
        <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
        </svg>
        New
      </a>
    </div>
    <form className="group relative">
      <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
      </svg>
      <input className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Filter projects..." />
    </form>
  </header>
  <div className="space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
  <div onClick={()=>gotoChart(1)}>01</div>
  <div onClick={()=>gotoChart(2)}>02</div>
</div>
 
</section>
    </>}
  </div>
}
