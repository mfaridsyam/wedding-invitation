<template>
  <section class="events">
    <div class="events-bg-ornament">
      <svg viewBox="0 0 400 400" fill="none" opacity=".04">
        <circle cx="200" cy="200" r="180" stroke="#B8965A" stroke-width=".8"/>
        <circle cx="200" cy="200" r="140" stroke="#B8965A" stroke-width=".5"/>
        <circle cx="200" cy="200" r="100" stroke="#B8965A" stroke-width=".3"/>
        <path d="M200 20 L200 380 M20 200 L380 200" stroke="#B8965A" stroke-width=".4"/>
        <path d="M73 73 L327 327 M327 73 L73 327" stroke="#B8965A" stroke-width=".3"/>
      </svg>
    </div>

    <div class="events-inner">
      <div class="section-label reveal">
        <div class="label-line" /><span>Rangkaian Acara</span><div class="label-line" />
      </div>
      <h2 class="display-title reveal reveal-delay-1" style="color:var(--ivory)">
        Hadir &amp; <em>Doakan Kami</em>
      </h2>

      <div class="event-list">
        <div
          v-for="(ev, i) in events" :key="i"
          class="event-card reveal"
          :class="`reveal-delay-${i + 2}`"
        >
          <div class="event-left">
            <div class="event-index-wrap">
              <span class="event-index">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <div v-if="i < events.length - 1" class="event-vline" />
          </div>

          <div class="event-content">
            <div class="event-dot" />
            <div class="event-body">
              <p class="event-type">{{ ev.type }}</p>
              <h3 class="event-name">{{ ev.name }}</h3>

              <div class="event-divider">
                <svg viewBox="0 0 20 4" width="40" height="4" fill="none">
                  <path d="M0 2h8M12 2h8" stroke="#B8965A" stroke-width=".8" opacity=".5"/>
                  <circle cx="10" cy="2" r="1.5" fill="#B8965A" opacity=".6"/>
                </svg>
              </div>

              <div class="event-meta">
                <div class="meta-row">
                  <div class="meta-icon-wrap">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <rect x="1" y="2" width="11" height="10" rx="1.5" stroke="currentColor" stroke-width="1"/>
                      <path d="M4 1v2M9 1v2M1 5h11" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <span>{{ ev.date }} · {{ ev.time }}</span>
                </div>
                <div class="meta-row">
                  <div class="meta-icon-wrap">
                    <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                      <path d="M5.5 1C3.015 1 1 3.015 1 5.5 1 8.985 5.5 12 5.5 12S10 8.985 10 5.5C10 3.015 7.985 1 5.5 1Z" stroke="currentColor" stroke-width="1"/>
                      <circle cx="5.5" cy="5.5" r="1.5" stroke="currentColor" stroke-width="1"/>
                    </svg>
                  </div>
                  <div>
                    <strong>{{ ev.venue }}</strong>
                    <span class="meta-address">{{ ev.address }}</span>
                  </div>
                </div>
              </div>

              <a :href="ev.mapsUrl" target="_blank" rel="noopener" class="maps-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L5 7M11 1L7 5M11 1H7M11 1V5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Buka Google Maps</span>
              </a>
            </div>
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
.events {
  background: linear-gradient(160deg, #1a1510 0%, #0e0c09 60%, #1a1510 100%);
  padding: var(--section-pad);
  position: relative;
  overflow: hidden;
}

.events-bg-ornament {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 500px; height: 500px;
  pointer-events: none;
}

.events-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  position: relative; z-index: 1;
}

.section-label {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 12px; justify-content: center;
}
.label-line {
  width: 40px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184,150,90,.4));
}
.label-line:last-child {
  background: linear-gradient(270deg, transparent, rgba(184,150,90,.4));
}
.section-label span {
  font-size: 9px; letter-spacing: .3em; text-transform: uppercase;
  color: rgba(184,150,90,.6); font-family: 'DM Sans', sans-serif;
  white-space: nowrap;
}

.event-list {
  margin-top: 56px;
  display: flex; flex-direction: column;
}

.event-card {
  display: flex; gap: 0;
  position: relative;
}

.event-left {
  display: flex; flex-direction: column;
  align-items: center;
  width: 64px; flex-shrink: 0;
}
.event-index-wrap {
  width: 48px; height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(184,150,90,.25);
  background: rgba(184,150,90,.06);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  position: relative; z-index: 1;
}
.event-index {
  font-family: 'Playfair Display', serif;
  font-size: 16px; font-weight: 400; font-style: italic;
  color: rgba(184,150,90,.8); line-height: 1;
}
.event-vline {
  flex: 1; width: 1px; min-height: 40px;
  background: linear-gradient(180deg, rgba(184,150,90,.2), transparent);
  margin: 8px 0;
}

.event-content {
  flex: 1; padding-bottom: 48px;
  display: flex; gap: 20px;
  padding-left: 4px;
}
.event-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(184,150,90,.5);
  flex-shrink: 0;
  margin-top: 21px;
}
.event-body { flex: 1; }

.event-type {
  font-size: 9px; letter-spacing: .3em; text-transform: uppercase;
  color: rgba(184,150,90,.55);
  margin-bottom: 6px; font-family: 'DM Sans', sans-serif;
}
.event-name {
  font-family: 'Playfair Display', serif;
  font-size: 28px; font-weight: 400;
  color: #f5f0e8; line-height: 1.15;
  margin-bottom: 16px;
}

.event-divider {
  margin-bottom: 18px;
}

.event-meta {
  display: flex; flex-direction: column; gap: 12px;
  margin-bottom: 24px;
}
.meta-row {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 13px; color: rgba(245,240,232,.5);
  line-height: 1.6;
}
.meta-icon-wrap {
  color: rgba(184,150,90,.6);
  flex-shrink: 0; padding-top: 2px;
}
.meta-row strong {
  display: block;
  color: rgba(245,240,232,.85);
  font-weight: 500; font-size: 13px;
}
.meta-address {
  display: block;
  font-size: 12px; color: rgba(245,240,232,.4);
  margin-top: 2px;
}

.maps-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 20px;
  border: 1px solid rgba(184,150,90,.25);
  color: rgba(184,150,90,.75);
  font-family: 'DM Sans', sans-serif;
  font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
  text-decoration: none; border-radius: 2px;
  background: rgba(184,150,90,.05);
  transition: all .25s;
}
.maps-btn:hover {
  background: rgba(184,150,90,.12);
  border-color: rgba(184,150,90,.45);
  color: rgba(184,150,90,.95);
}

@media (max-width: 480px) {
  .event-left { width: 48px; }
  .event-index-wrap { width: 40px; height: 40px; }
  .event-name { font-size: 24px; }
}
</style>