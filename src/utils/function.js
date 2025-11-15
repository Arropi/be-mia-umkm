function bigintToNumber(obj) {
  if (typeof obj === 'bigint') {
    return Number(obj)
  }

  if(obj instanceof Date) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(bigintToNumber)
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, bigintToNumber(value)])
    )
  }

  return obj
}

module.exports = { bigintToNumber }