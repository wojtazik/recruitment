import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import makeApiRequest from '../../utils/makeApiRequest'
import { useCookies } from 'react-cookie'
import { PostInterface } from '../../model/PostInterface'
import './Article.scss'
import { useTranslation } from 'react-i18next'
import AuthorModal from '../../components/AuthorModal/AuthorModal'
import PortalModal from '../../components/PortalModal/PortalModal'
import CommentsModal from '../../components/CommentsModal/CommentsModal'

const Article = () => {
  const [post, setPost] = useState<PostInterface>(null)
  const [showAuthorModal, setShowAuthorModal] = useState(false)
  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [pageVisitedDate] = useState(Date.now())
  const { id } = useParams()
  const [cookies] = useCookies()
  const { t } = useTranslation()

  useEffect(() => {
    (async () => {
      const apiResponse = await makeApiRequest(
        `posts/${id}`,
        'GET',
        true,
        cookies.auth
      )
      setPost(apiResponse.response)
    })()

    return async () => {
      const exitDate = Date.now()

      const resp = await makeApiRequest(
        `time/${id}`,
        'PUT',
        true,
        cookies.auth,
        { time: exitDate - pageVisitedDate }
      )
    }
  }, [])

  return post ? (
    <div className='article'>
      <h1 className='article__title'>
        {post.title}
      </h1>
      <img src={post.thumbnail} alt={`Post ${post.title} Thumbnail`} className='article__image' />
      <div className='article__date-and-author-info'>
        <p className='article__date'>{post.date}</p>
        <button className='article__action-button' onClick={() => setShowAuthorModal(true)}>I</button>
      </div>
      <p className='article__content'>
        {post.content}
      </p>
      <button className='article__comment-btn' onClick={() => setShowCommentsModal(true)}>
        {t('post.comment')}
      </button>
      {showAuthorModal && (
        <PortalModal>
          <AuthorModal authorId={parseInt(post.authorId)} setShowAuthorModal={setShowAuthorModal} />
        </PortalModal>
      )}
      {showCommentsModal && (
        <PortalModal>
          <CommentsModal postId={parseInt(post.id)} setShowCommentsModal={setShowCommentsModal} />
        </PortalModal>
      )}
    </div>
  ) : (
    <div>Loading</div>
  )
}

export default Article
