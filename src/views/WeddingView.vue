<template>
  <div v-if="loading" class="loading-screen">
    <div class="loading-inner">
      <div class="loading-logo">✦</div>
      <div class="loading-dots">
        <span/><span/><span/>
      </div>
    </div>
  </div>

  <NotFoundView v-else-if="notFound" />

  <div v-else-if="data">
    <CoverSection
      :groom="data.groom"
      :bride="data.bride"
      :date="data.dateDisplay"
      :guest="guestName"
      @open="onOpen"
    />

    <main :class="{ visible: opened }">
      <HeroSection       :groom="data.groom" :bride="data.bride" :date="data.dateDisplay" />
      <CountdownSection  :target-date="data.targetDate" />
      <QuoteSection      :quote="data.quote" :quote-source="data.quoteSource" />
      <CoupleSection     :groom="data.groom" :bride="data.bride" />
      <EventsSection     :events="data.events" />
      <GallerySection    :photos="data.photos" />
      <GiftSection       :gifts="data.gifts" />
      <WishesSection     :slug="slug" />
      <FooterSection     :groom="data.groom" :bride="data.bride" :date="data.dateDisplay" />
    </main>

    <button class="audio-fab" @click="toggleAudio" v-if="opened">
      <div class="bars" :class="{ paused: !playing }">
        <span/><span/><span/><span/><span/>
      </div>
    </button>

    <audio ref="bgm" loop preload="none">
      <source v-if="data.musicUrl" :src="data.musicUrl" type="audio/mpeg" />
      <source v-else src="https://www.bensound.com/bensound-music/bensound-romantic.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useWedding } from '../composables/useWedding.js'
import { useReveal }  from '../composables/useReveal.js'

import NotFoundView    from './NotFoundView.vue'
import CoverSection    from '../components/CoverSection.vue'
import HeroSection     from '../components/HeroSection.vue'
import CountdownSection from '../components/CountdownSection.vue'
import QuoteSection    from '../components/QuoteSection.vue'
import CoupleSection   from '../components/CoupleSection.vue'
import EventsSection   from '../components/EventsSection.vue'
import GallerySection  from '../components/GallerySection.vue'
import GiftSection     from '../components/GiftSection.vue'
import WishesSection   from '../components/WishesSection.vue'
import FooterSection   from '../components/FooterSection.vue'

const route = useRoute()

const slug = computed(() => route.params.slug || '')

const guestName = computed(() => {
  const raw = route.params.guest || ''
  const decoded = decodeURIComponent(raw.replace(/\+/g, ' ')).trim()
  return decoded
    ? decoded.replace(/\b\w/g, c => c.toUpperCase())
    : ''
})

const { data, loading, notFound } = useWedding(slug.value)

const opened  = ref(false)
const playing = ref(false)
const bgm     = ref(null)

const { rescan } = useReveal()

function onOpen() {
  opened.value = true
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  window.scrollTo(0, 0)
  setTimeout(rescan, 300)
  if (bgm.value) {
    bgm.value.volume = 0.3
    bgm.value.play().then(() => { playing.value = true }).catch(() => {})
  }
}

function toggleAudio() {
  if (!bgm.value) return
  if (playing.value) { bgm.value.pause(); playing.value = false }
  else               { bgm.value.play().catch(() => {}); playing.value = true }
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.top = '0'
  document.body.style.width = '100%'
  if (bgm.value) bgm.value.volume = 0.3
})
</script>

<style>
main {
  opacity: 0;
  transition: opacity .9s ease;
  pointer-events: none;
}
main.visible {
  opacity: 1;
  pointer-events: auto;
}

.loading-screen {
  position: fixed; inset: 0;
  background: var(--ink);
  display: flex; align-items: center; justify-content: center;
  z-index: 200;
}
.loading-inner { text-align: center; }
.loading-logo {
  font-size: 32px; color: var(--gold);
  margin-bottom: 28px;
  animation: pulse-logo 2s ease-in-out infinite;
}
@keyframes pulse-logo {
  0%,100% { opacity: 1; transform: scale(1); }
  50%      { opacity: .5; transform: scale(.9); }
}
.loading-dots {
  display: flex; gap: 8px; justify-content: center;
}
.loading-dots span {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--gold-light); opacity: .3;
  animation: dot-pop .9s ease-in-out infinite;
}
.loading-dots span:nth-child(2) { animation-delay: .18s; }
.loading-dots span:nth-child(3) { animation-delay: .36s; }
@keyframes dot-pop {
  0%,80%,100% { opacity: .3; transform: scale(1); }
  40%          { opacity: 1;  transform: scale(1.4); }
}
</style>