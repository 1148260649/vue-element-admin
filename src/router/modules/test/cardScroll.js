import Layout from '@/layout'

const cardSrcoll = {
  path: '/cardScroll',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/test/cardScroll'),
      name: 'KeyboardChart',
      meta: { title: '卡片滚动', noCache: true }
    }
  ]
}

export default cardSrcoll
