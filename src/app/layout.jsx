// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

// Component Imports
import AuthGuard from '@/components/AuthGuard'
import Providers from '@/components/Providers'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Nutrich.io',
  description: 'des'
}

const RootLayout = ({ children }) => {
  // Vars
  const direction = 'ltr'
  const systemMode = getSystemMode()

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <Providers direction={direction}>
          <AuthGuard>{children}</AuthGuard>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
