// Component Imports
import Info from '@views/Info'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Personal Information '
}

const InfoPage = () => {
  // Vars
  const mode = getServerMode()

  return <Info mode={mode} />
}

export default InfoPage
