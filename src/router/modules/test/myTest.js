import Layout from '@/layout'

const myTest = {
  path: '/cardScroll',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  isMenu: true,
  alwaysShow: true,
  meta: {
    title: '我的测试',
    icon: 'list'
  },
  children: [
    {
      path: 'cardScroll',
      component: () => import('@/views/test/cardScroll'),
      name: 'cardScroll',
      isAnon: true,
      meta: { title: '卡片滚动', noCache: true }
    },
    {
      path: 'commonTable',
      component: () => import('@/views/test/Commonable'),
      name: 'commonTable',
      isAnon: true,
      meta: { title: '公共表格', noCache: true }
    },
    {
      path: 'pdfView',
      component: () => import('@/views/test/pdfVIew'),
      name: 'pdfView',
      isAnon: true,
      meta: { title: 'pdf在线预览', noCache: true }
    }
  ]
}

export default myTest
