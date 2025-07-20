/**
 * Extracts the authorization code from a Google OAuth callback URL
 * @param {string} callbackUrl - The full callback URL from Google OAuth
 * @returns {string|null} - The authorization code or null if not found
 */
export const extractAuthCode = callbackUrl => {
  try {
    const url = new URL(callbackUrl)

    return url.searchParams.get('code')
  } catch (error) {
    console.error('Error parsing callback URL:', error)

    return null
  }
}
