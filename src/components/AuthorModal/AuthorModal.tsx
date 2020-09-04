import React, { useEffect, useState } from 'react'
import './AuthorModal.scss'
import makeApiRequest from '../../utils/makeApiRequest'
import { useCookies } from 'react-cookie'
import { AuthorInterface } from '../../model/AuthorInterface'
import { useTranslation } from 'react-i18next'
import { setError } from '../../store/actions/errorActions'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

interface PropsInterface {
  authorId: number
  setShowAuthorModal: any;
}

const AuthorModal = ({ authorId, setShowAuthorModal }: PropsInterface) => {
  const [author, setAuthor] = useState<AuthorInterface>(null)
  const [avatarLoaded, setAvatarLoaded] = useState(false)
  const [cookies] = useCookies()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    (async () => {
      const response = await makeApiRequest(`author/${authorId}`, 'GET', true, cookies.auth)
      if (response.status === 200) {
        setAuthor(response.response)
      } else {
        setShowAuthorModal(false)
        dispatch(setError({ errorCode: response.status, errorMessage: response.response }))
        history.push('/error')
      }
    })()
  }, [])

  return (
    <div className='author__wrapper'>
      <div className='author__overlay' onClick={() => setShowAuthorModal(false)} />
      <div className='author__modal'>
        {author ? (
          <>
            <div className='author__data'>
              <h3 className='author__name'>{author.name}</h3>
              <img
                src={author.avatar}
                alt={`Author ${author.name} avatar`}
                className={`author__avatar ${avatarLoaded ? 'author__avatar--loaded' : ''}`}
                onLoad={() => setAvatarLoaded(true)}
              />
            </div>
            <div className='author__description'>
              {author.description}
            </div>
            <div className='author__close' onClick={() => setShowAuthorModal(false)}>{t('author.close')}</div>
          </>
        ) : (
          <div className='author__loading'>{t('author.loading')}</div>
        )}
      </div>
    </div>
  )
}

export default AuthorModal
