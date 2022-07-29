import React, { useEffect, useState } from "react";
import { history } from 'umi';
// @ts-ignore
import { useParams } from 'umi';
import { StatisticCard } from '@ant-design/pro-components';
import { EllipsisOutlined,RightOutlined } from '@ant-design/icons';
import {message} from 'antd'
const { Statistic } = StatisticCard;

export default function Page() {
  const params = useParams();
  const [post, setPost] = useState<any>()
  const [keyword,setKeyword]=useState('')
  const [loading,setLoading]=useState(false)
 
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
      const res = await fetch('/api/list');
      if (res.status === 200) {
        setPost((await res.json())
        .sort((p1: any, p2: any) =>
          new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime()));
      } else {
        setPost(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function inputChange(e){
    console.log('[e]',e.target.value)
    setKeyword(e.target.value)
  }

 async function search(){
    try {
      const hide = message.loading('加载中..', 0);
      const res =  await fetch('/api/list', {
        method: "POST",
        body: JSON.stringify({
          keyword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.status === 200) {
        setPost((await res.json())
        .sort((p1: any, p2: any) =>
          new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime()));
      } else {
        setPost(null);
      }
      hide()
    } catch (err) {
      console.error(err);
    }
  }

  function gotoChart(id:string|number){
    history.push(`/project/${id}`)
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
      <a href="/project/create" className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
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
      <input className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Filter projects..." onChange={inputChange}/>
 </form>
 <button onClick={search}>搜索</button>

  </header>
  <div className="space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">

    <ul className="divide-y divide-gray-200 flex flex-col" >
    {post.map(postItem => (
        <li key={postItem.id} className="w-full py-4 flex" onClick={()=>gotoChart(postItem.title)}>
<StatisticCard
      title={
        <>
          <span>项目：{postItem.title}</span>
          <RightOutlined style={{ color: 'rgba(0,0,0,0.65)' }} />
        </>
      }
      extra={<EllipsisOutlined />}
      statistic={{
        value: 1102893,
        prefix: '¥',
        description: (
          <>
          <Statistic value={15.1} title="PV" suffix="万" layout="horizontal" />
          <Statistic value={15.1} title="UV" suffix="万" layout="horizontal" />
        </>
        ),
      }}
      chart={
        <>
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/BA_R9SIAV/charts.svg"
            alt="chart"
            width="100%"
          />
        </>
      }
      style={{ width: 268 }}
    />
        </li>
      ))}
    </ul>
</div>
 
</section>
    </>}
  </div>
}
