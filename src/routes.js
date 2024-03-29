import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Players = React.lazy(() => import('./views/pages/players/Players'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/players', name: 'Players', element: Players },

]

export default routes
