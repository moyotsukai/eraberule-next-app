import { useDidUpdateEffect } from './useDidUpdateEffect';
import { useRef, EffectCallback, DependencyList } from 'react';

//一度しか実行されないことを保証するEffect + 初回は実行されないEffect
export const useStrictEffect = (fn: EffectCallback, deps: DependencyList) => {
  const didEffectRunRef = useRef(false)

  useDidUpdateEffect(() => {
    if (didEffectRunRef.current === false) {
      didEffectRunRef.current = true

      fn()
    }
  }, deps)
}