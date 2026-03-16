import { ref, computed } from 'vue'
import { db } from '../firebase.js'
import { ref as dbRef, get } from 'firebase/database'

export function useWedding(slug) {
  const raw     = ref(null)
  const loading = ref(true)
  const notFound = ref(false)

  async function fetch() {
    loading.value  = true
    notFound.value = false
    try {
      const snap = await get(dbRef(db, `weddings/${slug}`))
      if (!snap.exists()) { notFound.value = true; return }
      raw.value = snap.val()
    } catch (e) {
      console.error('Failed to load wedding data:', e)
      notFound.value = true
    } finally {
      loading.value = false
    }
  }

  fetch()

  const data = computed(() => {
    const d = raw.value
    if (!d) return null
    return {
      groom: {
        name:      d.groom_name   || '',
        shortName: d.groom_short  || d.groom_name?.split(' ')[0] || '',
        title:     d.groom_title  || '',
        father:    d.groom_father || '',
        mother:    d.groom_mother || '',
        photo:     d.groom_photo  || '',
      },
      bride: {
        name:      d.bride_name   || '',
        shortName: d.bride_short  || d.bride_name?.split(' ')[0] || '',
        title:     d.bride_title  || '',
        father:    d.bride_father || '',
        mother:    d.bride_mother || '',
        photo:     d.bride_photo  || '',
      },

      dateDisplay: d.date_display || '',
      targetDate:  d.date_target  || '',

      events: [
        {
          type:    'Akad Nikah',
          name:    'Ijab Qabul',
          date:    d.date_display    || '',
          time:    d.akad_time       || '',
          venue:   d.akad_venue      || '',
          address: d.akad_address    || '',
          mapsUrl: d.akad_maps       || '#',
        },
        {
          type:    'Resepsi Pernikahan',
          name:    'Walimatul Ursy',
          date:    d.date_display    || '',
          time:    d.resepsi_time    || '',
          venue:   d.resepsi_venue   || '',
          address: d.resepsi_address || '',
          mapsUrl: d.resepsi_maps    || '#',
        },
      ],

      photos: d.photos
        ? Object.values(d.photos).map((src, i) => ({ src, alt: `Foto ${i + 1}` }))
        : Array(6).fill({ src: '', alt: '' }),

      musicUrl: d.music_url || '',

      gifts: d.gifts ? Object.values(d.gifts) : [],
    }
  })

  return { data, loading, notFound }
}
