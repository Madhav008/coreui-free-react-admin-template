import React from 'react'
import OrderUsers from './views/players/OrdersUsers'

const Started = React.lazy(() => import('./views/dashboard/Started'))
const NotStarted = React.lazy(() => import('./views/dashboard/Notstarted'))
const Completed = React.lazy(() => import('./views/dashboard/Completed'))
const Players = React.lazy(() => import('./views/players/Players'))
const Orders = React.lazy(() => import('./views/orders/Orders'))
const OrderPlayers = React.lazy(() => import('./views/players/OrdersPlayers'))
const UserOrders = React.lazy(() => import('./views/orders/UserOrders'))




const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard/started', name: 'Started', element: Started },
  { path: '/dashboard/notstarted', name: 'Not Started', element: NotStarted },
  { path: '/dashboard/completed', name: 'Completed', element: Completed },
  { path: '/players/:matchkey', name: 'Players', element: Players },
  { path: '/order/players/:matchOrderId', name: 'OrderPlayers', element: OrderPlayers },
  { path: '/order/users/:matchOrderId', name: 'OrderPlayers', element: OrderUsers },

  { path: '/orders', name: 'Orders', element: Orders },
  { path: '/user', name: 'User', element: UserOrders },



]

export default routes
