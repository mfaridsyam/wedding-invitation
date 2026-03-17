<template>
  <section class="gift">
    <div class="gift-inner">
      <div class="section-label reveal">
        <div class="label-line" /><span>Wedding Gift</span><div class="label-line" />
      </div>
      <h2 class="display-title reveal reveal-delay-1" style="color:var(--ivory)">Hadiah <em>Pernikahan</em></h2>
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
          <div class="card-grid-lines" />
          <div class="card-noise" />

          <div class="card-top">
            <div class="card-chip">
              <div class="chip-body">
                <div class="chip-line h" /><div class="chip-line h" />
                <div class="chip-line v" /><div class="chip-line v" />
              </div>
              <div class="chip-glow" />
            </div>
            <div class="card-bank-logo-wrap">
              <img
                v-if="bankLogos[gift.bank]"
                :src="bankLogos[gift.bank]"
                :alt="gift.bank"
                class="card-bank-logo"
                draggable="false"
              />
              <div v-else class="card-bank-label">{{ gift.bank }}</div>
            </div>
          </div>

          <div class="card-number-row">
            <div class="card-number">
              <span v-for="(group, gi) in formatNumber(gift.number)" :key="gi" class="num-group">{{ group }}</span>
            </div>
            <button
              class="card-copy-btn"
              :class="{ copied: copiedIdx === i }"
              @click="copy(gift.number, i)"
              :title="copiedIdx === i ? 'Tersalin!' : 'Salin nomor'"
            >
              <svg v-if="copiedIdx !== i" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="4.5" y="4.5" width="7.5" height="7.5" rx="1.2" stroke="currentColor" stroke-width="1.1"/>
                <path d="M9 4.5V3A1.2 1.2 0 0 0 7.8 1.8H3A1.2 1.2 0 0 0 1.8 3v4.8A1.2 1.2 0 0 0 3 9h1.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
              </svg>
              <svg v-else width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5l3.5 3.5 5.5-6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="card-bottom">
            <div>
              <p class="card-label">Atas Nama</p>
              <p class="card-holder">{{ gift.holder }}</p>
            </div>
            <div class="card-type-badge">{{ gift.type === 'ewallet' ? 'e-Wallet' : 'Tabungan' }}</div>
          </div>

          <div class="card-shimmer" />
          <div class="card-bottom-edge" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props     = defineProps({ gifts: Array })
const copiedIdx = ref(-1)

const bankLogos = {
  BRI:  'https://res.cloudinary.com/dnacoymkh/image/upload/v1773730979/BRI_e4nwwh.png',
  BCA:  'https://res.cloudinary.com/dnacoymkh/image/upload/v1773730979/BCA_rp7ox3.png',
  BNI:  'https://res.cloudinary.com/dnacoymkh/image/upload/v1773730979/BNI_y6aogn.png',
  BSI:  'https://res.cloudinary.com/dnacoymkh/image/upload/v1773734502/BSI_adqdd9.png',
  MANDIRI: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1773732322/Mandiri_sgy2fc.png',
  DANA: 'https://res.cloudinary.com/dnacoymkh/image/upload/v1773730979/DANA_qlkkqs.png',
}

function cardStyle(gift) {
  return { background: `linear-gradient(135deg, ${gift.color1} 0%, ${gift.color2} 100%)` }
}
function formatNumber(num) {
  if (num.includes('-')) return num.split('-')
  return num.replace(/\s/g, '').match(/.{1,4}/g) || [num]
}
async function copy(text, idx) {
  try { await navigator.clipboard.writeText(text.replace(/-/g, '')) }
  catch {
    const el = document.createElement('textarea')
    el.value = text.replace(/-/g, '')
    document.body.appendChild(el); el.select()
    document.execCommand('copy'); document.body.removeChild(el)
  }
  copiedIdx.value = idx
  setTimeout(() => { copiedIdx.value = -1 }, 2200)
}
</script>

<style scoped>
.gift {
  background: linear-gradient(160deg, #0e0c09 0%, #1a1510 50%, #0e0c09 100%);
  padding: var(--section-pad);
}
.gift-inner { max-width: var(--max-w); margin: 0 auto; }

.section-label {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 12px; justify-content: center;
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

.gift-desc {
  font-size: 14px; color: rgba(245,240,232,.4);
  line-height: 1.75; margin-top: 14px; margin-bottom: 48px;
  text-align: center;
}

.cards-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.atm-card {
  position: relative; border-radius: 20px;
  padding: 28px 28px 24px; overflow: hidden; height: 210px;
  display: flex; flex-direction: column; justify-content: space-between;
  cursor: default;
  box-shadow: 0 2px 0 rgba(255,255,255,.08) inset, 0 -1px 0 rgba(0,0,0,.3) inset,
    0 28px 56px rgba(0,0,0,.4), 0 8px 20px rgba(0,0,0,.25);
  transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s;
}
.atm-card:hover {
  transform: translateY(-6px) rotate(.3deg);
  box-shadow: 0 2px 0 rgba(255,255,255,.1) inset, 0 -1px 0 rgba(0,0,0,.3) inset,
    0 40px 80px rgba(0,0,0,.45), 0 16px 32px rgba(0,0,0,.3);
}

.card-grid-lines {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: 32px 32px; pointer-events: none;
}
.card-noise {
  position: absolute; inset: 0; border-radius: 20px; opacity: .05;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
}

.card-top { display: flex; align-items: flex-start; justify-content: space-between; }
.card-chip { position: relative; }
.chip-body {
  width: 38px; height: 30px;
  background: linear-gradient(135deg, #f0e0a0, #d4aa50, #f0e0a0);
  border-radius: 5px; overflow: hidden;
  display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
  box-shadow: 0 2px 6px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.4);
}
.chip-line { background: rgba(140,100,20,.3); }
.chip-line.h { grid-column: 1/-1; height: 1px; align-self: center; }
.chip-line.v { width: 1px; justify-self: center; grid-row: 1/-1; }
.chip-glow {
  position: absolute; top: 2px; left: 4px;
  width: 12px; height: 8px;
  background: linear-gradient(135deg, rgba(255,255,255,.5), transparent);
  border-radius: 2px; pointer-events: none;
}

.card-bank-logo-wrap {
  display: flex; align-items: center; justify-content: flex-end;
}
.card-bank-logo {
  height: 28px;
  width: auto;
  max-width: 80px;
  object-fit: contain;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  filter: brightness(0) invert(1);
  opacity: .85;
}

.card-bank-label {
  font-size: 12px; font-weight: 700; letter-spacing: .14em;
  color: rgba(255,255,255,.7); background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,.12);
  padding: 4px 12px; border-radius: 20px;
  font-family: 'DM Sans', sans-serif;
}

.card-number-row { display: flex; align-items: center; gap: 12px; }
.card-number {
  display: flex; gap: 12px; flex: 1;
  font-family: 'Courier New', monospace;
  font-size: 18px; font-weight: 700;
  color: rgba(255,255,255,.9); letter-spacing: .08em;
  text-shadow: 0 1px 4px rgba(0,0,0,.3);
}
.num-group { display: inline-block; }

.card-copy-btn {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.15);
  color: rgba(255,255,255,.6); cursor: pointer; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  transition: all .2s;
}
.card-copy-btn:hover { background: rgba(255,255,255,.2); border-color: rgba(255,255,255,.3); color: white; transform: scale(1.1); }
.card-copy-btn.copied { background: rgba(80,200,120,.2); border-color: rgba(80,200,120,.4); color: #80e0a0; }

.card-bottom { display: flex; align-items: flex-end; justify-content: space-between; }
.card-label {
  font-size: 8px; letter-spacing: .22em; text-transform: uppercase;
  color: rgba(255,255,255,.4); margin-bottom: 3px; font-family: 'DM Sans', sans-serif;
}
.card-holder { font-size: 14px; font-weight: 500; color: rgba(255,255,255,.88); letter-spacing: .04em; }
.card-type-badge {
  font-size: 8px; letter-spacing: .18em; text-transform: uppercase;
  color: rgba(255,255,255,.45); border: 1px solid rgba(255,255,255,.18);
  padding: 3px 10px; border-radius: 20px; font-family: 'DM Sans', sans-serif;
}

.card-shimmer {
  position: absolute; top: -50%; left: -60%;
  width: 40%; height: 200%;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.06) 50%, transparent 60%);
  transform: skewX(-15deg); transition: left .7s ease; pointer-events: none;
}
.atm-card:hover .card-shimmer { left: 120%; }
.card-bottom-edge {
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent);
  pointer-events: none;
}
</style>