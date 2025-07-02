import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
})

export const api = ({ url, open = false, ...props }) => {
  let token = localStorage.getItem('access_token') ? `${localStorage.getItem('access_token')}` : null

  if (token) token = `Bearer ${token}`

  if (!open) {
    props.headers = {
      ...props.headers,
      Authorization: props.headers && props.headers.Authorization ? props.headers.Authorization : token
    }
  }

  return instance({
    url: url,
    ...props
  })
}

function createAxiosResponseInterceptor() {
  const interceptor = instance.interceptors.response.use(
    response => response,
    error => {
      if (error.status == 401) {
        const access_token = localStorage.getItem('access_token')

        if (access_token) {
          Clear()
        } else {
          window.location.href = '/login'
        }
      }

      axios.interceptors.response.eject(interceptor)

      return Promise.reject(error)
    }
  )
}

function Clear() {
  localStorage.removeItem('access_token')
  window.location.href = '/login'

  return null
}

createAxiosResponseInterceptor()
