import React, { useEffect, useState } from 'react'
import makeApiRequest from '../../utils/makeApiRequest'
import { useCookies } from 'react-cookie'
import { IRequestParams, order, orderBy, PARAM_ID } from '../../model/RequestParams'
import Pagination from '../../components/Pagination/Pagination'
import './List.scss'
import { useHistory } from 'react-router-dom'
import SettingsBar from '../../components/SettingsBar/SettingsBar'
import { ListType } from '../../model/ListTypeInterface'
import ListElementHorizontal from '../../components/ListElementHorizontal/ListElementHorizontal'
import ListElementGrid from '../../components/ListElementGrid/ListElementGrid'
import { PostInterface } from '../../model/PostInterface'

const getUrlPageParam = () => {
  const urlParams = new URLSearchParams(window.location.search)
  return parseInt(urlParams.get('page')) || 1
}

const List = () => {
  const [postsList, setPostsList] = useState([])
  const [cookies] = useCookies()
  const history = useHistory()
  const [requestParams, setRequestParams] = useState<IRequestParams>(
    {
      page: getUrlPageParam(),
      order: 'asc',
      orderBy: PARAM_ID
    }
  )
  const [listType, setListType] = useState<ListType>('list')

  useEffect(() => {
    (async () => {
      const apiResponse = await makeApiRequest(
        `posts?page=${requestParams.page}&order=${requestParams.order}&orderBy=${requestParams.orderBy}`,
        'GET',
        true,
        cookies.auth
      )
      setPostsList(apiResponse.response)
    })()
  }, [requestParams])

  const setPage = (page: number) => {
    setRequestParams({ ...requestParams, page })
    history.push({
      pathname: '/',
      search: '?' + new URLSearchParams({ page: page.toString() }).toString()
    })
  }

  const setSortingOrder = (order: order) => {
    setRequestParams({ ...requestParams, order })
  }

  const setSortingOrderBy = (orderBy: orderBy) => {
    setRequestParams({ ...requestParams, orderBy })
  }

  return (
    <div className='list__wrapper'>
      <SettingsBar setSortingOrder={setSortingOrder} setSortingOrderBy={setSortingOrderBy} setListType={setListType} />
      <ul className={`list list--${listType}`}>
        {postsList.map((post: PostInterface) => listType === 'list'
          ? <ListElementHorizontal post={post} key={post.id} />
          : <ListElementGrid post={post} key={post.id} />)}
      </ul>
      <Pagination page={requestParams.page} setPage={setPage} />
    </div>
  )
}

export default List
