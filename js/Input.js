// For the keys, just three for the moment
const InputKeyCode = {
  Digit1: 0,
  Digit2: 1,
  Digit3: 2,
  W: 3,
  S: 4,
  UpArrow: 5,
  DownArrow: 6,
  K: 7,
  L: 8,
};

// Up to 32 states, we won't need more buttons in this case
// I mean, its not really that, I think a JS number can hold up to 64
// So yeah, let's leave it at 64
// We could represent this as booleans, but a boolean holds 8 bits, and we really only need one! 7 bits are wasted!
const InputKeyCodeBitwise = {
  Digit1: 1 << InputKeyCode.Digit1,       // 0000 0000 0001
  Digit2: 1 << InputKeyCode.Digit2,       // 0000 0000 0010
  Digit3: 1 << InputKeyCode.Digit3,       // 0000 0000 0100
  W: 1 << InputKeyCode.W,                 // 0000 0000 1000
  S: 1 << InputKeyCode.S,                 // 0000 0001 0000
  UpArrow: 1 << InputKeyCode.UpArrow,     // 0000 0010 0000
  DownArrow: 1 << InputKeyCode.DownArrow, // 0000 0100 0000
  K: 1 << InputKeyCode.K,                 // 0000 1000 0000
  L: 1 << InputKeyCode.L,                 // 0001 0000 0000
};

class Input {
  static instance = null;
  static getInstance() {
    if (Input.instance == null) {
      Input.instance = new Input();
    }

    return Input.instance;
  }

  constructor() {
    // Will be represented as a 4 byte int, which can hold up to 32 states
    this.keyboardState = 0;
    this.previousKeyboardState = 0;
  }

  isKeyDown(keyCode) {
    // Do a bit operation to check if that specific bit is turned on
    return this.keyboardState & (1 << InputKeyCodeBitwise[keyCode]);
  }

  // We need to check if that key was not pressed in the previous frame, but clicked only on this one
  // Then it is considered pressed, not down
  // Question: Why is it so hard for the browsers to do this properly for every platform?
  isKeyPressed(keyCode) {
    // Do a bit operation to check if that specific bit is turned on
    return (this.keyboardState & (1 << InputKeyCodeBitwise[keyCode])) && !(this.previousKeyboardState & (1 << InputKeyCodeBitwise[keyCode]));
  }

  // Down on the previous frame, but released in the current frame
  isKeyUp(keyCode) {
    // Do a bit operation to check if that specific bit is turned on
    return !(this.keyboardState & (1 << InputKeyCodeBitwise[keyCode])) && (this.previousKeyboardState & (1 << InputKeyCodeBitwise[keyCode]));
  }

}