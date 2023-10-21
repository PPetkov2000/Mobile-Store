const CACHE = new Map()

const get = (key) => {
  return CACHE.get(key) || null
}

const set = (key, data) => {
  if (!CACHE.has(key)) {
    CACHE.set(key, data)
  }
}

const update = (key, data) => {
  CACHE.set(key, data)
}

const remove = (key) => {
  if (CACHE.has(key)) {
    CACHE.delete(key)
  }
}

const getEntries = () => {
  return [...CACHE.entries()] || []
}

const getKeys = () => {
  return [...CACHE.keys()] || []
}

const getValues = () => {
  return [...CACHE.values()] || []
}

const clear = () => {
  CACHE.clear()
}

export default { get, set, update, remove, getEntries, getKeys, getValues, clear }
