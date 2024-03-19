'use client'

import { createContext, Dispatch, useContext, useReducer } from 'react'

import PropTypes from 'prop-types'

interface Modal {
  server: boolean
  invite: boolean
}
type ModalDispatch = { type: 'SET', payload: Modal }
type ModalReducer = [Modal, Dispatch<ModalDispatch>]

const modalReducer = (state: Modal, action: ModalDispatch): Modal => {
  switch (action.type) {
  case 'SET':
    return action.payload
  default:
    return state
  }
}

const initialValue = {
  server: false,
  invite: false,
}

const ModalContext = createContext<ModalReducer>([initialValue, () => initialValue])

export const ModalContextProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [modal, modalDispatch] = useReducer(modalReducer, initialValue)
  return (
    <ModalContext.Provider value={[modal, modalDispatch]}>
      {children}
    </ModalContext.Provider>
  )
}

ModalContextProvider.propTypes = {
  children: PropTypes.node,
}

export const useModal = () => {
  const [value] = useContext(ModalContext)
  return value
}

export const useOpenInvite = () => {
  const [state, dispatch] = useContext(ModalContext)
  return () => {
    dispatch({
      type: 'SET',
      payload: {
        ...state,
        invite: true,
      },
    })
  }
}

export const useCloseInvite = () => {
  const [state, dispatch] = useContext(ModalContext)
  return () => {
    dispatch({
      type: 'SET',
      payload: {
        ...state,
        invite: false,
      },
    })
  }
}

export default ModalContext
