<template>
  <section class="couple">
    <div class="couple-inner">
      <span class="eyebrow reveal">Mempelai</span>
      <h2 class="display-title reveal reveal-delay-1">Dua Insan, <em>Satu Hati</em></h2>

      <div class="couple-grid">
        <div class="person reveal reveal-delay-1">
          <div class="person-frame">
            <img v-if="groom.photo" :src="groom.photo" :alt="groom.name" />
            <div v-else class="person-placeholder">🤵</div>
            <div class="person-badge">Mempelai Pria</div>
          </div>
          <h3 class="person-name">{{ groom.name }}</h3>
          <p class="person-lineage">
            Putra {{ groom.title }} dari<br/>
            {{ groom.father }} &amp; {{ groom.mother }}
          </p>
        </div>

        <div class="couple-sep reveal reveal-delay-2">
          <span class="sep-amp">&amp;</span>
        </div>

        <div class="person reveal reveal-delay-3">
          <div class="person-frame">
            <img v-if="bride.photo" :src="bride.photo" :alt="bride.name" />
            <div v-else class="person-placeholder">👰</div>
            <div class="person-badge">Mempelai Wanita</div>
          </div>
          <h3 class="person-name">{{ bride.name }}</h3>
          <p class="person-lineage">
            Putri {{ bride.title }} dari<br/>
            {{ bride.father }} &amp; {{ bride.mother }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ groom: Object, bride: Object })
</script>

<style scoped>
.couple { background: var(--ivory); padding: var(--section-pad); }
.couple-inner { max-width: var(--max-w); margin: 0 auto; }

.couple-grid {
  display: grid;
  grid-template-columns: 1fr 48px 1fr;
  gap: 0 16px;
  align-items: center;
  margin-top: 48px;
}

.person { text-align: center; }

.person-frame {
  width: 148px; height: 192px;
  margin: 0 auto 20px;
  position: relative;
  clip-path: polygon(50% 0%, 96% 14%, 100% 60%, 80% 95%, 20% 95%, 0% 60%, 4% 14%);
  background: var(--ivory-3);
  overflow: hidden;
}
.person-frame img {
  width: 100%; height: 100%; object-fit: cover;
}
.person-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 52px; opacity: .35;
  background: linear-gradient(155deg, var(--ivory-3), var(--parchment));
}
.person-badge {
  position: absolute; bottom: 16px; left: 50%;
  transform: translateX(-50%);
  background: rgba(28,24,20,.55);
  backdrop-filter: blur(6px);
  color: var(--gold-pale); font-size: 9px;
  letter-spacing: .18em; text-transform: uppercase;
  padding: 4px 10px; white-space: nowrap;
  border-radius: 2px;
}

.person-name {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 400;
  color: var(--ink); margin-bottom: 8px;
}
.person-lineage {
  font-size: 12px; color: var(--ink-muted);
  line-height: 1.7;
}

.couple-sep {
  display: flex; align-items: center; justify-content: center;
}
.sep-amp {
  font-family: var(--font-display);
  font-style: italic; font-size: 40px;
  color: var(--sage); line-height: 1;
}

@media (max-width: 500px) {
  .couple-grid { grid-template-columns: 1fr; gap: 32px 0; }
  .couple-sep  { display: none; }
}
</style>
