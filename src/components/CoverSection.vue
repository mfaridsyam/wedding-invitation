<template>
  <Transition name="cover-fade">
    <div v-if="!opened" class="cover">
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />

      <div class="cover-noise" />

      <div class="cover-line top-line" />
      <div class="cover-line bottom-line" />

      <svg class="corner-ornament tl" viewBox="0 0 80 80" fill="none">
        <path d="M4 76 L4 4 L76 4" stroke="#B8965A" stroke-width=".8" opacity=".4"/>
        <path d="M4 40 L20 40" stroke="#B8965A" stroke-width=".6" opacity=".3"/>
        <path d="M40 4 L40 20" stroke="#B8965A" stroke-width=".6" opacity=".3"/>
        <circle cx="4" cy="4" r="2" fill="#B8965A" opacity=".4"/>
      </svg>
      <svg class="corner-ornament tr" viewBox="0 0 80 80" fill="none">
        <path d="M76 76 L76 4 L4 4" stroke="#B8965A" stroke-width=".8" opacity=".4"/>
        <path d="M76 40 L60 40" stroke="#B8965A" stroke-width=".6" opacity=".3"/>
        <path d="M40 4 L40 20" stroke="#B8965A" stroke-width=".6" opacity=".3"/>
        <circle cx="76" cy="4" r="2" fill="#B8965A" opacity=".4"/>
      </svg>
      <svg class="corner-ornament bl" viewBox="0 0 80 80" fill="none">
        <path d="M4 4 L4 76 L76 76" stroke="#B8965A" stroke-width=".8" opacity=".4"/>
        <path d="M4 40 L20 40" stroke="#B8965A" stroke-width=".6" opacity=".3"/>
        <path d="M40 76 L40 60" stroke="#B8965A" stroke-width=".6" opacity=".3"/>
        <circle cx="4" cy="76" r="2" fill="#B8965A" opacity=".4"/>
      </svg>
      <svg class="corner-ornament br" viewBox="0 0 80 80" fill="none">
        <path d="M76 4 L76 76 L4 76" stroke="#B8965A" stroke-width=".8" opacity=".4"/>
        <path d="M76 40 L60 40" stroke="#B8965A" stroke-width=".6" opacity=".3"/>
        <path d="M40 76 L40 60" stroke="#B8965A" stroke-width=".6" opacity=".3"/>
        <circle cx="76" cy="76" r="2" fill="#B8965A" opacity=".4"/>
      </svg>

      <svg class="cover-botanical left" viewBox="0 0 140 420" fill="none">
        <path d="M70 410 C70 350 70 280 70 200" stroke="#B8965A" stroke-width="1" opacity=".35"/>
        <path d="M70 350 C45 325 20 315 5 290" stroke="#B8965A" stroke-width=".7" opacity=".3"/>
        <path d="M70 310 C95 285 112 270 130 255" stroke="#B8965A" stroke-width=".7" opacity=".3"/>
        <path d="M70 270 C40 250 18 238 2 215" stroke="#B8965A" stroke-width=".6" opacity=".25"/>
        <path d="M70 380 C48 365 28 355 10 340" stroke="#B8965A" stroke-width=".5" opacity=".2"/>
        <ellipse cx="5" cy="288" rx="15" ry="8" fill="#B8965A" opacity=".1" transform="rotate(-25 5 288)"/>
        <ellipse cx="130" cy="253" rx="15" ry="8" fill="#B8965A" opacity=".1" transform="rotate(20 130 253)"/>
        <ellipse cx="2" cy="213" rx="12" ry="7" fill="#B8965A" opacity=".08" transform="rotate(-30 2 213)"/>
        <circle cx="5" cy="288" r="3" fill="none" stroke="#B8965A" stroke-width=".5" opacity=".25"/>
        <circle cx="130" cy="253" r="3" fill="none" stroke="#B8965A" stroke-width=".5" opacity=".25"/>
      </svg>
      <svg class="cover-botanical right" viewBox="0 0 140 420" fill="none" style="transform:scaleX(-1)">
        <path d="M70 410 C70 350 70 280 70 200" stroke="#B8965A" stroke-width="1" opacity=".35"/>
        <path d="M70 350 C45 325 20 315 5 290" stroke="#B8965A" stroke-width=".7" opacity=".3"/>
        <path d="M70 310 C95 285 112 270 130 255" stroke="#B8965A" stroke-width=".7" opacity=".3"/>
        <path d="M70 270 C40 250 18 238 2 215" stroke="#B8965A" stroke-width=".6" opacity=".25"/>
        <path d="M70 380 C48 365 28 355 10 340" stroke="#B8965A" stroke-width=".5" opacity=".2"/>
        <ellipse cx="5" cy="288" rx="15" ry="8" fill="#B8965A" opacity=".1" transform="rotate(-25 5 288)"/>
        <ellipse cx="130" cy="253" rx="15" ry="8" fill="#B8965A" opacity=".1" transform="rotate(20 130 253)"/>
        <ellipse cx="2" cy="213" rx="12" ry="7" fill="#B8965A" opacity=".08" transform="rotate(-30 2 213)"/>
        <circle cx="5" cy="288" r="3" fill="none" stroke="#B8965A" stroke-width=".5" opacity=".25"/>
        <circle cx="130" cy="253" r="3" fill="none" stroke="#B8965A" stroke-width=".5" opacity=".25"/>
      </svg>

      <svg class="center-diamond" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 12L12 22L2 12Z" stroke="#B8965A" stroke-width=".8" opacity=".5"/>
        <path d="M12 6L18 12L12 18L6 12Z" fill="#B8965A" opacity=".15"/>
      </svg>

      <div class="cover-body">
        <div class="cover-pre-title">
          <div class="pre-line" /><span>Bismillahirrahmanirrahim</span><div class="pre-line" />
        </div>

        <p class="cover-script">The Wedding of</p>

        <h1 class="cover-names">
          <span class="name-groom">{{ groom.shortName }}</span>
          <span class="cover-amp">
            <svg viewBox="0 0 40 40" fill="none" class="amp-svg">
              <path d="M20 4 L36 20 L20 36 L4 20 Z" stroke="#B8965A" stroke-width=".8" opacity=".6"/>
              <text x="20" y="26" text-anchor="middle" font-size="16" font-family="Playfair Display, serif" font-style="italic" fill="#B8965A" opacity=".9">&amp;</text>
            </svg>
          </span>
          <span class="name-bride">{{ bride.shortName }}</span>
        </h1>

        <div class="cover-divider">
          <div class="div-line" />
          <svg viewBox="0 0 20 20" width="12" height="12" fill="#B8965A" opacity=".6">
            <path d="M10 1L12.5 7.5L19 10L12.5 12.5L10 19L7.5 12.5L1 10L7.5 7.5Z"/>
          </svg>
          <div class="div-line" />
        </div>

        <p class="cover-date">{{ date }}</p>

        <Transition name="guest-pop">
          <div v-if="guest" class="cover-guest">
            <span class="cover-guest-label">Kepada Yth.</span>
            <span class="cover-guest-name">{{ guest }}</span>
          </div>
        </Transition>

        <button class="cover-cta" @click="open">
          <span>Buka Undangan</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  groom: Object,
  bride: Object,
  date:  String,
  guest: { type: String, default: '' },
})
const emit   = defineEmits(['open'])
const opened = ref(false)
function open() { opened.value = true; emit('open') }
</script>

<style scoped>
.cover {
  position: fixed; inset: 0; z-index: 100;
  background: #0e0c09;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}

.orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); pointer-events: none;
  animation: orb-float 12s ease-in-out infinite;
}
.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(184,150,90,.12) 0%, transparent 70%);
  top: -100px; left: -100px;
  animation-delay: 0s;
}
.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(184,150,90,.08) 0%, transparent 70%);
  bottom: -80px; right: -80px;
  animation-delay: -4s;
}
.orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(100,80,140,.06) 0%, transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%,-50%);
  animation-delay: -8s;
}
@keyframes orb-float {
  0%,100% { transform: translate(0,0) scale(1); }
  33%      { transform: translate(30px,-20px) scale(1.05); }
  66%      { transform: translate(-20px,30px) scale(.95); }
}
.orb-3 { animation-name: orb-float-center; }
@keyframes orb-float-center {
  0%,100% { transform: translate(-50%,-50%) scale(1); }
  50%      { transform: translate(-50%,-50%) scale(1.2); }
}

.cover-noise {
  position: absolute; inset: 0; opacity: .035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  pointer-events: none;
}

.cover-line {
  position: absolute; left: 20px; right: 20px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184,150,90,.2), rgba(184,150,90,.35), rgba(184,150,90,.2), transparent);
}
.top-line    { top: 20px; }
.bottom-line { bottom: 20px; }

.corner-ornament {
  position: absolute; width: 80px; height: 80px;
}
.corner-ornament.tl { top: 12px;    left: 12px; }
.corner-ornament.tr { top: 12px;    right: 12px; }
.corner-ornament.bl { bottom: 12px; left: 12px; }
.corner-ornament.br { bottom: 12px; right: 12px; }

.cover-botanical {
  position: absolute; bottom: 0; width: 140px; height: 420px; opacity: .7;
}
.cover-botanical.left  { left:  clamp(0px, 2vw, 30px); }
.cover-botanical.right { right: clamp(0px, 2vw, 30px); }

.center-diamond {
  position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
  width: 24px; height: 24px;
  animation: diamond-pulse 3s ease-in-out infinite;
}
@keyframes diamond-pulse {
  0%,100% { opacity: .5; }
  50%      { opacity: 1; }
}

.cover-body {
  position: relative; z-index: 1;
  text-align: center; padding: 0 56px;
  display: flex; flex-direction: column; align-items: center;
  animation: body-in 1.4s cubic-bezier(.22,1,.36,1) both;
}
@keyframes body-in {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.cover-pre-title {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 24px;
}
.pre-line {
  width: 40px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184,150,90,.5));
}
.pre-line:last-child {
  background: linear-gradient(270deg, transparent, rgba(184,150,90,.5));
}
.cover-pre-title span {
  font-size: 9px; letter-spacing: .28em; text-transform: uppercase;
  color: rgba(184,150,90,.55); white-space: nowrap;
  font-family: 'DM Sans', sans-serif;
}

.cover-script {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: 16px; color: rgba(184,150,90,.75);
  letter-spacing: .1em; margin-bottom: 16px;
  animation: body-in 1.4s .15s cubic-bezier(.22,1,.36,1) both;
}

.cover-names {
  font-family: 'Playfair Display', serif;
  font-size: clamp(52px, 15vw, 108px);
  font-weight: 400; line-height: .95; color: #f5f0e8;
  display: flex; flex-direction: column; align-items: center; gap: 0;
  animation: body-in 1.4s .25s cubic-bezier(.22,1,.36,1) both;
}
.name-groom, .name-bride { display: block; }
.name-groom {
  text-shadow: 0 0 80px rgba(184,150,90,.2);
}
.name-bride {
  text-shadow: 0 0 80px rgba(184,150,90,.2);
}

.cover-amp {
  display: flex; align-items: center; justify-content: center;
  margin: 6px 0;
}
.amp-svg { width: 44px; height: 44px; }

.cover-divider {
  display: flex; align-items: center; gap: 10px;
  margin: 18px 0 14px;
  animation: body-in 1.4s .35s cubic-bezier(.22,1,.36,1) both;
}
.div-line {
  width: 60px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184,150,90,.4));
}
.div-line:last-child {
  background: linear-gradient(270deg, transparent, rgba(184,150,90,.4));
}

.cover-date {
  font-size: 10px; letter-spacing: .32em; text-transform: uppercase;
  color: rgba(184,150,90,.6);
  font-family: 'DM Sans', sans-serif;
  animation: body-in 1.4s .4s cubic-bezier(.22,1,.36,1) both;
}

.cover-guest {
  display: flex; flex-direction: column; align-items: center;
  margin-top: 24px;
  padding: 12px 28px 14px;
  border: 1px solid rgba(184,150,90,.18);
  border-radius: 2px;
  background: rgba(184,150,90,.04);
  position: relative;
}
.cover-guest::before, .cover-guest::after {
  content: '✦';
  position: absolute; top: 50%; transform: translateY(-50%);
  font-size: 8px; color: rgba(184,150,90,.3);
}
.cover-guest::before { left: -16px; }
.cover-guest::after  { right: -16px; }

.cover-guest-label {
  font-size: 8px; letter-spacing: .35em; text-transform: uppercase;
  color: rgba(184,150,90,.45); margin-bottom: 5px;
  font-family: 'DM Sans', sans-serif;
}
.cover-guest-name {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: clamp(18px, 4.5vw, 30px);
  color: rgba(184,150,90,.95); letter-spacing: .02em;
}

.guest-pop-enter-active { transition: all .8s cubic-bezier(.22,1,.36,1); }
.guest-pop-enter-from   { opacity: 0; transform: translateY(-10px); }

.cover-cta {
  margin-top: 36px;
  display: inline-flex; align-items: center; gap: 12px;
  padding: 14px 36px;
  border: 1px solid rgba(184,150,90,.35);
  color: rgba(184,150,90,.9);
  font-family: 'DM Sans', sans-serif; font-size: 10px;
  letter-spacing: .22em; text-transform: uppercase;
  background: transparent; cursor: pointer;
  transition: all .35s cubic-bezier(.22,1,.36,1);
  position: relative; overflow: hidden;
  animation: body-in 1.4s .5s cubic-bezier(.22,1,.36,1) both;
}
.cover-cta::before {
  content: '';
  position: absolute; inset: 0;
  background: rgba(184,150,90,.08);
  transform: scaleX(0); transform-origin: left;
  transition: transform .35s cubic-bezier(.22,1,.36,1);
}
.cover-cta:hover::before { transform: scaleX(1); }
.cover-cta:hover {
  border-color: rgba(184,150,90,.65);
  color: #e8c878;
  transform: translateY(-1px);
}

.cover-fade-leave-active { transition: opacity .8s ease, transform .8s ease; }
.cover-fade-leave-to     { opacity: 0; transform: scale(1.04); }

@media (max-width: 480px) {
  .cover-body { padding: 0 36px; }
  .corner-ornament { width: 56px; height: 56px; }
  .cover-botanical { width: 100px; height: 320px; }
  .cover-pre-title { display: none; }
}
</style>