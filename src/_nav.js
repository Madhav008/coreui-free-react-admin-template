import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCursor, cilFindInPage, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Matches',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Not Started',
        to: '/dashboard/notstarted',
        badge: {
          color: 'info',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'Started',
        to: '/dashboard/started',
        badge: {
          color: 'danger',
          text: 'Live',
        },
      },
      {
        component: CNavItem,
        name: 'Completed',
        to: '/dashboard/completed',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Orders',
    to: '/orders',
    icon: <CIcon icon={cilFindInPage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Match Orders',
        to: '/orders',
      },
      {
        component: CNavItem,
        name: 'User Orders',
        to: '/user',
      },
    ],
  },


]

export default _nav
