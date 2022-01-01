import { useRef, useEffect, EffectCallback, DependencyList } from 'react';

//レンダリングが初回だった場合は実行されないEffect
export const useDidUpdateEffect = (fn: EffectCallback, deps: DependencyList) => {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
    } else {
      fn()
    }
  }, deps)
}