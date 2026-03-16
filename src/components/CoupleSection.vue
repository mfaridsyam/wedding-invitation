<template>
  <section class="couple">
    <div class="couple-inner">
      <div class="section-label reveal">
        <div class="label-line" />
        <span>Mempelai</span>
        <div class="label-line" />
      </div>
      <h2 class="display-title reveal reveal-delay-1">Dua Insan, <em>Satu Hati</em></h2>

      <div class="couple-grid">
        <div class="person reveal reveal-delay-1">
          <div class="person-photo-wrap">
            <div class="photo-ring" />
            <div class="photo-ring ring-2" />
            <div class="person-photo">
              <img v-if="groom.photo" :src="groom.photo" :alt="groom.name" />
              <div v-else class="person-placeholder">
                <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
                  <circle cx="24" cy="18" r="9" stroke="rgba(184,150,90,.4)" stroke-width="1.2"/>
                  <path d="M6 42c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="rgba(184,150,90,.4)" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
            <div class="person-role">Mempelai Pria</div>
          </div>
          <div class="person-info">
            <h3 class="person-name">{{ groom.name }}</h3>
            <div class="person-divider">
              <span class="diamond-small">✦</span>
            </div>
            <p class="person-lineage">
              Putra {{ groom.title }} dari<br/>
              <span class="person-parents">{{ groom.father }} &amp; {{ groom.mother }}</span>
            </p>
          </div>
        </div>

        <div class="couple-sep reveal reveal-delay-2">
          <div class="sep-vert-line" />
          <div class="sep-diamond">
            <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
              <path d="M24 4L44 24L24 44L4 24Z" stroke="#B8965A" stroke-width=".8" opacity=".5"/>
              <path d="M24 12L36 24L24 36L12 24Z" fill="#B8965A" opacity=".1"/>
              <text x="24" y="30" text-anchor="middle" font-size="18" font-family="Playfair Display,serif" font-style="italic" fill="#B8965A" opacity=".8">&amp;</text>
            </svg>
          </div>
          <div class="sep-vert-line" />
        </div>

        <div class="person reveal reveal-delay-3">
          <div class="person-photo-wrap">
            <div class="photo-ring" />
            <div class="photo-ring ring-2" />
            <div class="person-photo">
              <img v-if="bride.photo" :src="bride.photo" :alt="bride.name" />
              <div v-else class="person-placeholder">
                <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
                  <circle cx="24" cy="18" r="9" stroke="rgba(184,150,90,.4)" stroke-width="1.2"/>
                  <path d="M6 42c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="rgba(184,150,90,.4)" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
            <div class="person-role">Mempelai Wanita</div>
          </div>
          <div class="person-info">
            <h3 class="person-name">{{ bride.name }}</h3>
            <div class="person-divider">
              <span class="diamond-small">✦</span>
            </div>
            <p class="person-lineage">
              Putri {{ bride.title }} dari<br/>
              <span class="person-parents">{{ bride.father }} &amp; {{ bride.mother }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ groom: Object, bride: Object })
</script>

<style scoped>
.couple {
  background: var(--ivory);
  padding: var(--section-pad);
  position: relative;
  overflow: hidden;
}
.couple::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 60% 40% at 20% 50%, rgba(184,150,90,.04) 0%, transparent 70%),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(184,150,90,.04) 0%, transparent 70%);
  pointer-events: none;
}

.couple-inner { max-width: var(--max-w); margin: 0 auto; }

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

.couple-grid {
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  gap: 0 24px;
  align-items: center;
  margin-top: 56px;
}

.person {
  display: flex; flex-direction: column; align-items: center;
  text-align: center;
}

.person-photo-wrap {
  position: relative;
  margin-bottom: 28px;
  display: flex; align-items: center; justify-content: center;
}
.photo-ring {
  position: absolute;
  width: 184px; height: 184px;
  border-radius: 50%;
  border: 1px solid rgba(184,150,90,.18);
}
.ring-2 {
  width: 200px; height: 200px;
  border-color: rgba(184,150,90,.08);
}
.person-photo {
  width: 164px; height: 164px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(145deg, #e8e0d4, #d4c9b8);
  display: flex; align-items: center; justify-content: center;
  border: 3px solid rgba(184,150,90,.25);
  box-shadow:
    0 8px 32px rgba(28,24,20,.12),
    0 2px 8px rgba(28,24,20,.08),
    inset 0 1px 0 rgba(255,255,255,.6);
  position: relative; z-index: 1;
}
.person-photo img {
  width: 100%; height: 100%; object-fit: cover;
}
.person-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(145deg, rgba(184,150,90,.08), rgba(184,150,90,.04));
}
.person-role {
  position: absolute;
  bottom: -12px; left: 50%; transform: translateX(-50%);
  background: linear-gradient(135deg, #B8965A, #D4AA6A);
  color: #fff;
  font-size: 8px; letter-spacing: .22em; text-transform: uppercase;
  padding: 4px 14px; white-space: nowrap;
  border-radius: 20px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(184,150,90,.35);
  font-family: 'DM Sans', sans-serif;
}

.person-info { margin-top: 8px; }
.person-name {
  font-family: 'Playfair Display', serif;
  font-size: 20px; font-weight: 400;
  color: var(--ink); margin-bottom: 10px;
  line-height: 1.3;
}
.person-divider {
  margin-bottom: 10px;
}
.diamond-small {
  font-size: 10px; color: rgba(184,150,90,.5);
}
.person-lineage {
  font-size: 12px; color: var(--ink-muted);
  line-height: 1.8;
}
.person-parents {
  color: var(--ink-soft); font-size: 11.5px;
}

.couple-sep {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  height: 100%;
  gap: 0;
}
.sep-vert-line {
  flex: 1; width: 1px;
  background: linear-gradient(180deg, transparent, rgba(184,150,90,.2), transparent);
  min-height: 60px;
}
.sep-diamond {
  padding: 8px 0;
}

@media (max-width: 540px) {
  .couple-grid {
    grid-template-columns: 1fr;
    gap: 40px 0;
  }
  .couple-sep {
    flex-direction: row;
    height: auto;
    gap: 12px;
  }
  .sep-vert-line {
    flex: 1; min-height: unset; height: 1px; width: auto;
    min-width: 40px;
    background: linear-gradient(90deg, transparent, rgba(184,150,90,.2), transparent);
  }
}
</style>