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

/**
 * 查询城市树
 */
export function queryCityTreeNodeOptionsList(param, pageParam) {
  return service_springboot001({
    url: '/cityInfoDb/queryDownCityTreeNodeOptionsList',
    method: 'post',
    data: {
      data: param,
      pageParam: pageParam
    }
  })
}

/**
 * 根据城市id查询城市信息
 */
export function queryCityByPId(param, pageParam) {
  return service_springboot001({
    url: '/cityInfoDb/queryCityByPId',
    method: 'post',
    data: {
      data: param,
      pageParam: pageParam
    }
  })
}

/**
 * 文件上传,成功返回json，异常返回错误文件
 * @param searchParam
 */
export function importFile(searchParam) {
  return service_springboot001({
    url: '/importAndResponse',
    method: 'post',
    responseType: 'blob',
    data: searchParam
  })
}

/**
 * 根据pdf模板创建文件
 */
export function createByTemplate() {
  return service_springboot001({
    url: '/pdfExport/createByTemplates',
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * 根据空的pdf模板文件创建内容
 */
export function createByEmptyTemplate() {
  return service_springboot001({
    url: '/pdfExport/createByEmptyTemplate',
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * 保存文件到服务器路径
 */
export function createPdfTableFileSaveLocal() {
  return service_springboot001({
    url: '/pdfExport/createPdfTableFileSaveLocal',
    method: 'get'
  })
}
