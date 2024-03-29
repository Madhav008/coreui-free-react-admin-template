import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilFindInPage, cilSpeedometer } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Matches',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  }, {
    component: CNavItem,
    name: 'Orders',
    to: '/dashboard',
    icon: <CIcon icon={cilFindInPage} customClassName="nav-icon" />,
    badge: {
      color: 'warning',
      text: 'Latest',
    },
  },

]

export default _nav
