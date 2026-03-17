<template>
  <footer class="footer">
    <div class="footer-inner">
      <svg class="footer-botanical" viewBox="0 0 320 120" fill="none">
        <path d="M160 110 C160 110 160 80 160 60" stroke="#B8965A" stroke-width=".8" opacity=".35"/>
        <path d="M160 85 C140 75 120 72 105 62" stroke="#B8965A" stroke-width=".6" opacity=".3"/>
        <path d="M160 75 C180 63 195 58 212 50" stroke="#B8965A" stroke-width=".6" opacity=".3"/>
        <path d="M160 95 C135 88 115 82 98 72" stroke="#B8965A" stroke-width=".5" opacity=".25"/>
        <path d="M160 95 C185 88 205 82 222 72" stroke="#B8965A" stroke-width=".5" opacity=".25"/>
        <ellipse cx="103" cy="60" rx="14" ry="8" fill="#B8965A" opacity=".1" transform="rotate(-30 103 60)"/>
        <ellipse cx="213" cy="49" rx="14" ry="8" fill="#B8965A" opacity=".1" transform="rotate(25 213 49)"/>
        <ellipse cx="96"  cy="70" rx="11" ry="6" fill="#B8965A" opacity=".08" transform="rotate(-40 96 70)"/>
        <ellipse cx="223" cy="70" rx="11" ry="6" fill="#B8965A" opacity=".08" transform="rotate(35 223 70)"/>
      </svg>

      <p class="footer-eyebrow">The Wedding of</p>

      <h2 class="footer-names">
        <span>{{ groom.shortName }}</span>
        <span class="footer-amp">&amp;</span>
        <span>{{ bride.shortName }}</span>
      </h2>

      <div class="footer-ornament">
        <span class="line" /><span class="diamond">◆</span><span class="line" />
      </div>

      <p class="footer-date">{{ date }}</p>

      <p class="footer-closing">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami<br />
         apabila Bapak / Ibu / Saudara/i berkenan hadir<br />
         dan memberikan doa restu kepada kami.
      </p>

      <p class="footer-salam">
        Wassalamu'alaikum Warahmatullahi Wabarakatuh
      </p>

      <p class="footer-credit">
        &copy; 2026 Janji Suci &bull; Developed by 
        <a href="https://mfaridsyam.vercel.app" target="_blank" rel="noopener">MFaridS</a>
      </p>
    </div>
  </footer>
</template>

<script setup>
defineProps({ groom: Object, bride: Object, date: String })
</script>

<style scoped>
.footer {
  background: var(--ink);
  padding: 80px 24px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 50% at 50% 100%, rgba(184,150,90,.06) 0%, transparent 70%);
  pointer-events: none;
}

.footer-inner { position: relative; z-index: 1; max-width: 480px; margin: 0 auto; }

.footer-botanical {
  width: 320px; display: block; margin: 0 auto 32px;
  opacity: .8;
}

.footer-eyebrow {
  font-family: var(--font-display);
  font-style: italic; font-size: 14px;
  color: var(--gold-light); opacity: .6;
  letter-spacing: .08em; margin-bottom: 16px;
}

.footer-names {
  font-family: var(--font-display);
  font-size: clamp(44px, 11vw, 80px);
  font-weight: 400; line-height: .95;
  color: var(--ivory);
  display: flex; flex-direction: column; align-items: center; gap: 2px;
}
.footer-names span { display: block; font-style: italic; }
.footer-amp {
  font-size: .38em !important;
  font-style: normal !important;
  color: var(--gold) !important;
  line-height: 1.6 !important;
}

.footer-ornament {
  display: flex; align-items: center; gap: 14px;
  margin: 24px auto; max-width: 220px;
}
.footer-ornament .line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184,150,90,.3), transparent);
}
.footer-ornament .diamond { font-size: 6px; color: var(--gold); opacity: .5; }

.footer-date {
  font-size: 11px; letter-spacing: .28em;
  text-transform: uppercase; color: var(--ink-muted);
  margin-bottom: 32px;
}

.footer-closing {
  font-size: 13px; color: rgba(250,247,242,.3);
  line-height: 1.9; margin-bottom: 24px;
}

.footer-salam {
  font-family: var(--font-display);
  font-style: italic; font-size: 15px;
  color: rgba(184,150,90,.5);
  margin-bottom: 48px;
}

.footer-credit {
  font-size: 10px;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: rgba(250,247,242,.12);
}

.footer-credit a {
  color: rgba(184,150,90,.6);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.footer-credit a:hover {
  color: var(--gold-light);
  opacity: 1;
}
</style>