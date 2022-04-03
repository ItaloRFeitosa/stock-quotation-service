const defaultGetTime = () => Date.now()

const MemoryCache = (getTime = defaultGetTime) => {
  const store = new Map()
  return {
    set: (key, data, options) => {
      const now = getTime()
      const meta = {
        createdAt: now,
        expiresAt: !!options?.ttl && now + options.ttl //milliseconds
      }
      store.set(key, { data, meta })
    },
    get: (key) => {
      const record = store.get(key)

      if(!record) return null

      const { meta, data} = record

      if(!!meta.expiresAt && meta.expiresAt < getTime()){
        store.delete(key)
        return null
      }

      return data
    }
  }
}

module.exports = { MemoryCache }
