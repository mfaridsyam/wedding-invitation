<template>
  <section class="wishes">
    <div class="wishes-inner">
      <span class="eyebrow reveal">Doa &amp; Ucapan</span>
      <h2 class="display-title reveal reveal-delay-1">Kirimkan <em>Doamu</em></h2>

      <form @submit.prevent="submit" class="wish-form reveal reveal-delay-2">
        <div class="field-row">
          <div class="field">
            <label>Nama Lengkap</label>
            <input v-model="form.name" type="text" placeholder="Nama kamu" required />
          </div>
          <div class="field">
            <label>Kehadiran</label>
            <select v-model="form.attend">
              <option value="hadir">✓ Insya Allah Hadir</option>
              <option value="tidak">✗ Tidak Bisa Hadir</option>
              <option value="ragu">? Belum Pasti</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label>Ucapan &amp; Doa</label>
          <textarea v-model="form.msg" rows="3" placeholder="Tuliskan doa dan ucapan terbaikmu..." required />
        </div>
        <button type="submit" class="send-btn" :disabled="sending">
          <span v-if="!sending">Kirim Ucapan</span>
          <span v-else class="sending-dots"><span/><span/><span/></span>
        </button>
      </form>

      <div class="divider"><span>✦</span></div>

      <div class="wish-list">
        <div v-if="loading" style="display:flex;justify-content:center;padding:40px">
          <div class="loading-dots"><span/><span/><span/></div>
        </div>
        <div v-else-if="wishes.length === 0" class="wish-empty">
          Jadilah yang pertama mengirimkan ucapan 💌
        </div>
        <div v-else class="wish-items">
          <div v-for="w in wishes" :key="String(w.id)" class="wish-card">
            <div class="wish-avatar">{{ initial(w.name) }}</div>
            <div class="wish-body">
              <div class="wish-head">
                <span class="wish-name">{{ w.name }}</span>
                <span class="wish-attend" :class="w.attend">{{ attendLabel(w.attend) }}</span>
              </div>
              <p class="wish-text">{{ w.msg }}</p>
              <span class="wish-time">{{ timeAgo(w.ts) }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { db } from '../firebase.js'
import {
  ref as dbRef, push, onValue,
  serverTimestamp, query, orderByChild, limitToLast,
} from 'firebase/database'

const props = defineProps({
  slug: { type: String, default: 'general' },
})

const form    = ref({ name: '', attend: 'hadir', msg: '' })
const wishes  = ref([])
const loading = ref(true)
const sending = ref(false)

const wishPath    = computed(() => `weddings/${props.slug}/wishes`)
const labels      = { hadir: '✓ Hadir', tidak: '✗ Tidak Hadir', ragu: '? Belum Pasti' }
const attendLabel = v => labels[v] || v
const initial     = name => name?.charAt(0).toUpperCase() || '?'

let unsub = null

onMounted(() => {
  const q = query(dbRef(db, wishPath.value), orderByChild('ts'), limitToLast(50))
  unsub = onValue(
    q,
    snap => {
      loading.value = false
      if (!snap.exists()) {
        wishes.value = []
        return
      }
      const arr = []
      snap.forEach(child => {
        arr.unshift({
          id:     String(child.key),
          name:   child.val().name   || '',
          attend: child.val().attend || 'hadir',
          msg:    child.val().msg    || '',
          ts:     child.val().ts     || Date.now(),
        })
      })
      wishes.value = [...arr]
    },
    err => {
      console.error('Firebase wishes error:', err)
      loading.value = false
      wishes.value = [
        { id: '1', name: 'Budi Hartono',   attend: 'hadir', msg: 'Semoga menjadi keluarga yang sakinah, mawaddah, warahmah!', ts: Date.now() - 3600000 },
        { id: '2', name: 'Siti Nurhaliza', attend: 'hadir', msg: "Barakallahu lakuma wa baraka alaikuma. Aamiin 🤲",            ts: Date.now() - 7200000 },
      ]
    }
  )
})

onUnmounted(() => { if (unsub) unsub() })

async function submit() {
  if (!form.value.name.trim() || !form.value.msg.trim()) return
  sending.value = true
  try {
    await push(dbRef(db, wishPath.value), {
      name:   form.value.name.trim(),
      attend: form.value.attend,
      msg:    form.value.msg.trim(),
      ts:     serverTimestamp(),
    })
    form.value = { name: '', attend: 'hadir', msg: '' }
  } catch (e) {
    console.error('Submit error:', e)
    wishes.value = [
      { id: Date.now().toString(), name: form.value.name.trim(), attend: form.value.attend, msg: form.value.msg.trim(), ts: Date.now() },
      ...wishes.value,
    ]
    form.value = { name: '', attend: 'hadir', msg: '' }
  } finally {
    sending.value = false
  }
}

function timeAgo(ts) {
  if (!ts) return ''
  const diff  = Date.now() - ts
  const secs  = Math.floor(diff / 1000)
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (secs  < 60) return `${secs} detik lalu`
  if (mins  < 60) return `${mins} menit lalu`
  if (hours < 24) return `${hours} jam lalu`
  return `${days} hari lalu`
}
</script>

<style scoped>
.wishes { background: var(--ivory); padding: var(--section-pad); }
.wishes-inner { max-width: var(--max-w); margin: 0 auto; }

.wish-form { margin-top: 40px; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
@media (max-width: 480px) { .field-row { grid-template-columns: 1fr; } }

.field { display: flex; flex-direction: column; gap: 7px; }
.field label {
  font-size: 10px; font-weight: 500;
  letter-spacing: .22em; text-transform: uppercase; color: var(--ink-muted);
}
.field input, .field textarea, .field select {
  background: var(--ivory-2); border: 1px solid var(--ivory-3);
  color: var(--ink); font-family: var(--font-body); font-size: 14px;
  padding: 12px 14px; border-radius: 6px; outline: none;
  transition: border-color .2s; -webkit-appearance: none;
}
.field input:focus, .field textarea:focus, .field select:focus {
  border-color: var(--gold-light); background: var(--ivory);
}
.field textarea { resize: vertical; margin-bottom: 16px; }

.send-btn {
  width: 100%; padding: 14px;
  background: var(--ink); color: var(--gold-light);
  border: none; border-radius: 6px;
  font-family: var(--font-body); font-size: 12px;
  font-weight: 500; letter-spacing: .2em; text-transform: uppercase;
  cursor: pointer; transition: background .25s, opacity .2s;
}
.send-btn:hover:not(:disabled) { background: var(--ink-2); }
.send-btn:disabled { opacity: .5; cursor: not-allowed; }

.sending-dots { display: inline-flex; gap: 4px; align-items: center; height: 16px; }
.sending-dots span {
  display: block; width: 5px; height: 5px; border-radius: 50%;
  background: var(--gold-light); animation: dot-b .7s ease-in-out infinite;
}
.sending-dots span:nth-child(2) { animation-delay: .15s; }
.sending-dots span:nth-child(3) { animation-delay: .3s; }
@keyframes dot-b { 0%,80%,100%{transform:scale(1)} 40%{transform:scale(1.5)} }

.loading-dots { display: flex; gap: 6px; }
.loading-dots span {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--parchment); animation: dot-b .7s ease-in-out infinite;
}
.loading-dots span:nth-child(2) { animation-delay: .15s; }
.loading-dots span:nth-child(3) { animation-delay: .3s; }

.wish-empty {
  text-align: center; color: var(--ink-muted);
  font-size: 14px; padding: 40px 0; font-style: italic;
}
.wish-items { display: flex; flex-direction: column; gap: 16px; }
.wish-card {
  display: flex; gap: 14px; padding: 20px;
  background: var(--ivory-2); border-radius: 8px;
  border: 1px solid var(--ivory-3);
}
.wish-avatar {
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--parchment); color: var(--gold-dark);
  font-family: var(--font-display); font-size: 16px; font-weight: 500;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.wish-body { flex: 1; min-width: 0; }
.wish-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
.wish-name { font-size: 14px; font-weight: 500; color: var(--ink); }
.wish-attend {
  font-size: 9px; letter-spacing: .16em; text-transform: uppercase;
  padding: 2px 8px; border-radius: 20px;
}
.wish-attend.hadir { background: var(--sage-pale); color: var(--sage); }
.wish-attend.tidak { background: #f5e8e8; color: #a07070; }
.wish-attend.ragu  { background: var(--ivory-3); color: var(--ink-muted); }
.wish-text  { font-size: 14px; color: var(--ink-soft); line-height: 1.65; margin-bottom: 8px; }
.wish-time  { font-size: 11px; color: var(--ink-muted); }

.divider {
  display: flex; align-items: center; gap: 16px;
  margin: 32px 0; color: var(--gold-light); font-size: 10px;
}
.divider::before, .divider::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, var(--parchment), transparent);
}
</style>