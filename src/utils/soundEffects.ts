
class SoundEffects {
  private audioContext: AudioContext | null = null;
  private soundEnabled = true;

  constructor() {
    this.initializeAudioContext();
  }

  private initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  private async ensureAudioContext() {
    if (!this.audioContext) {
      this.initializeAudioContext();
    }

    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (error) {
        console.warn('Could not resume audio context:', error);
      }
    }
  }

  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.15) {
    if (!this.audioContext || !this.soundEnabled) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  private playMelody(notes: { frequency: number; duration: number; delay: number }[]) {
    notes.forEach(note => {
      setTimeout(() => this.createTone(note.frequency, note.duration, 'sine', 0.12), note.delay);
    });
  }

  async blockClick() {
    await this.ensureAudioContext();
    // Sweet, gentle click sound
    this.createTone(880, 0.08, 'sine', 0.08);
  }

  async blockPlace() {
    await this.ensureAudioContext();
    // Magical placement sound
    const placeSound = [
      { frequency: 523, duration: 0.1, delay: 0 },
      { frequency:659, duration: 0.12, delay: 50 }
    ];
    this.playMelody(placeSound);
  }

  async blockRemove() {
    await this.ensureAudioContext();
    // Soft removal sound
    this.createTone(440, 0.1, 'sine', 0.06);
  }

  async success() {
    await this.ensureAudioContext();
    // Beautiful success melody
    const successMelody = [
      { frequency: 523, duration: 0.15, delay: 0 },    // C
      { frequency: 659, duration: 0.15, delay: 100 },  // E
      { frequency: 784, duration: 0.15, delay: 200 },  // G
      { frequency: 1047, duration: 0.3, delay: 300 }   // C (octave)
    ];
    this.playMelody(successMelody);
  }

  async error() {
    await this.ensureAudioContext();
    // Gentle error sound (not harsh)
    this.createTone(220, 0.2, 'triangle', 0.06);
  }

  async runCode() {
    await this.ensureAudioContext();
    // Quick, pleasant run sound
    this.createTone(1200, 0.04, 'square', 0.05);
  }

  async levelComplete() {
    await this.ensureAudioContext();
    // Epic level completion fanfare
    const fanfare = [
      { frequency: 523, duration: 0.2, delay: 0 },     // C
      { frequency: 659, duration: 0.2, delay: 120 },   // E
      { frequency: 784, duration: 0.2, delay: 240 },   // G
      { frequency: 1047, duration: 0.25, delay: 360 }, // C (octave)
      { frequency: 1319, duration: 0.25, delay: 500 }, // E (octave)
      { frequency: 1568, duration: 0.4, delay: 650 }   // G (octave)
    ];
    this.playMelody(fanfare);
  }

  async buttonPress() {
    await this.ensureAudioContext();
    // Sweet button press
    this.createTone(1000, 0.06, 'sine', 0.06);
  }

  async hintReveal() {
    await this.ensureAudioContext();
    // Magical hint reveal
    const hintSound = [
      { frequency: 659, duration: 0.12, delay: 0 },
      { frequency: 880, duration: 0.15, delay: 80 }
    ];
    this.playMelody(hintSound);
  }

  async menuOpen() {
    await this.ensureAudioContext();
    this.createTone(880, 0.12, 'sine', 0.07);
  }

  async menuClose() {
    await this.ensureAudioContext();
    this.createTone(660, 0.12, 'sine', 0.07);
  }

  async pageTransition() {
    await this.ensureAudioContext();
    // Smooth transition sound
    this.createTone(1100, 0.1, 'sine', 0.05);
  }

  async notification() {
    await this.ensureAudioContext();
    // Pleasant notification chime
    const chime = [
      { frequency: 880, duration: 0.12, delay: 0 },
      { frequency: 1100, duration: 0.15, delay: 80 }
    ];
    this.playMelody(chime);
  }

  async achievement() {
    await this.ensureAudioContext();
    // Achievement unlock fanfare
    const achievement = [
      { frequency: 523, duration: 0.15, delay: 0 },
      { frequency: 659, duration: 0.15, delay: 100 },
      { frequency: 784, duration: 0.15, delay: 200 },
      { frequency: 1047, duration: 0.2, delay: 300 },
      { frequency: 1319, duration: 0.25, delay: 450 }
    ];
    this.playMelody(achievement);
  }

  async cardFlip() {
    await this.ensureAudioContext();
    this.createTone(800, 0.06, 'sine', 0.05);
  }

  async swipe() {
    await this.ensureAudioContext();
    this.createTone(600, 0.05, 'sine', 0.04);
  }

  async purchaseSuccess() {
    await this.ensureAudioContext();
    // Premium purchase celebration
    const celebration = [
      { frequency: 523, duration: 0.12, delay: 0 },
      { frequency: 659, duration: 0.12, delay: 80 },
      { frequency: 784, duration: 0.12, delay: 160 },
      { frequency: 1047, duration: 0.15, delay: 240 },
      { frequency: 1319, duration: 0.2, delay: 350 }
    ];
    this.playMelody(celebration);
  }

  async paymentProcessing() {
    await this.ensureAudioContext();
    this.createTone(700, 0.08, 'sine', 0.05);
  }

  async subscriptionActivated() {
    await this.ensureAudioContext();
    // Grand subscription celebration
    const fanfare = [
      { frequency: 440, duration: 0.15, delay: 0 },
      { frequency: 523, duration: 0.15, delay: 120 },
      { frequency: 659, duration: 0.15, delay: 240 },
      { frequency: 784, duration: 0.15, delay: 360 },
      { frequency: 880, duration: 0.2, delay: 480 },
      { frequency: 1047, duration: 0.25, delay: 620 }
    ];
    this.playMelody(fanfare);
  }

  async hintPurchased() {
    await this.ensureAudioContext();
    // Light, pleasant hint purchase sound
    const hintPurchase = [
      { frequency: 784, duration: 0.08, delay: 0 },
      { frequency: 988, duration: 0.08, delay: 60 },
      { frequency: 1175, duration: 0.12, delay: 120 }
    ];
    this.playMelody(hintPurchase);
  }

  async levelUnlock() {
    await this.ensureAudioContext();
    // Exciting level unlock
    const unlock = [
      { frequency: 659, duration: 0.08, delay: 0 },
      { frequency: 784, duration: 0.08, delay: 70 },
      { frequency: 988, duration: 0.12, delay: 140 }
    ];
    this.playMelody(unlock);
  }

  async loading() {
    await this.ensureAudioContext();
    this.createTone(500, 0.08, 'sine', 0.04);
  }

  async streakBonus() {
    await this.ensureAudioContext();
    // Exciting streak bonus
    const streak = [
      { frequency: 523, duration: 0.08, delay: 0 },
      { frequency: 659, duration: 0.08, delay: 60 },
      { frequency: 784, duration: 0.08, delay: 120 },
      { frequency: 1047, duration: 0.15, delay: 180 }
    ];
    this.playMelody(streak);
  }

  isSoundEnabled() {
    return true;
  }
}

export const soundEffects = new SoundEffects();
