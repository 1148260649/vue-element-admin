import service_springboot001 from '@/utils/request_springboot001'

/**
 * 获取表头配置
 */
export function configListAjax(param) {
  return service_springboot001({
    url: '/tableConfig/configList',
    method: 'post',
    data: {
      data: param
    }
  })
}

/**
 * 获取表格数据
 */
export function queryTableListAjax(param, pageParam) {
  return service_springboot001({
    url: '/tableConfig/queryTableList',
    method: 'post',
    data: {
      data: param,
      pageParam: pageParam
    }
  })
}

/**
 * 获取 pdf 文件流数据
 */
export function pdfBytes() {
  // responseType: 'blob',
  // pdfReturnBase64 pdfFileReturnBytes
  return service_springboot001({
    url: '/verify/pdfFileReturnBytes',
    method: 'post',
    responseType: 'blob',
    data: {
      fileName: 'MyBatis 3 User Guide Simplified Chinese.pdf'
    }
  })
}

/**
 * 获取 pdf base64编码数据
 */
export function pdfBase64() {
  // responseType: 'blob',
  // pdfReturnBase64 pdfFileReturnBytes
  return service_springboot001({
    url: '/verify/pdfReturnBase64',
    method: 'post',
    data: {
      fileName: 'MyBatis 3 User Guide Simplified Chinese.pdf'
    }
  })
}

