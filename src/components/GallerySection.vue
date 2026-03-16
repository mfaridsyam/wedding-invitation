<template>
  <section class="gallery">
    <div class="gallery-header reveal">
      <div class="section-label">
        <div class="label-line" /><span>Galeri Foto</span><div class="label-line" />
      </div>
      <h2 class="display-title" style="color:var(--ink)">Momen <em>Berharga</em></h2>
    </div>

    <div class="gallery-grid reveal reveal-delay-2">
      <button
        v-for="(photo, i) in photos"
        :key="i"
        class="g-cell"
        :class="`cell-${i}`"
        @click="open(i)"
        :aria-label="`Lihat foto ${i + 1}`"
      >
        <img v-if="photo.src" :src="cloudinary(photo.src, i)" :alt="photo.alt" loading="lazy" />
        <div v-else class="g-empty" :style="{ background: bgs[i % bgs.length] }">
          <div class="empty-inner">
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
              <rect x="3" y="7" width="26" height="19" rx="2" stroke="rgba(184,150,90,.4)" stroke-width="1"/>
              <circle cx="11" cy="14" r="3" stroke="rgba(184,150,90,.4)" stroke-width="1"/>
              <path d="M3 22l7-5 5 4 4-3 9 7" stroke="rgba(184,150,90,.4)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="g-empty-text">Foto {{ i + 1 }}</span>
          </div>
        </div>

        <div class="g-overlay">
          <div class="g-overlay-content">
            <div class="g-zoom-icon">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="10" stroke="white" stroke-width=".8" opacity=".7"/>
                <path d="M8 11h6M11 8v6" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="g-index">{{ String(i + 1).padStart(2, '0') }}</div>
      </button>
    </div>

    <Teleport to="body">
      <Transition name="lb">
        <div v-if="lbOpen" class="lightbox" @click.self="close">
          <button class="lb-x" @click="close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="lb-arrow left" @click="nav(-1)">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 3L5 9l6 6" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="lb-media">
            <img
              v-if="photos[lbIdx]?.src"
              :src="photos[lbIdx].src"
              :alt="photos[lbIdx].alt"
              class="lb-img"
            />
            <div v-else class="lb-empty">Foto belum diisi</div>
            <p class="lb-counter">
              <span class="lb-current">{{ String(lbIdx + 1).padStart(2, '0') }}</span>
              <span class="lb-sep"> / </span>
              <span>{{ String(photos.length).padStart(2, '0') }}</span>
            </p>
          </div>
          <button class="lb-arrow right" @click="nav(1)">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 3l6 6-6 6" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({ photos: Array })
const lbOpen = ref(false)
const lbIdx  = ref(0)

const bgs = [
  'linear-gradient(145deg,#ede5d8,#e0d4c0)',
  'linear-gradient(145deg,#e8e0d2,#ddd4c2)',
  'linear-gradient(145deg,#ece6da,#e2d8ca)',
  'linear-gradient(145deg,#e6ddd0,#dcd0be)',
  'linear-gradient(145deg,#ede8dc,#e4dace)',
  'linear-gradient(145deg,#e8e2d6,#dfd6c6)',
]

function cloudinary(url, idx) {
  if (!url || !url.includes('cloudinary')) return url
  const sizes = [900, 500, 500, 500, 900, 500]
  const w = sizes[idx] || 600
  return url.replace('/upload/', `/upload/q_auto,f_auto,w_${w}/`)
}

function open(i) { lbIdx.value = i; lbOpen.value = true; document.body.style.overflow = 'hidden' }
function close()  { lbOpen.value = false; document.body.style.overflow = '' }
function nav(d)   { lbIdx.value = (lbIdx.value + d + props.photos.length) % props.photos.length }

function onKey(e) {
  if (!lbOpen.value) return
  if (e.key === 'Escape')     close()
  if (e.key === 'ArrowLeft')  nav(-1)
  if (e.key === 'ArrowRight') nav(1)
}
onMounted(()  => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.gallery {
  background: var(--ivory-2);
  padding-bottom: 0;
  position: relative;
}

.gallery-header {
  max-width: var(--max-w); margin: 0 auto;
  padding: 88px 24px 56px;
}

.section-label {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 12px;
}
.label-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184,150,90,.3));
}
.label-line:last-child {
  background: linear-gradient(270deg, transparent, rgba(184,150,90,.3));
}
.section-label span {
  font-size: 9px; letter-spacing: .3em; text-transform: uppercase;
  color: var(--gold); font-family: 'DM Sans', sans-serif;
  white-space: nowrap;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 260px 200px 320px;
  gap: 3px;
}

.g-cell {
  position: relative; overflow: hidden;
  cursor: pointer; background: var(--ivory-3);
  border: none; padding: 0; display: block;
  transition: opacity .3s;
}
.g-cell img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform .7s cubic-bezier(.25,.46,.45,.94);
}
.g-cell:hover img { transform: scale(1.08); }

.cell-0 { grid-column: 1 / 8;  grid-row: 1; }
.cell-1 { grid-column: 8 / 13; grid-row: 1 / 3; }
.cell-2 { grid-column: 1 / 5;  grid-row: 2; }
.cell-3 { grid-column: 5 / 8;  grid-row: 2; }
.cell-4 { grid-column: 1 / 6;  grid-row: 3; }
.cell-5 { grid-column: 6 / 13; grid-row: 3; }

.g-empty {
  width: 100%; height: 100%; min-height: 180px;
  display: flex; align-items: center; justify-content: center;
}
.empty-inner {
  display: flex; flex-direction: column;
  align-items: center; gap: 8px;
}
.g-empty-text {
  font-size: 9px; letter-spacing: .2em; text-transform: uppercase;
  color: rgba(184,150,90,.35);
  font-family: 'DM Sans', sans-serif;
}

.g-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(10,8,6,.7) 0%, transparent 60%);
  opacity: 0; transition: opacity .35s;
  display: flex; align-items: flex-end; justify-content: flex-start;
  padding: 20px;
}
.g-cell:hover .g-overlay { opacity: 1; }
.g-overlay-content {
  display: flex; flex-direction: column; gap: 8px;
}
.g-zoom-icon {
  display: flex; align-items: center; justify-content: center;
  width: 40px; height: 40px;
  background: rgba(255,255,255,.1);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.15);
  transition: transform .3s, background .3s;
}
.g-cell:hover .g-zoom-icon { transform: scale(1.1); background: rgba(255,255,255,.15); }

.g-index {
  position: absolute; top: 14px; left: 14px;
  font-size: 9px; letter-spacing: .18em;
  color: rgba(255,255,255,.25);
  font-family: 'DM Sans', sans-serif;
  opacity: 0; transition: opacity .3s;
}
.g-cell:hover .g-index { opacity: 1; }

.lightbox {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(6,5,4,.97);
  display: flex; align-items: center; justify-content: center;
}
.lb-x {
  position: absolute; top: 20px; right: 20px;
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.1);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .2s, border-color .2s;
}
.lb-x:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.2); }

.lb-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 48px; height: 48px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.08);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .2s;
}
.lb-arrow:hover { background: rgba(255,255,255,.1); }
.lb-arrow.left  { left: 20px; }
.lb-arrow.right { right: 20px; }

.lb-media { display: flex; flex-direction: column; align-items: center; }
.lb-img {
  max-width: 88vw; max-height: 82vh;
  object-fit: contain; display: block;
  border-radius: 2px;
}
.lb-empty { color: rgba(245,240,232,.2); font-size: 13px; letter-spacing: .1em; }
.lb-counter {
  margin-top: 16px; font-size: 11px;
  letter-spacing: .2em; color: rgba(255,255,255,.2);
  font-family: 'DM Sans', sans-serif;
}
.lb-current { color: rgba(184,150,90,.7); }
.lb-sep     { color: rgba(255,255,255,.1); margin: 0 4px; }

.lb-enter-active, .lb-leave-active { transition: opacity .25s; }
.lb-enter-from, .lb-leave-to       { opacity: 0; }

@media (max-width: 640px) {
  .gallery-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 200px 200px 200px;
  }
  .cell-0 { grid-column: 1/3; grid-row: 1; }
  .cell-1 { grid-column: 1;   grid-row: 2; }
  .cell-2 { grid-column: 2;   grid-row: 2; }
  .cell-3 { grid-column: 1;   grid-row: 3; }
  .cell-4 { grid-column: 2;   grid-row: 3; }
  .cell-5 { display: none; }
}
</style>