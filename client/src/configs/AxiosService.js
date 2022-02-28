import axios from 'axios'

axios.interceptors.request.use(request => {
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const isLoggedIn = (user !== null)

  if (isLoggedIn) {
    request.headers.common.Authorization = `Bearer ${user.accessToken}`;
  }
  return request
})

export default axios