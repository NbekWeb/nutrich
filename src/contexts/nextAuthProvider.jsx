'use client'

// Third-party Imports
// eslint-disable-next-line import/no-unresolved
import { SessionProvider } from 'next-auth/react'

export const NextAuthProvider = ({ children, ...rest }) => {
  return <SessionProvider {...rest}>{children}</SessionProvider>
}
