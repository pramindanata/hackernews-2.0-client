import { useState, useEffect, useCallback } from 'react'

interface WindowDimensions {
  width: null | number
  height: null | number
}

export default (): WindowDimensions => {
  const hasWindow = typeof window !== 'undefined'
  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : null
    const height = hasWindow ? window.innerHeight : null

    return { width, height }
  }, [hasWindow])

  const [dimensions, setDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize(): void {
      setDimensions(getWindowDimensions())
    }

    if (hasWindow) {
      window.addEventListener('resize', handleResize)

      return (): void => window.removeEventListener('resize', handleResize)
    }
  }, [hasWindow, getWindowDimensions])

  return dimensions
}
