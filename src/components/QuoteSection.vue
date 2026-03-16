<template>
  <section class="quote-section">
    <div class="quote-inner reveal">
      <svg class="quote-mark" viewBox="0 0 40 32" fill="none">
        <path d="M0 32V20C0 13.3 2 8 6 4 10 0 15.3-1 22 1L20 7C16 5.7 13 6.3 11 9 9 11.7 8 15 8 19H16V32H0ZM24 32V20C24 13.3 26 8 30 4 34 0 39.3-1 46 1L44 7C40 5.7 37 6.3 35 9 33 11.7 32 15 32 19H40V32H24Z" fill="#B8965A" opacity=".15"/>
      </svg>
      <p class="quote-text">
        Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan
        untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
        dan Dia menjadikan di antaramu rasa kasih dan sayang.
      </p>
      <p class="quote-source">— QS. Ar-Rum : 21</p>
    </div>
  </section>
</template>

<style scoped>
.quote-section {
  background: var(--ivory-2);
  padding: 88px 40px;
}
.quote-inner {
  max-width: 560px; margin: 0 auto;
  text-align: center; position: relative;
}
.quote-mark {
  width: 40px; margin: 0 auto 24px; display: block;
}
.quote-text {
  font-family: var(--font-display);
  font-style: italic; font-size: clamp(17px, 3.2vw, 22px);
  color: var(--ink-soft); line-height: 1.8;
  margin-bottom: 24px;
}
.quote-source {
  font-size: 11px; letter-spacing: .22em;
  text-transform: uppercase; color: var(--gold);
}
</style>
