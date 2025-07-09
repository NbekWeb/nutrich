// Component Imports
import BlankLayout from '@layouts/BlankLayout'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

const Layout = ({ children }) => {
  // Vars
  const direction = 'ltr'
  const systemMode = getSystemMode()

  return <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
}

export default Layout
