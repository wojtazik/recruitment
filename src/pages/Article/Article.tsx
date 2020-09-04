import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import makeApiRequest from '../../utils/makeApiRequest'
import { useCookies } from 'react-cookie'
import { PostInterface } from '../../model/PostInterface'
import './Article.scss'
import { useTranslation } from 'react-i18next'
import AuthorModal from '../../components/AuthorModal/AuthorModal'
import PortalModal from '../../components/PortalModal/PortalModal'
import CommentsModal from '../../components/CommentsModal/CommentsModal'
import { useDispatch } from 'react-redux'
import { setError } from '../../store/actions/errorActions'

const Article = () => {
  const [post, setPost] = useState<PostInterface>(null)
  const [showAuthorModal, setShowAuthorModal] = useState(false)
  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [pageVisitedDate] = useState(Date.now())
  const { id } = useParams()
  const [cookies] = useCookies()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    (async () => {
      const apiResponse = await makeApiRequest(
        `posts/${id}`,
        'GET',
        true,
        cookies.auth
      )
      if (apiResponse.status === 200) {
        setPost(apiResponse.response)
      } else {
        dispatch(setError({ errorCode: apiResponse.status, errorMessage: apiResponse.response }))
        history.push('/error')
      }
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
      if (resp.status !== 200) {
        dispatch(setError({ errorCode: resp.status, errorMessage: 'Something goes wrong' }))
        history.push('/error')
      }
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
