import React, { useState, useEffect, useRef } from 'react';
// import { List } from 'react-virtualized';
import './GridList.less';

/**
 * 生成数据函数
 */
const generateData = (title='', count=30) => {
  return [ ...new Array(count).keys() ].map((item) => ({
    id: item + performance.now(),
    title: `${title} ${item}`,
    url: ''
  }))
}


/**
 * 列表组件
 * @param {*} props 
 */
const GridList = (props) => {
  const { type, url } = props
  const [ data, setData ] = useState([])
  const [ selectedKeys, setSelectedKeys ] = useState([])
  const ioRef = useRef(null)

  // 初始化数据
  useEffect(() => {
    getData()
    setSelectedKeys([])
  }, [ type ])

  // 异步加载图片
  useEffect(() => {
    // 也可以做成异步加载更多
    // 当数据量较大时，可以考虑react-virtualized虚拟渲染
    ioRef.current = new IntersectionObserver(entries => {
      entries.forEach((item) => {
        if(item.isIntersecting){
          item.target.src = item.target.dataset.src 
          ioRef.current && ioRef.current.unobserve(item.target)	
        }
      })
    });
    const imgs = document.querySelectorAll('[data-src]');
    imgs.forEach((item)=>{
      ioRef.current.observe(item)
    })
  })

  const getData = (index=0) => {
    switch(type) {
      case 'electric': // 家电类型
        // awiat axios.get(url, { params }).then().catch()
        setData(generateData('家电图片', index + 30))
        break
      case 'fruit': // 水果
       // awiat axios.get(url, { params }).then().catch()
        setData(generateData('水果图片', index + 30))
        break
      default:
        return
    }
  }

  const handleClickImg = (item) => {
    // 处理点击图片逻辑
    if (!selectedKeys.includes(item.id)) {
      setSelectedKeys(pre => [ ...pre, item.id ])
      props.callback(item, 'add')
    } else {
      setSelectedKeys(pre => pre.filter(c => c !== item.id))
      props.callback(item, 'remove')
    }
  }

  const generateItem = (list) => {
    return (list || []).map((item) => {
      const { id, title, url } = item
      const isSelected = selectedKeys.includes(id)
      return (
        <div key={id} className={isSelected ? `${'grid-card'} ${'selected'}` : 'grid-card'} onClick={(e) => handleClickImg(item)}>
          { title }
          {/* <img data-src={url} alt='图片' /> */}
        </div>
      )
    })
  }

  return (
    <div className={"grid-list"}>
      { data.length ? generateItem(data) : '暂无数据' }
    </div>
  )
}

GridList.defaultProps = {
  // 类型 electric: 家电类型，fruit：水果类型
  type: '',
  // 像后端请求的url
  url: '',
  // 回调函数
  callback: () => {}
}

export default React.memo(GridList);