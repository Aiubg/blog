interface SoundConfig {
  basePath: string
  mobileEnabled: boolean
  click: { enabled: boolean, volume: number }
  typing: { enabled: boolean, volume: number }
}

type SoundType = 'click' | 'typing'

export function setupSound(config: SoundConfig) {
  let context: AudioContext | undefined
  const buffers = new Map<SoundType, Promise<AudioBuffer[]>>()
  const desktop = matchMedia('(min-width: 1024px)')
  const filenames = { click: 'tap', typing: 'type' } as const
  const typingSelector = '.el-input__inner, .el-textarea__inner, .tk-input, .tk-textarea, #wl-nick, #wl-mail, #wl-link, #wl-edit'

  function loadBuffers(type: SoundType, audio: AudioContext) {
    let loading = buffers.get(type)
    if (!loading) {
      loading = Promise.all(Array.from({ length: 5 }, async (_, index) => {
        const response = await fetch(`${config.basePath}/${filenames[type]}_0${index + 1}.wav`)
        if (!response.ok) {
          throw new Error(`Sound request failed: ${response.status} ${response.url}`)
        }
        return audio.decodeAudioData(await response.arrayBuffer())
      }))
      buffers.set(type, loading)
    }
    return loading
  }

  async function play(type: SoundType) {
    if (!config[type].enabled || (!desktop.matches && !config.mobileEnabled)) {
      return
    }

    // Resume during the user gesture; download only the sound type being used.
    const audio = context ??= new AudioContext()
    await audio.resume()
    const samples = await loadBuffers(type, audio)
    const source = audio.createBufferSource()
    const gain = audio.createGain()
    source.buffer = samples[Math.floor(Math.random() * samples.length)]
    gain.gain.value = config[type].volume
    source.connect(gain).connect(audio.destination)
    source.onended = () => {
      source.disconnect()
      gain.disconnect()
    }
    source.start()
  }

  document.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('#language-switcher, #theme-toggle-button')) {
      play('click').catch(error => console.error('[Sound]', error))
    }
  })
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey || event.isComposing) {
      return
    }
    if (event.key.length !== 1 && event.key !== 'Backspace' && event.key !== 'Enter' && event.key !== 'Delete') {
      return
    }
    if (event.target instanceof Element && event.target.matches(typingSelector)) {
      play('typing').catch(error => console.error('[Sound]', error))
    }
  })
}
