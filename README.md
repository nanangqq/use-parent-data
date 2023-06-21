## parent side

```typescript
import React, { useRef } from 'react'
import { useParentDataParent } from 'use-parent-data'

export const IframePage = () => {
  const iframe = useRef<HTMLIFrameElement>(null)

  const targetOriginChild = 'http://localhost:3000'
  type TData = { userId: string }

  useParentDataParent<TData>({
    data: { userId: '1' },
    iframeRef: iframe,
    targetOrigin: targetOriginChild, // default '*'
  })

  return (
    <iframe
      ref={iframe}
      src="http://localhost:3000/child-page"
      width="100%"
      height={window.innerHeight}
    />
  )
}
```

## child side

```typescript
import React from 'react'
import { useParentDataChild } from 'use-parent-data'

export const ChildPage = () => {
  const targetOriginParent = 'http://localhost:3001' // default '*'

  type TParentData = {
    userId: string
  }

  const { parentData } = useParentDataChild<TParentData>(targetOriginParent)

  useEffect(() => {
    console.log(parentData)
  }, [parentData])

  return <div>{`userId: ${parentData?.userId}`}</div>
}
```
