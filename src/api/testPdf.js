import service_springboot001 from '@/utils/request_springboot001'

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

