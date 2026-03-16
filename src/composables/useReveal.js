import { onMounted, onUnmounted } from 'vue'

export function useReveal() {
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
  })

  onUnmounted(() => observer?.disconnect())

  function rescan() {
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer?.observe(el))
    }, 100)
  }

  return { rescan }
}
