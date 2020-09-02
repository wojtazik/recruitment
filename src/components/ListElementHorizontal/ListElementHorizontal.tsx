import React, { useState } from 'react'
import './ListElementHorizontal.scss'
import { PostInterface } from '../../model/PostInterface'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { useTranslation } from 'react-i18next'
import PortalModal from '../PortalModal/PortalModal'
import AuthorModal from '../AuthorModal/AuthorModal'

interface PropsInterface {
  post: PostInterface
}

const ListElementHorizontal = ({ post }: PropsInterface) => {
  const { t } = useTranslation()
  const [showExcerpt, setShowExcerpt] = useState(false)
  const [showAuthorModal, setShowAuthorModal] = useState(false)
  return (
    <div className='list-item-horizontal'>
      <div className='list-item-horizontal__data-wrapper'>
        <img src={post.thumbnail} alt={`${post.title} thumbnail`} className='list-item-horizontal__thumbnail' />
        <div className='list-item-horizontal__title-and-date'>
          <p className='list-item-horizontal__date'>{post.date}</p>
          <Link className='list-item-horizontal__link-title' to={`post/${post.id}`}>
            {post.title}
          </Link>
        </div>
        <div className='list-item-horizontal__buttons-wrapper'>
          <button className='list-item-horizontal__action-button' onClick={() => setShowExcerpt(!showExcerpt)}>E</button>
          <button className='list-item-horizontal__action-button' onClick={() => setShowAuthorModal(true)}>I</button>
          {
            showAuthorModal && (
              <PortalModal>
                <AuthorModal authorId={parseInt(post.authorId)} setShowAuthorModal={setShowAuthorModal} />
              </PortalModal>
            )
          }
        </div>
      </div>
      <CSSTransition
        in={showExcerpt}
        timeout={900}
        classNames='list-item-horizontal__excerpt-wrapper-'
        unmountOnExit
        mountOnEnter
      >
        <div className='list-item-horizontal__excerpt-wrapper'>
          <div className='list-item-horizontal__excerpt-content'>
            {post.excerpt}
            <button
              className='list-item-horizontal__action-button list-item-horizontal__action-button--hide'
              onClick={() => setShowExcerpt(false)}
            >{t('post.hide')}
            </button>
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default ListElementHorizontal
