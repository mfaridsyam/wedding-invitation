<template>
  <section class="countdown">
    <div class="cd-inner">
      <p class="cd-label reveal">Menuju Hari Istimewa</p>
      <div class="cd-grid reveal reveal-delay-1">
        <div v-for="(item, i) in units" :key="i" class="cd-item">
          <span class="cd-num">{{ pad(values[item.key]) }}</span>
          <span class="cd-unit">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({ targetDate: String })

const units  = [
  { key: 'days',    label: 'Hari' },
  { key: 'hours',   label: 'Jam' },
  { key: 'minutes', label: 'Menit' },
  { key: 'seconds', label: 'Detik' },
]
const values = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
const pad = n => String(n).padStart(2, '0')
let timer

function tick() {
  const diff = new Date(props.targetDate) - Date.now()
  if (diff <= 0) return
  values.value.days    = Math.floor(diff / 86400000)
  values.value.hours   = Math.floor((diff % 86400000) / 3600000)
  values.value.minutes = Math.floor((diff % 3600000) / 60000)
  values.value.seconds = Math.floor((diff % 60000) / 1000)
}
onMounted(() => { tick(); timer = setInterval(tick, 1000) })
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.countdown {
  background: var(--ink-2);
  padding: 72px 24px;
}
.cd-inner { max-width: var(--max-w); margin: 0 auto; text-align: center; }

.cd-label {
  font-family: var(--font-display);
  font-style: italic; font-size: 16px;
  color: var(--gold-light); opacity: .7;
  margin-bottom: 40px; letter-spacing: .06em;
}

.cd-grid {
  display: flex; justify-content: center;
  gap: clamp(24px, 6vw, 56px);
}

.cd-item { text-align: center; }

.cd-num {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(48px, 10vw, 80px);
  font-weight: 400; line-height: 1;
  color: var(--ivory);
}

.cd-unit {
  display: block;
  font-size: 9px; letter-spacing: .28em;
  text-transform: uppercase; color: var(--gold);
  margin-top: 10px;
}
</style>
