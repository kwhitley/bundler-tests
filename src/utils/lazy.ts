import React from 'react'

export const lazy = (componentImportFn:Function) => React.lazy(async () => {
  let obj = await componentImportFn()
  return typeof obj.default === 'function' ? obj : obj.default
})