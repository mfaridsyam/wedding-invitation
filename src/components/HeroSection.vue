<template>
  <section class="hero">
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
  padding: 80px 24px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 15% 85%, rgba(107,140,120,.07) 0%, transparent 50%),
    radial-gradient(circle at 85% 15%, rgba(184,150,90,.06) 0%, transparent 50%);
  pointer-events: none;
}

.hero-inner {
  text-align: center; position: relative; z-index: 1;
  max-width: 600px;
}

.hero-bismillah {
  font-family: var(--font-display);
  font-size: 24px; color: var(--gold-dark);
  margin-bottom: 20px; letter-spacing: .04em;
}

.hero-names {
  font-family: var(--font-display);
  font-size: clamp(56px, 14vw, 112px);
  font-weight: 400; line-height: .9;
  color: var(--ink); margin: 0;
  display: flex; flex-direction: column; align-items: center; gap: 0;
}
.name-groom, .name-bride {
  display: block; font-style: italic;
}
.name-amp {
  display: block;
  font-size: .32em; font-style: normal;
  color: var(--sage); line-height: 1.8;
  letter-spacing: .05em;
}

.hero-ornament {
  display: flex; align-items: center; gap: 14px;
  margin: 28px auto; max-width: 280px;
  color: var(--gold-light); font-size: 8px;
}
.hero-ornament .line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, var(--parchment), transparent);
}
.hero-ornament .diamond { color: var(--gold); font-size: 7px; }

.hero-date {
  font-size: 12px; letter-spacing: .25em;
  text-transform: uppercase; color: var(--ink-muted);
}
</style>
