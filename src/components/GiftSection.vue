<template>
  <section class="gift">
    <div class="gift-inner">
      <span class="eyebrow reveal">Wedding Gift</span>
      <h2 class="display-title reveal reveal-delay-1">Hadiah <em>Pernikahan</em></h2>
      <p class="gift-desc reveal reveal-delay-2">
        Doa dan kehadiran kalian adalah hadiah terbesar untuk kami. Namun jika ingin
        memberikan hadiah, berikut informasi rekening kami.
      </p>

      <div class="cards-wrap">
        <div
          v-for="(gift, i) in gifts"
          :key="i"
          class="atm-card reveal"
          :class="`reveal-delay-${i + 2}`"
          :style="cardStyle(gift)"
        >
          <div class="card-noise" />

          <div class="card-top">
            <div class="card-chip">
              <div class="chip-line h" /><div class="chip-line h" />
              <div class="chip-line v" /><div class="chip-line v" />
            </div>
            <div class="card-logo">
              <svg v-if="gift.bank === 'BRI'" viewBox="0 0 48 20" fill="none" class="bank-svg">
                <rect x="0" y="0" width="48" height="20" rx="3" fill="rgba(255,255,255,.15)"/>
                <text x="24" y="14" text-anchor="middle" font-size="9" font-weight="700" fill="white" font-family="Arial,sans-serif" letter-spacing="1">BRI</text>
              </svg>
              <svg v-else-if="gift.bank === 'DANA'" viewBox="0 0 60 20" fill="none" class="bank-svg">
                <rect x="0" y="0" width="60" height="20" rx="10" fill="rgba(255,255,255,.18)"/>
                <text x="30" y="14" text-anchor="middle" font-size="9" font-weight="700" fill="white" font-family="Arial,sans-serif" letter-spacing="1">DANA</text>
              </svg>
              <svg v-else viewBox="0 0 60 20" fill="none" class="bank-svg">
                <rect x="0" y="0" width="60" height="20" rx="3" fill="rgba(255,255,255,.15)"/>
                <text x="30" y="14" text-anchor="middle" font-size="9" font-weight="700" fill="white" font-family="Arial,sans-serif">{{ gift.bank }}</text>
              </svg>
            </div>
          </div>

          <div class="card-number">
            <span
              v-for="(group, gi) in formatNumber(gift.number)"
              :key="gi"
              class="num-group"
            >{{ group }}</span>
          </div>

          <div class="card-bottom">
            <div>
              <p class="card-label">Atas Nama</p>
              <p class="card-holder">{{ gift.holder }}</p>
            </div>
            <div class="card-type-badge">
              {{ gift.type === 'ewallet' ? 'e-Wallet' : 'Tabungan' }}
            </div>
          </div>

          <div class="card-shimmer" />
        </div>
      </div>

      <div class="copy-list">
        <div
          v-for="(gift, i) in gifts"
          :key="i"
          class="copy-row reveal"
          :class="`reveal-delay-${i + 2}`"
        >
          <div class="copy-info">
            <span class="copy-bank">{{ gift.bank }}</span>
            <span class="copy-num">{{ gift.number }}</span>
          </div>
          <button
            class="copy-btn"
            :class="{ copied: copiedIdx === i }"
            @click="copy(gift.number, i)"
          >
            <svg v-if="copiedIdx !== i" width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1"/>
              <path d="M9 4V2.5A1.5 1.5 0 0 0 7.5 1h-5A1.5 1.5 0 0 0 1 2.5v5A1.5 1.5 0 0 0 2.5 9H4" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
            </svg>
            <svg v-else width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5l3.5 3.5 5.5-6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ copiedIdx === i ? 'Tersalin!' : 'Salin' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props  = defineProps({ gifts: Array })
const copiedIdx = ref(-1)

function cardStyle(gift) {
  return {
    background: `linear-gradient(135deg, ${gift.color1} 0%, ${gift.color2} 100%)`,
  }
}

function formatNumber(num) {
  if (num.includes('-')) return num.split('-')
  return num.replace(/\s/g, '').match(/.{1,4}/g) || [num]
}

async function copy(text, idx) {
  try {
    await navigator.clipboard.writeText(text.replace(/-/g, ''))
  } catch {
    const el = document.createElement('textarea')
    el.value = text.replace(/-/g, '')
    document.body.appendChild(el)
    el.select(); document.execCommand('copy')
    document.body.removeChild(el)
  }
  copiedIdx.value = idx
  setTimeout(() => { copiedIdx.value = -1 }, 2200)
}
</script>

<style scoped>
.gift { background: var(--ivory-2); padding: var(--section-pad); }
.gift-inner { max-width: var(--max-w); margin: 0 auto; }

.gift-desc {
  font-size: 14px; color: var(--ink-muted);
  line-height: 1.75; margin-top: 14px; margin-bottom: 48px;
  max-width: 480px;
}

.cards-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.atm-card {
  position: relative;
  border-radius: 16px;
  padding: 28px 28px 24px;
  overflow: hidden;
  height: 190px;
  display: flex; flex-direction: column; justify-content: space-between;
  cursor: default;
  box-shadow:
    0 24px 48px rgba(0,0,0,.25),
    0 8px 16px rgba(0,0,0,.15),
    inset 0 1px 0 rgba(255,255,255,.15);
  transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
}
.atm-card:hover {
  transform: translateY(-4px) rotate(.5deg);
  box-shadow:
    0 32px 64px rgba(0,0,0,.3),
    0 12px 24px rgba(0,0,0,.2),
    inset 0 1px 0 rgba(255,255,255,.18);
}

.card-noise {
  position: absolute; inset: 0; border-radius: 16px;
  opacity: .06;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
}

.card-chip {
  width: 36px; height: 28px;
  background: linear-gradient(135deg, #e8d48e, #c8a84e, #e8d48e);
  border-radius: 4px;
  position: relative; overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0;
}
.chip-line {
  background: rgba(160,120,40,.4);
}
.chip-line.h {
  grid-column: 1/-1;
  height: 1px; align-self: center;
}
.chip-line.v {
  width: 1px; justify-self: center;
  grid-row: 1/-1;
}

.card-top {
  display: flex; align-items: flex-start;
  justify-content: space-between;
}

.bank-svg { height: 20px; width: auto; }

.card-number {
  display: flex; gap: 14px;
  font-family: 'Courier New', monospace;
  font-size: 18px; font-weight: 700;
  color: rgba(255,255,255,.92);
  letter-spacing: .08em;
}
.num-group { display: inline-block; }

.card-bottom {
  display: flex; align-items: flex-end;
  justify-content: space-between;
}
.card-label {
  font-size: 9px; letter-spacing: .2em;
  text-transform: uppercase; color: rgba(255,255,255,.5);
  margin-bottom: 3px;
}
.card-holder {
  font-size: 14px; font-weight: 500;
  color: rgba(255,255,255,.9); letter-spacing: .04em;
}
.card-type-badge {
  font-size: 9px; letter-spacing: .18em;
  text-transform: uppercase; color: rgba(255,255,255,.5);
  border: 1px solid rgba(255,255,255,.2);
  padding: 3px 8px; border-radius: 20px;
}

.card-shimmer {
  position: absolute;
  top: -50%; left: -60%;
  width: 40%; height: 200%;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.07) 50%, transparent 60%);
  transform: skewX(-15deg);
  transition: left .6s ease;
  pointer-events: none;
}
.atm-card:hover .card-shimmer { left: 120%; }

.copy-list { display: flex; flex-direction: column; gap: 12px; }
.copy-row {
  display: flex; align-items: center;
  justify-content: space-between;
  background: var(--ivory);
  border: 1px solid var(--ivory-3);
  padding: 14px 20px;
  border-radius: 8px;
}
.copy-info { display: flex; flex-direction: column; gap: 3px; }
.copy-bank {
  font-size: 10px; font-weight: 500;
  letter-spacing: .2em; text-transform: uppercase; color: var(--gold);
}
.copy-num {
  font-family: 'Courier New', monospace;
  font-size: 15px; color: var(--ink); letter-spacing: .05em;
}
.copy-btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 18px;
  border: 1px solid var(--ivory-3);
  background: var(--ivory-2);
  color: var(--ink-soft);
  font-family: var(--font-body); font-size: 12px;
  font-weight: 500; letter-spacing: .06em;
  cursor: pointer; border-radius: 6px;
  transition: background .2s, border-color .2s, color .2s;
  white-space: nowrap;
}
.copy-btn:hover {
  background: var(--ivory-3); border-color: var(--parchment);
  color: var(--ink);
}
.copy-btn.copied {
  background: var(--sage-pale); border-color: var(--sage-light);
  color: var(--sage);
}
</style>
