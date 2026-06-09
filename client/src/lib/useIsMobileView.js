import { useEffect, useState } from 'react'

const MOBILE_MEDIA_QUERY = '(max-width: 767px)'

function useIsMobileView() {
  const [isMobileView, setIsMobileView] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MEDIA_QUERY).matches : false
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY)
    const sync = () => setIsMobileView(mediaQuery.matches)

    sync()
    mediaQuery.addEventListener('change', sync)

    return () => mediaQuery.removeEventListener('change', sync)
  }, [])

  return isMobileView
}

export default useIsMobileView
