<template>
  <section class="countdown">
    <div class="cd-bg-ornament">
      <svg viewBox="0 0 400 400" fill="none" opacity=".035">
        <circle cx="200" cy="200" r="180" stroke="#B8965A" stroke-width=".8"/>
        <circle cx="200" cy="200" r="130" stroke="#B8965A" stroke-width=".5"/>
        <path d="M200 20 L200 380 M20 200 L380 200" stroke="#B8965A" stroke-width=".4"/>
        <path d="M73 73 L327 327 M327 73 L73 327" stroke="#B8965A" stroke-width=".3"/>
      </svg>
    </div>

    <div class="cd-inner">
      <div class="section-label reveal">
        <div class="label-line" /><span>Menuju Hari Istimewa</span><div class="label-line" />
      </div>

      <div class="cd-grid reveal reveal-delay-1">
        <div v-for="(item, i) in units" :key="i" class="cd-item">
          <div class="cd-num-wrap">
            <span class="cd-num">{{ pad(values[item.key]) }}</span>
          </div>
          <div class="cd-sep" v-if="i < units.length - 1">:</div>
          <span class="cd-unit">{{ item.label }}</span>
        </div>
      </div>

      <div class="cd-divider reveal reveal-delay-2">
        <div class="div-line" />
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          <path d="M12 2L22 12L12 22L2 12Z" stroke="#B8965A" stroke-width=".8" opacity=".5"/>
          <path d="M12 6L18 12L12 18L6 12Z" fill="#B8965A" opacity=".15"/>
        </svg>
        <div class="div-line" />
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
  background: linear-gradient(160deg, #1a1510 0%, #0e0c09 60%, #1a1510 100%);
  padding: 88px 24px;
  position: relative; overflow: hidden;
  text-align: center;
}

.cd-bg-ornament {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 480px; height: 480px;
  pointer-events: none;
}

.cd-inner {
  max-width: var(--max-w); margin: 0 auto;
  position: relative; z-index: 1;
}

.section-label {
  display: flex; align-items: center; gap: 14px;
  justify-content: center; margin-bottom: 52px;
}
.label-line {
  width: 40px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184,150,90,.4));
}
.label-line:last-child { background: linear-gradient(270deg, transparent, rgba(184,150,90,.4)); }
.section-label span {
  font-size: 9px; letter-spacing: .3em; text-transform: uppercase;
  color: rgba(184,150,90,.6); font-family: 'DM Sans', sans-serif; white-space: nowrap;
}

.cd-grid {
  display: flex; justify-content: center; align-items: flex-start;
  gap: 0;
}

.cd-item {
  display: flex; flex-direction: column; align-items: center;
  position: relative; padding: 0 clamp(12px, 4vw, 32px);
}
.cd-item:not(:last-child)::after {
  content: ':';
  position: absolute; right: -2px; top: 18px;
  font-family: 'Playfair Display', serif;
  font-size: clamp(28px, 7vw, 48px); font-style: italic;
  color: rgba(184,150,90,.25); line-height: 1;
}

.cd-num-wrap {
  position: relative;
  padding: 8px 0;
  margin-bottom: 14px;
}
.cd-num-wrap::before {
  content: '';
  position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 100%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184,150,90,.3), transparent);
}

.cd-num {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: clamp(44px, 11vw, 80px);
  font-weight: 400; line-height: 1;
  color: #f5f0e8;
  text-shadow: 0 0 60px rgba(184,150,90,.15);
  min-width: clamp(60px, 14vw, 100px);
  text-align: center;
}

.cd-unit {
  font-size: 9px; letter-spacing: .28em; text-transform: uppercase;
  color: rgba(184,150,90,.5); font-family: 'DM Sans', sans-serif;
}

.cd-divider {
  display: flex; align-items: center; gap: 12px;
  margin-top: 52px;
}
.div-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184,150,90,.15), transparent);
}
</style>