class UUID {
  createUUID() {
    const dg = new Date(1582, 10, 15, 0, 0, 0, 0)
    const dc = new Date()
    const t = dc.getTime() - dg.getTime()
    const tl = this.getIntegerBits(t, 0, 31)
    const tm = this.getIntegerBits(t, 32, 47)
    const thv = `${this.getIntegerBits(t, 48, 59)}1` // version 1, security version is 2
    const csar = this.getIntegerBits(this.rand(4095), 0, 7)
    const csl = this.getIntegerBits(this.rand(4095), 0, 7)
    const n =
      this.getIntegerBits(this.rand(8191), 0, 7) +
      this.getIntegerBits(this.rand(8191), 8, 15) +
      this.getIntegerBits(this.rand(8191), 0, 7) +
      this.getIntegerBits(this.rand(8191), 8, 15) +
      this.getIntegerBits(this.rand(8191), 0, 15) // this last number is two octets long
    return tl + tm + thv + csar + csl + n
  }

  getIntegerBits(val, start, end) {
    const base16 = this.returnBase(val, 16)
    const quadArray = []
    let quadString = ''
    let i = 0
    for (i = 0; i < base16.length; i++) {
      quadArray.push(base16.substring(i, i + 1))
    }
    for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
      if (!quadArray[i] || quadArray[i] === '') quadString += '0'
      else quadString += quadArray[i]
    }
    return quadString
  }

  returnBase(number, base) {
    return number.toString(base).toUpperCase()
  }

  rand(max) {
    return Math.floor(Math.random() * (max + 1))
  }
}
export default new UUID()
