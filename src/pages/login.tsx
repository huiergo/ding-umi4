import React, { useState } from 'react';
import styles from './login.less';
import TextInput from "../components/TextInput";
import Button from "../components/Button";
// @ts-ignore
import { history } from "umi";

export default function Page() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    try {
     const res=await fetch('/api/login',{
       headers:{
        'Content-Type': 'application/json'
       },
       method:'POST',
       body:JSON.stringify({email,password})
     })
     if(res.status!==200){
      alert(`账号或者密码错误`)
      return console.error(res.text())
     }
     const data=await res.json()
     alert(`${data.email}~ 欢迎回来`)
     history.push('/list')
 
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div>
     <div className="w-full flex justify-center">
    <div className="container lg:px-64 px-8 pt-16">
      <p className="text-3xl font-extrabold">用户登入</p>
      <div className="mt-8">
        <p>邮箱</p>
        <TextInput value={email} onChange={setEmail} />
        <p className="mt-4">密码</p>
        <TextInput value={password} onChange={setPassword} />
        <Button onClick={submit}>登入</Button>
      </div>
    </div>
  </div>
    </div>
  );
}
