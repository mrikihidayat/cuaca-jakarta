import { mount } from '@vue/test-utils'
// Import diperbarui ke komponen Weather
import Weather from '@/views/Weather.vue' 
import { describe, expect, test } from 'vitest'

describe('Weather.vue', () => { // Diperbarui
  test('renders the new app title and loading state', () => {
    // Mounting komponen baru
    const wrapper = mount(Weather) // Diperbarui
    
    // Uji tampilan judul baru dari komponen yang telah direvisi
    expect(wrapper.text()).toContain('Prakiraan Cuaca Jakarta') // Judul baru

    // Uji status loading awal
    expect(wrapper.text()).toContain('Memuat data cuaca...') 
  })
})