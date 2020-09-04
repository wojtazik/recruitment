import React, { useState } from 'react'
import './CommentsModal.scss'
import makeApiRequest from '../../utils/makeApiRequest'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { CommentInterface } from '../../model/CommentInterface'
import { setError } from '../../store/actions/errorActions'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

interface PropsInterface {
  postId: number
  setShowCommentsModal: any;
}

const initialValues = {
  name: '',
  comment: '',
  permission: false
}

const CommentsModal = ({ postId, setShowCommentsModal }: PropsInterface) => {
  const [cookies] = useCookies()
  const { t } = useTranslation()
  const [formSentSuccessfully, setFormSentSuccessfully] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const sendComment = (data: CommentInterface) => {
    (async () => {
      const response = await makeApiRequest('comments', 'POST', true, cookies.auth, data)
      if (response.status === 200) {
        setFormSentSuccessfully(true)
      } else {
        setShowCommentsModal(false)
        dispatch(setError({ errorCode: response.status, errorMessage: response.response }))
        history.push('/error')
      }
    })()
  }

  return (
    <div className='comments-modal__wrapper'>
      <div className='comments-modal__overlay' onClick={() => setShowCommentsModal(false)} />
      <div className='comments-modal__modal'>
        <h4 className='comments-modal__title'>{t('comment.add-comment')}</h4>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            sendComment({ name: values.name, comment: values.comment, id: postId })
          }}
          validationSchema={() => Yup.object().shape({
            name: Yup.string().required(),
            comment: Yup.string().required(),
            permission: Yup.boolean().required().oneOf([true])
          })}
        >
          <Form className='comments-modal__form'>
            <Field
              type='text'
              name='name'
              placeholder={t('comment.author')}
              className='comments-modal__input'
            />
            <Field
              component='textarea'
              name='comment'
              className='comments-modal__textarea'
              placeholder={t('comment.content')}
              rows={10}
            />
            <div className='comments-modal__permission'>
              <Field
                type='checkbox'
                name='permission'
                id='comment-permission'
                className='comments-modal__permission-input'
              />
              <label htmlFor='comment-permission'>{t('comment.agree-permission')}</label>
            </div>
            <button type='submit' className='comments-modal__submit'>{t('comment.submit')}</button>
            {formSentSuccessfully && <p className='comments-modal__sent'>{t('comment.success')}</p>}
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default CommentsModal
