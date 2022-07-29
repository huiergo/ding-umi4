import { Link, Outlet } from 'umi';
import styles from './index.less';
import { history } from 'umi';
import { delCookie } from '@/utils/cookie';

export default function Layout() {

  async function clear() {
    try {
      const res=await fetch('/api/clear',{
        method:'POST'
      })
      if(res.status!=200){
        return console.error(res.text())
      }
      history.push('/login')
      alert(`已清空`)
    } catch (error) {
      console.error(error)
    }
  }

  function logout(){
    try {
      delCookie('token')
      history.push('/login')

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/login">登录</Link>
        </li>
        <li>
          <Link to="/register">注册</Link>
        </li>
        <li onClick={logout}>
          登出
        </li>
      </ul>

      <div className="relative">
      <div
        className="fixed w-72 bottom-8 right-8 py-4 z-50 flex transition-all
        justify-end flex-col p-4 bg-white shadow hover:shadow-xl rounded">
        <p className="text-right text-xs" onClick={clear}>
         清空数据
        </p>
      </div>
     
    </div>
      <Outlet />
    </div>
  );
}
