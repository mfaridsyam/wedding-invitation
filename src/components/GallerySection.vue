<template>
  <section class="gallery">
    <div class="gallery-inner">
      <span class="eyebrow reveal" style="color:var(--gold-light)">Galeri Foto</span>
      <h2 class="display-title reveal reveal-delay-1" style="color:var(--ivory)">
        Momen <em>Berharga</em>
      </h2>
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
          <span class="g-empty-icon">✦</span>
          <span class="g-empty-text">Foto {{ i + 1 }}</span>
        </div>
        <div class="g-overlay">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="white" stroke-width="1"/>
            <path d="M7 10h6M10 7v6" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </div>
      </button>
    </div>

    <Teleport to="body">
      <Transition name="lb">
        <div v-if="lbOpen" class="lightbox" @click.self="close">
          <button class="lb-x" @click="close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="lb-arrow left" @click="nav(-1)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10l6 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
            <p class="lb-counter">{{ lbIdx + 1 }} / {{ photos.length }}</p>
          </div>
          <button class="lb-arrow right" @click="nav(1)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4l6 6-6 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
  'linear-gradient(135deg,#2a2218,#3d3020)',
  'linear-gradient(135deg,#1e2820,#243328)',
  'linear-gradient(135deg,#281e28,#3a2835)',
  'linear-gradient(135deg,#1e2228,#222a35)',
  'linear-gradient(135deg,#28201a,#3a2e22)',
  'linear-gradient(135deg,#201e28,#2e2838)',
]

function cloudinary(url, idx) {
  if (!url || !url.includes('cloudinary')) return url
  const sizes = [800, 400, 400, 400, 400, 800]
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
  background: var(--ink);
  padding: 88px 0 0;
}
.gallery-inner {
  max-width: var(--max-w); margin: 0 auto;
  padding: 0 24px 48px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 3px;
}

.g-cell {
  position: relative; overflow: hidden;
  cursor: pointer; background: var(--ink-2);
  border: none; padding: 0; display: block;
}
.g-cell img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform .6s cubic-bezier(.25,.46,.45,.94);
}
.g-cell:hover img  { transform: scale(1.06); }

.cell-0 { grid-column: 1/3; grid-row: 1; aspect-ratio: 4/3; }
.cell-1 { grid-column: 3;   grid-row: 1/3; }
.cell-2 { grid-column: 1;   grid-row: 2; aspect-ratio: 1; }
.cell-3 { grid-column: 2;   grid-row: 2; aspect-ratio: 1; }
.cell-4 { grid-column: 1/3; grid-row: 3; aspect-ratio: 2/1; }
.cell-5 { grid-column: 3;   grid-row: 3; aspect-ratio: 1; }

.g-empty {
  width: 100%; height: 100%; min-height: 160px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 8px;
}
.g-empty-icon { font-size: 18px; color: rgba(184,150,90,.2); }
.g-empty-text { font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: rgba(184,150,90,.2); }

.g-overlay {
  position: absolute; inset: 0;
  background: rgba(28,24,20,.45);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity .3s;
}
.g-cell:hover .g-overlay { opacity: 1; }

.lightbox {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(10,8,6,.96);
  display: flex; align-items: center; justify-content: center;
}
.lb-x {
  position: absolute; top: 20px; right: 20px;
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,.08); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .2s;
}
.lb-x:hover { background: rgba(255,255,255,.16); }

.lb-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 44px; height: 44px;
  background: rgba(255,255,255,.06); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .2s; border-radius: 2px;
}
.lb-arrow:hover { background: rgba(255,255,255,.14); }
.lb-arrow.left  { left: 16px; }
.lb-arrow.right { right: 16px; }

.lb-media { display: flex; flex-direction: column; align-items: center; }
.lb-img {
  max-width: 90vw; max-height: 85vh;
  object-fit: contain; display: block;
}
.lb-empty {
  color: rgba(245,240,232,.25); font-size: 13px; letter-spacing: .1em;
}
.lb-counter {
  margin-top: 14px; font-size: 11px;
  letter-spacing: .2em; color: rgba(245,240,232,.3);
}

.lb-enter-active, .lb-leave-active { transition: opacity .25s; }
.lb-enter-from, .lb-leave-to       { opacity: 0; }

@media (max-width: 480px) {
  .gallery-grid { grid-template-columns: 1fr 1fr; }
  .cell-0 { grid-column: 1/3; grid-row: 1; }
  .cell-1 { grid-column: 1;   grid-row: 2/4; aspect-ratio: unset; }
  .cell-2 { grid-column: 2;   grid-row: 2; aspect-ratio: 1; }
  .cell-3 { grid-column: 2;   grid-row: 3; aspect-ratio: 1; }
  .cell-4 { grid-column: 1;   grid-row: 4; aspect-ratio: 1; }
  .cell-5 { grid-column: 2;   grid-row: 4; aspect-ratio: 1; }
}
</style>
