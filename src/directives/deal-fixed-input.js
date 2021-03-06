const isIOS = function () {
  return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
}

export default {
  mounted(el) {
    const input = el.nodeName === 'INPUT' ? el : el.querySelector('input')
    if (input.nodeName !== 'INPUT' || !isIOS()) return
    function dealFixedInput() {
      const body = document.querySelector('body')
      'scrollTop' in body ? (body.scrollTop = 0) : body.scrollTo(body.scrollX, 0)
    }
    el._input_ = input
    el._dealFixedInput_ = dealFixedInput
    input.addEventListener('blur', dealFixedInput)
  },
  unmounted(el) {
    delete el._dealFixedInput_
    delete el._input_
  }
}
