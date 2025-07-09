import Home from '@/components/home'

export const metadata = {
  title: 'Nutrich.io',
  description: 'des'
}

import { getServerMode } from '@core/utils/serverHelpers'

export default function Page() {
  return <Home />
}
