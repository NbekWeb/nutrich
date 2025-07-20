// Component Imports
import Login from '@views/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Login using Google',
  description: 'Login to your account using Google'
}

const LoginPage = () => {
  // Vars
  const mode = getServerMode()

  return <Login mode={mode} loading={true} />
}

export default LoginPage
