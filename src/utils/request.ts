import axios from 'axios'
import { ApiHOST } from '@/constants'

const request = (path: string, data?: any) => {
  const isAbsolutePath = /http/.test(path || '')
  const fullPath = isAbsolutePath ? path : `${ApiHOST}${path}`

  return new Promise((resolve, reject) => {
    axios
      .post(fullPath, data, {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json',
          withCredentials: false
        }
      })
      .then((response) => {
        if (response.data) {
          resolve(response?.data)
        } else {
          reject('No data in response')
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default request
