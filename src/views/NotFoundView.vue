<template>
  <div class="notfound">
    <div class="notfound-inner">
      <div class="notfound-icon">✦</div>
      <h1>Undangan Tidak Ditemukan</h1>
      <p>Link undangan ini tidak tersedia atau sudah tidak aktif.</p>
      <p class="notfound-url">{{ currentUrl }}</p>
    </div>
  </div>
</template>

<script setup>
const currentUrl = window.location.pathname
</script>

<style scoped>
.notfound {
  min-height: 100vh;
  background: var(--ink);
  display: flex; align-items: center; justify-content: center;
  padding: 24px; text-align: center;
}
.notfound-inner { max-width: 400px; }
.notfound-icon {
  font-size: 40px; color: var(--gold);
  display: block; margin-bottom: 24px; opacity: .4;
}
h1 {
  font-family: var(--font-display);
  font-size: 26px; font-weight: 400;
  color: var(--ivory); margin-bottom: 12px;
}
p {
  font-size: 14px; color: var(--ink-muted);
  line-height: 1.7;
}
.notfound-url {
  margin-top: 16px;
  font-family: monospace; font-size: 12px;
  color: rgba(255,255,255,.2);
  background: rgba(255,255,255,.05);
  padding: 8px 16px; border-radius: 6px;
  display: inline-block;
}
</style>
