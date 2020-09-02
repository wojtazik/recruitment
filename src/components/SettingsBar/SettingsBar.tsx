import React from 'react'
import './SettingsBar.scss'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { listConfig } from '../../config/config'

interface PropsIterface {
  setSortingOrder: (order:string) => void
  setSortingOrderBy: (orderBy:string) => void
  setListType: any
}

const SettingsBar = ({ setSortingOrder, setSortingOrderBy, setListType }: PropsIterface) => {
  return (
    <div className='settings-bar'>
      <div className='settings-bar__option'>
        <Dropdown options={listConfig.ordering} onChange={(item) => { setSortingOrder(item.value) }} value={listConfig.ordering[0]} />
      </div>
      <div className='settings-bar__option'>
        <Dropdown options={listConfig.orderBy} onChange={(item) => { setSortingOrderBy(item.value) }} value={listConfig.orderBy[0]} />
      </div>
      <div className='settings-bar__option settings-bar__option--right'>
        <Dropdown options={listConfig.listType} onChange={(item) => { setListType(item.value) }} value={listConfig.listType[0]} />
      </div>
    </div>
  )
}

export default SettingsBar
