<template>
  <section class="hero">
    <div class="hero-border"></div>

    <div class="hero-inner">
      <p class="hero-bismillah reveal">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
      <p class="eyebrow reveal reveal-delay-1">Dengan memohon ridho Allah SWT</p>

      <h1 class="hero-names reveal reveal-delay-2">
        <span class="name-groom">{{ groom.shortName }}</span>
        <span class="name-amp">&amp;</span>
        <span class="name-bride">{{ bride.shortName }}</span>
      </h1>

      <div class="hero-ornament reveal reveal-delay-3">
        <span class="line" /><span class="diamond">◆</span><span class="line" />
      </div>

      <p class="hero-date reveal reveal-delay-4">{{ date }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({ groom: Object, bride: Object, date: String })
</script>

<style scoped>
.hero {
  min-height: 100svh;
  background: var(--ivory);
  display: flex; align-items: center; justify-content: center;
  padding: 60px 24px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 15% 85%, rgba(107,140,120,.1) 0%, transparent 50%),
    radial-gradient(circle at 85% 15%, rgba(184,150,90,.08) 0%, transparent 50%);
  pointer-events: none;
}

.hero-border {
  position: absolute;
  inset: 24px;
  border: 1px solid rgba(184,150,90, 0.15);
  pointer-events: none;
  z-index: 0;
}

.hero-inner {
  text-align: center; position: relative; z-index: 1;
  max-width: 600px;
  width: 100%;
}

.hero-bismillah {
  font-family: var(--font-display);
  font-size: 28px; color: var(--gold-dark);
  margin-bottom: 12px; /* Jarak rapat yang rapi */
  letter-spacing: .04em;
}

.eyebrow {
  font-size: 9px;
  letter-spacing: .3em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 24px;
}

.hero-names {
  font-family: var(--font-display);
  /* Font diperbesar agar "WAH" */
  font-size: clamp(68px, 16vw, 120px);
  font-weight: 400; 
  line-height: 0.8; /* Rapat & estetik */
  color: var(--ink); 
  margin: 0;
  display: flex; flex-direction: column; align-items: center;
}

.name-groom, .name-bride {
  display: block; font-style: italic;
}

.name-amp {
  display: block;
  font-size: .32em; /* Ukuran asli & dikembalikan */
  font-style: normal;
  color: var(--sage); 
  line-height: 1.4;
  letter-spacing: .05em;
  margin: 8px 0;
}

.hero-ornament {
  display: flex; align-items: center; gap: 14px;
  margin: 32px auto 24px; 
  max-width: 280px;
  color: var(--gold-light); font-size: 8px;
}

.hero-ornament .line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184,150,90, 0.4), transparent);
}

.hero-ornament .diamond { color: var(--gold); font-size: 7px; }

.hero-date {
  font-size: 12px; letter-spacing: .25em;
  text-transform: uppercase; color: var(--ink-muted);
}

/* Pastikan class reveal tetap bekerja jika didefinisikan secara global, 
   atau tambahkan transisi di sini jika diperlukan */
</style>