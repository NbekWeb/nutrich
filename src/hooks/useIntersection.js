import { useEffect, useRef, useState } from 'react'

const useIntersection = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const targetRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const isElementIntersecting = entry.isIntersecting

      setIsIntersecting(isElementIntersecting)

      if (isElementIntersecting && !hasIntersected) {
        setHasIntersected(true)
      }
    }, options)

    const currentTarget = targetRef.current

    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [options, hasIntersected])

  return [targetRef, isIntersecting, hasIntersected]
}

export default useIntersection
