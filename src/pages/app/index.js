import React, { useState } from 'react';
import { Button } from 'antd';
import './index.less';
import GridList from './GridList';

const Index = (props) => {
  // 选择的商品
  const [ selectedGoods, setSelectedGoods ] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("submit ", selectedGoods)
  }

  const updateSelectedGoods = (item, type='add') => {
    if (item) {
      if (type === 'add') {
        if (selectedGoods.every(c => c && (c.id !== item.id))) {// 去重
          setSelectedGoods(selectedGoods.concat(item))
        }
      } else {
        setSelectedGoods(selectedGoods.filter(c => c.id !== item.id))
      }
    }
  }

  return (
    <div className={'app'}>
      <div className={'header'}>
        <Button className={'btn-submit'} type="primary" onClick={handleSubmit}>购物车</Button>
      </div>
      <div className={'content'}>
        <GridList type={'electric'} callback={updateSelectedGoods} />
        <hr />
        <GridList type={'fruit'} callback={updateSelectedGoods} />
      </div>
      <div className={'footer'}>
        XXX ©2019 Created by Web Front-end Team
      </div>
    </div>
  )
}

export default Index;