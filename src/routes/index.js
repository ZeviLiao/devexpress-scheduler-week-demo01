import PaymentBack from '../pages/paymentBack'
import Calendar from '../pages/calendar'

const routes = [
  {
    path: '/',
    component: Calendar,
    exact: true,
    breadcrumbName: 'Calendar',
  },
  {
    path: '/paymentBack',
    component: PaymentBack,
    breadcrumbName: 'PaymentBack',
  },
]

export default routes
