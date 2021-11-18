import { createApp } from 'vue'
import { addClass, removeClass } from 'utils/dom'

export default function createDirective(comp, name) {
  if (!comp) {
    throw new Error('请传入组件')
  }
  if (!name && !comp.name) {
    throw new Error('请定义组件名')
  }
  let compName = name || comp.name
  const rootPositionClass = 'v-relative'

  function append(el, instance) {
    let position = window.getComputedStyle(el, null).position
    if (['absolute', 'fixed', 'relative'].indexOf(position) === -1) {
      addClass(el, rootPositionClass)
    }
    el.appendChild(instance.$el)
  }

  function remove(el, instance) {
    removeClass(el, rootPositionClass)
    el.removeChild(instance.$el)
  }

  return {
    mounted(el, binding) {
      const app = createApp(comp)
      const instance = app.mount(document.createElement('div'))
      el[compName] = instance

      if (binding.arg) {
        instance.setOptions(binding.arg)
      }
      if (binding.value) {
        append(el, instance)
      }
    },
    updated(el, binding) {
      const instance = el[compName]
      if (binding.arg) {
        instance.setOptions(binding.arg)
      }
      if (binding.value !== binding.oldValue) {
        if (binding.value) {
          append(el, instance)
        } else {
          remove(el, instance)
        }
      }
    }
  }
}
