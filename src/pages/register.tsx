import React, { useState } from 'react';
import styles from './login.less';
import TextInput from "../components/TextInput";
import Button from "../components/Button";
// @ts-ignore
import { history } from "umi";

export default function Page() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    try {
     const res=await fetch('/api/register',{
       headers:{
        'Content-Type': 'application/json'
       },
       method:'POST',
       body:JSON.stringify({email,password})
     })
     console.log('[前端----]',res)
    //  res.json()
     if(res.status!==200){
      console.error(await res.text());
      alert('失败');
     }
     
     const data=await res.json()
     console.log('[后端返回的数据----]',data)
     alert(`welcom back ${data.email}`)
     history.push('/posts/create')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div>
     <div className="w-full flex justify-center">
    <div className="container lg:px-64 px-8 pt-16">
      <p className="text-3xl font-extrabold">注册</p>
      <div className="mt-8">
        <p>邮箱</p>
        <TextInput value={email} onChange={setEmail} />
        <p className="mt-4">密码</p>
        <TextInput value={password} onChange={setPassword} />
        <Button onClick={register}>注册</Button>
      </div>
    </div>
  </div>
    </div>
  );
}
