import React from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = React.createContext()

export default function AuthProvider({ children }) {

  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem('user'))
    ||
    {}
  )

  const navigate = useNavigate()
  React.useEffect(() => {
    if (user?._id) {
      navigate('/')
      return
    }

    navigate('/login')

  }, [user, navigate])

  return (
    <AuthContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
