// Represents  simple keyboard states. Makes it possible for custom input managers to easily handle events like press, down, up
// The main reason to abstract this, is because keypress does not work the same in all devices. It is obsolete

// TODO: This change depending on the browser and on the OS. Modify this accordingly.
// This codes are consistent between chrome, firefox and windows, mac devices
// The code is insensitive to keyboard distributions
// Also, for no particular reason, shift keys, at least in mac, are registered as key presses instead of key downs
const AD_KEY = {
  A: 'KeyA',
  B: 'KeyB',
  C: 'KeyC',
  D: 'KeyD',
  E: 'KeyE',
  F: 'KeyF',
  G: 'KeyG',
  H: 'KeyH',
  I: 'KeyI',
  J: 'KeyJ',
  K: 'KeyK',
  L: 'KeyL',
  M: 'KeyM',
  N: 'KeyN',
  O: 'KeyO',
  P: 'KeyP',
  Q: 'KeyQ',
  R: 'KeyR',
  S: 'KeyS',
  T: 'KeyT',
  U: 'KeyU',
  V: 'KeyV',
  W: 'KeyW',
  X: 'KeyX',
  Y: 'KeyY',
  Z: 'KeyZ',
  SPACE: 'Space',
  ENTER: 'Enter',
  DIGIT_0: 'Digit0',
  DIGIT_1: 'Digit1',
  DIGIT_2: 'Digit2',
  DIGIT_3: 'Digit3',
  DIGIT_4: 'Digit4',
  DIGIT_5: 'Digit5',
  DIGIT_6: 'Digit6',
  DIGIT_7: 'Digit7',
  DIGIT_8: 'Digit8',
  DIGIT_9: 'Digit9',
  ARROW_UP: 'ArrowUp',
  ARROW_LEFT: 'ArrowLeft',
  AROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
};

class ADKeyboardState {

  static instance = null;
  static getInstance() {
    if (ADKeyboardState.instance == null) {
      ADKeyboardState.instance = new ADKeyboardState();
    }

    return ADKeyboardState.instance;
  }

  constructor() {
    this.keys = new Map();
  }

  init() {
    document.addEventListener('keydown', (event) => { // This is not very well implemented, btw...
      this.keys.set(event.code, true);
    });
    document.addEventListener('keyup', (event) => {
      this.keys.delete(event.code);
    });
  }

}