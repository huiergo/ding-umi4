import TextInput from "../../components/TextInput";
import React, { useEffect, useState } from "react";
// @ts-ignore
import { history } from 'umi';
import Button from "../../components/Button";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    console.log('didmount  cookie ......')
    // cookie设置有效期，登出
    if (!document.cookie.includes('token')) {
      alert('请先登录');
      history.push('/login');
    }
  }, []);


  async function submit() {
    try {
      const res = await fetch('/api/project', {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(','),
          imageUrl
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.status !== 200) {
        console.error(await res.text());
        alert('发布失败');
        return;
      }
      // history.push('/project/' + (await res.json()).id);
      history.push('/list')
    } catch (err) {
      console.error(err);
    }
  }

    return <div className="w-full flex justify-center">
    <div className="container lg:px-64 px-8 pt-16">
      <p className="text-3xl font-extrabold">创建项目</p>
      <p className="mt-8">项目名称</p>
      <TextInput value={title} onChange={setTitle} />
      <p className="mt-8">项目ID</p>
      <TextInput value={content} onChange={setContent} />
      <p className="mt-8">项目截图</p>
      <TextInput value={imageUrl} onChange={setImageUrl} />
      <img src={imageUrl} alt="" />
      <Button onClick={submit}>发布</Button>
    </div>
  </div>
}
