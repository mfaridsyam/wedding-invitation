<template>
  <Transition name="cover-fade">
    <div v-if="!opened" class="cover">
      <div class="cover-noise" />
      <svg class="cover-botanical left" viewBox="0 0 120 300" fill="none">
        <path d="M60 290 C60 290 60 200 60 160" stroke="#B8965A" stroke-width=".8" opacity=".5"/>
        <path d="M60 220 C40 200 20 195 10 175" stroke="#B8965A" stroke-width=".6" opacity=".4"/>
        <path d="M60 200 C80 178 90 165 105 155" stroke="#B8965A" stroke-width=".6" opacity=".4"/>
        <path d="M60 245 C35 230 18 218 5 200" stroke="#B8965A" stroke-width=".5" opacity=".3"/>
        <ellipse cx="10" cy="173" rx="12" ry="7" fill="#B8965A" opacity=".18" transform="rotate(-30 10 173)"/>
        <ellipse cx="105" cy="153" rx="12" ry="7" fill="#B8965A" opacity=".18" transform="rotate(25 105 153)"/>
      </svg>
      <svg class="cover-botanical right" viewBox="0 0 120 300" fill="none" style="transform:scaleX(-1)">
        <path d="M60 290 C60 290 60 200 60 160" stroke="#B8965A" stroke-width=".8" opacity=".5"/>
        <path d="M60 220 C40 200 20 195 10 175" stroke="#B8965A" stroke-width=".6" opacity=".4"/>
        <path d="M60 200 C80 178 90 165 105 155" stroke="#B8965A" stroke-width=".6" opacity=".4"/>
        <path d="M60 245 C35 230 18 218 5 200" stroke="#B8965A" stroke-width=".5" opacity=".3"/>
        <ellipse cx="10" cy="173" rx="12" ry="7" fill="#B8965A" opacity=".18" transform="rotate(-30 10 173)"/>
        <ellipse cx="105" cy="153" rx="12" ry="7" fill="#B8965A" opacity=".18" transform="rotate(25 105 153)"/>
      </svg>

      <div class="cover-body">
        <p class="cover-script">The Wedding of</p>

        <h1 class="cover-names">
          <span>{{ groom.shortName }}</span>
          <span class="cover-amp">&amp;</span>
          <span>{{ bride.shortName }}</span>
        </h1>

        <p class="cover-date">{{ date }}</p>

        <Transition name="guest-pop">
          <div v-if="guest" class="cover-guest">
            <span class="cover-guest-label">Kepada Yth.</span>
            <span class="cover-guest-name">{{ guest }}</span>
          </div>
        </Transition>

        <button class="cover-cta" @click="open">
          <span>Buka Undangan</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
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
  background: var(--ink);
  display: flex; align-items: center; justify-content: center;
}
.cover-noise {
  position: absolute; inset: 0; opacity: .04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
.cover-botanical {
  position: absolute; bottom: 0; width: 120px; height: 300px; opacity: .6;
}
.cover-botanical.left  { left:  clamp(8px, 3vw, 40px); }
.cover-botanical.right { right: clamp(8px, 3vw, 40px); }

.cover-body {
  position: relative; z-index: 1;
  text-align: center; padding: 0 48px;
  display: flex; flex-direction: column; align-items: center;
}

.cover-guest {
  display: flex; flex-direction: column; align-items: center;
  margin-top: 28px;
  margin-bottom: 0;
  padding: 14px 28px;
  border: 1px solid rgba(184,150,90,.2);
  border-radius: 4px;
  background: rgba(184,150,90,.05);
}
.cover-guest-label {
  font-size: 9px; letter-spacing: .3em;
  text-transform: uppercase; color: var(--ink-muted);
  margin-bottom: 6px;
}
.cover-guest-name {
  font-family: var(--font-display);
  font-style: italic; font-size: clamp(18px, 4vw, 28px);
  color: var(--gold-light); letter-spacing: .02em;
}

.guest-pop-enter-active { transition: all .7s cubic-bezier(.22,1,.36,1); }
.guest-pop-enter-from   { opacity: 0; transform: translateY(-8px); }

.cover-script {
  font-family: var(--font-display); font-style: italic;
  font-size: 15px; color: var(--gold-light);
  letter-spacing: .08em; margin-bottom: 20px; opacity: .8;
}
.cover-names {
  font-family: var(--font-display);
  font-size: clamp(48px, 13vw, 96px);
  font-weight: 400; line-height: 1; color: var(--ivory);
  display: flex; flex-direction: column; align-items: center; gap: 4px;
}
.cover-names span { display: block; }
.cover-amp {
  font-style: italic; font-size: .45em !important;
  color: var(--gold) !important; line-height: 1.4 !important;
}
.cover-date {
  margin-top: 20px; font-size: 11px; letter-spacing: .28em;
  text-transform: uppercase; color: var(--ink-muted);
}
.cover-cta {
  margin-top: 40px;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 13px 32px;
  border: 1px solid rgba(184,150,90,.4); color: var(--gold-light);
  font-family: var(--font-body); font-size: 11px;
  letter-spacing: .2em; text-transform: uppercase;
  background: transparent; cursor: pointer;
  transition: background .25s, border-color .25s, color .25s;
}
.cover-cta:hover {
  background: rgba(184,150,90,.12);
  border-color: var(--gold); color: var(--gold-pale);
}

.cover-fade-leave-active { transition: opacity .7s ease, transform .7s ease; }
.cover-fade-leave-to     { opacity: 0; transform: scale(1.03); }
</style>
