import { useAuth } from "../../context/AuthContext"

function Profile() {
    const { user } = useAuth()
  return (
    <div>
        Hi {user?.name || user?.login}!
    </div>
  )
}

export default Profile