import { useState, useEffect } from 'react'

/**
 * get data from parent
 * @param targetOrigin - target origin, default '*'
 * @returns data from parent
 * @param T_parentData - type of data from parent, default any
 */
export const useParentDataChild = <T_parentData = any>(
  targetOrigin: string = '*'
): {
  parentData: T_parentData
} => {
  const [parentData, setParentData] = useState<T_parentData>({} as any)

  useEffect(() => {
    const parent = window.parent
    if (!parent) {
      return () => {}
    }

    parent.postMessage('child-ready', targetOrigin)

    const handleParentData = (event: MessageEvent) => {
      setParentData(event.data)
    }

    window.addEventListener('message', handleParentData)

    return () => {
      window.removeEventListener('message', handleParentData)
    }
  }, [])

  return { parentData }
}

/**
 * send data to child when child is ready
 * @param data - data sending to child
 * @param iframeRef - iframe ref
 * @param targetOrigin - target origin, default '*'
 * @param T_data - type of data sending to child, default any
 */
export const useParentDataParent = <T_data = any>({
  data,
  iframeRef,
  targetOrigin = '*',
}: {
  data: T_data
  iframeRef: React.RefObject<HTMLIFrameElement>
  targetOrigin?: string
}): void => {
  useEffect(() => {
    const childReadyMessageHandler = (event: MessageEvent) => {
      if (event.data === 'child-ready') {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage(data, targetOrigin)
        }
        window.removeEventListener('message', childReadyMessageHandler)
      }
    }

    window.addEventListener('message', childReadyMessageHandler)

    return () => {
      window.removeEventListener('message', childReadyMessageHandler)
    }
  }, [data, iframeRef, targetOrigin])
}
