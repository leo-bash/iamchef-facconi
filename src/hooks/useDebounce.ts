import { useEffect, useState } from "react"

/**
 * 
 * @param value - Il valore da "debounciare"
 * @param delay - Millisecondi di attesa prima di aggiornare il valore
 * @returns Il valore debounced, aggiornato solo dopo il delay
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  
  return debouncedValue
}
