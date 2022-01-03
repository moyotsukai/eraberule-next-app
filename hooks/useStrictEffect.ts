import { useRef, EffectCallback, DependencyList, useEffect } from 'react';

//一度しか実行されないことを保証するEffect
export const useStrictEffect = (fn: EffectCallback, deps: DependencyList) => {
  const didEffectRunRef = useRef(false)

  useEffect(() => {
    if (didEffectRunRef.current === false) {
      didEffectRunRef.current = true

      fn()
    }
  }, deps)
}