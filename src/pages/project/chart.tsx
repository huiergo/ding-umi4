import React, { useEffect, useState } from "react";
import { history } from 'umi';
// @ts-ignore
import { useParams } from 'umi';

import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';

const { Statistic, Divider } = StatisticCard;

export default function Page() {
  const params = useParams();
  console.log('[params]',params)
  const [post, setPost] = useState<any>()
  const [responsive, setResponsive] = useState(false);


  useEffect(() => {
    // refresh();
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
      const res = await fetch('/api/project/' + params.postId)
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


  if (post === null) {
    return <div>Post with ID {params.postId} not found.</div>
  }

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
        <StatisticCard
          statistic={{
            title: '总流量(人次)',
            value: 601986875,
          }}
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '付费流量',
            value: 3701928,
            description: <Statistic title="占比" value="61.5%" />,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
              alt="百分比"
              width="100%"
            />
          }
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: '免费流量',
            value: 1806062,
            description: <Statistic title="占比" value="38.5%" />,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
              alt="百分比"
              width="100%"
            />
          }
          chartPlacement="left"
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
}
