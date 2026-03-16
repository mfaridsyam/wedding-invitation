<template>
  <section class="events">
    <div class="events-inner">
      <span class="eyebrow reveal">Rangkaian Acara</span>
      <h2 class="display-title reveal reveal-delay-1">Hadir &amp; <em>Doakan Kami</em></h2>

      <div class="event-list">
        <div
          v-for="(ev, i) in events" :key="i"
          class="event-card reveal"
          :class="`reveal-delay-${i + 1}`"
        >
          <div class="event-index">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="event-body">
            <p class="event-type">{{ ev.type }}</p>
            <h3 class="event-name">{{ ev.name }}</h3>
            <div class="event-meta">
              <div class="meta-row">
                <span class="meta-icon">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="2" width="11" height="10" rx="1.5" stroke="currentColor" stroke-width="1"/><path d="M4 1v2M9 1v2M1 5h11" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
                </span>
                <span>{{ ev.date }} · {{ ev.time }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-icon">
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="none"><path d="M5.5 1C3.015 1 1 3.015 1 5.5 1 8.985 5.5 12 5.5 12S10 8.985 10 5.5C10 3.015 7.985 1 5.5 1Z" stroke="currentColor" stroke-width="1"/><circle cx="5.5" cy="5.5" r="1.5" stroke="currentColor" stroke-width="1"/></svg>
                </span>
                <span><strong>{{ ev.venue }}</strong><br>{{ ev.address }}</span>
              </div>
            </div>
            <a :href="ev.mapsUrl" target="_blank" rel="noopener" class="maps-link">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L5 7M11 1L7 5M11 1H7M11 1V5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Buka Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ events: Array })
</script>

<style scoped>
.events { background: var(--ivory-2); padding: var(--section-pad); }
.events-inner { max-width: var(--max-w); margin: 0 auto; }

.event-list { display: grid; gap: 20px; margin-top: 48px; }

.event-card {
  display: flex; gap: 24px;
  background: var(--ivory);
  border: 1px solid var(--ivory-3);
  padding: 28px 28px;
  border-radius: 4px;
  transition: border-color .2s, box-shadow .2s;
}
.event-card:hover {
  border-color: var(--parchment);
  box-shadow: 0 4px 24px rgba(28,24,20,.05);
}

.event-index {
  font-family: var(--font-display);
  font-size: 40px; font-weight: 400; font-style: italic;
  color: var(--parchment); line-height: 1;
  flex-shrink: 0; padding-top: 4px;
  user-select: none;
}

.event-body { flex: 1; }

.event-type {
  font-size: 9px; letter-spacing: .3em;
  text-transform: uppercase; color: var(--gold);
  margin-bottom: 6px;
}
.event-name {
  font-family: var(--font-display);
  font-size: 26px; font-weight: 400;
  color: var(--ink); margin-bottom: 18px; line-height: 1.1;
}

.event-meta { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.meta-row {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 13px; color: var(--ink-soft); line-height: 1.5;
}
.meta-icon { color: var(--gold); flex-shrink: 0; padding-top: 2px; }
.meta-row strong { color: var(--ink); font-weight: 500; display: block; }

.maps-link {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11px; letter-spacing: .14em;
  text-transform: uppercase; color: var(--sage);
  text-decoration: none; border-bottom: 1px solid var(--sage-light);
  padding-bottom: 2px;
  transition: color .2s, border-color .2s;
}
.maps-link:hover { color: var(--gold); border-color: var(--gold-light); }
</style>
