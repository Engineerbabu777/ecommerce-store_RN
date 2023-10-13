import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
const UserType = createContext(null)

function UserContext ({ children }) {
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('@tokenAmazon')
      const decodedToken = jwt_decode(token)
      const userId = decodedToken.userId
      setUserId(userId)
    }

    fetchUser()
  }, [])

  return (
    <>
      <UserType.Provider value={{ userId, setUserId }}>
        {children}
      </UserType.Provider>
    </>
  )
}

export { UserType, UserContext }
