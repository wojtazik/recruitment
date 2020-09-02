import React from 'react'
import './ListElementGrid.scss'
import { PostInterface } from '../../model/PostInterface'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface PropsInterface {
  post: PostInterface
}

const ListElementGrid = ({ post }: PropsInterface) => {
  const { t } = useTranslation()

  return (
    <div className='list-item-grid'>
      <div className='list-item-grid__inner'>
        <div className='list-item-grid__front'>
          <Link className='list-item-grid__link-wrapper' to={`post/${post.id}`}>
            <h3 className='list-item-grid__title'>{post.title}</h3>
            <img className='list-item-grid__thumbnail' src={post.thumbnail} alt={`${post.title} thumbnail`} />
          </Link>
        </div>
        <div className='list-item-grid__back'>
          <p>{post.excerpt}</p>
          <Link className='list-item-grid__read-more' to={`post/${post.id}`}>{t('list.see-post')}</Link>
        </div>
      </div>
    </div>
  )
}

export default ListElementGrid
