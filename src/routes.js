import React from 'react'
import Orders from './views/orders/Orders'
import OrderPlayers from './views/players/OrdersPlayers'

const Started = React.lazy(() => import('./views/dashboard/Started'))
const NotStarted = React.lazy(() => import('./views/dashboard/Notstarted'))
const Completed = React.lazy(() => import('./views/dashboard/Completed'))
const Players = React.lazy(() => import('./views/players/Players'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard/started', name: 'Started', element: Started },
  { path: '/dashboard/notstarted', name: 'Not Started', element: NotStarted },
  { path: '/dashboard/completed', name: 'Completed', element: Completed },
  { path: '/players/:matchkey', name: 'Players', element: Players },
  { path: '/order/players/:matchOrderId', name: 'OrderPlayers', element: OrderPlayers },
  { path: '/orders', name: 'Orders', element: Orders },


]

export default routes
