import { Auth } from '@renderer/App'
import { useContext } from 'react'
export default function useAuth() {
return useContext(Auth)
}
