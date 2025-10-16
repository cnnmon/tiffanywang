const STORAGE_KEYS = {
  MONEY: 'shop_money',
  PURCHASED_IDS: 'shop_purchased_ids',
}

export const storageUtils = {
  getMoney: () => {
    const stored = localStorage.getItem(STORAGE_KEYS.MONEY)
    return stored ? parseInt(stored) : 500
  },

  setMoney: (amount) => {
    localStorage.setItem(STORAGE_KEYS.MONEY, amount.toString())
  },

  getPurchasedIds: () => {
    const stored = localStorage.getItem(STORAGE_KEYS.PURCHASED_IDS)
    return stored ? JSON.parse(stored) : []
  },

  setPurchasedIds: (ids) => {
    localStorage.setItem(STORAGE_KEYS.PURCHASED_IDS, JSON.stringify(ids))
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEYS.MONEY)
    localStorage.removeItem(STORAGE_KEYS.PURCHASED_IDS)
  },
}

// Seeded random number generator
class SeededRandom {
  constructor(seed) {
    this.seed = seed
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }
}

export const getDateHourSeed = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  const hour = now.getHours()
  return year * 1000000 + month * 10000 + day * 100 + hour
}

export const shuffleWithSeed = (array, seed) => {
  const rng = new SeededRandom(seed)
  const shuffled = [...array]
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

