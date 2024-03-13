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
      path: 'alertMessage',
      component: () => import('@/views/test/alertMessage'),
      name: 'alertMessage',
      isAnon: true,
      meta: { title: '消息框', noCache: true }
    },
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
      path: 'cascader',
      component: () => import('@/views/test/cascader'),
      name: 'cascader',
      isAnon: true,
      meta: { title: '级联表格', noCache: true }
    },
    {
      path: 'checkbox',
      component: () => import('@/views/test/checkbox'),
      name: 'checkbox',
      isAnon: true,
      meta: { title: '复选框', noCache: true }
    },
    {
      path: 'pdfView',
      component: () => import('@/views/test/pdfVIew'),
      name: 'pdfView',
      isAnon: true,
      meta: { title: 'pdf在线预览', noCache: true }
    },
    {
      path: 'phantomInput',
      component: () => import('@/views/test/phantomInput'),
      name: 'phantomInput',
      isAnon: true,
      meta: { title: 'Input幽灵建议', noCache: true }
    },
    {
      path: 'uploadFile',
      component: () => import('@/views/test/uploadFile'),
      name: 'uploadFile',
      isAnon: true,
      meta: { title: '上传文件', noCache: true }
    },
    {
      path: 'exportPdf',
      component: () => import('@/views/test/exportPdf'),
      name: 'exportPdf',
      isAnon: true,
      meta: { title: '导出pdf文件', noCache: true }
    }
  ]
}

export default myTest
