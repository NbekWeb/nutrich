// Component Imports
import Register from '@views/Register'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Register'
}

const LoginPage = () => {
  // Vars
  const mode = getServerMode()

  return <Register mode={mode} />
}

export default LoginPage
