// For the keys, just three for the moment
const InputKeyCode = {
  Digit1: 0,
  Digit2: 1,
  Digit3: 2,
  W: 3,
  S: 4,
  UpArrow: 5,
  DownArrow: 6,
};

// Up to 32 states, we won't need more buttons in this case
// I mean, its not really that, I think a JS number can hold up to 64
// So yeah, let's leave it at 64
const InputKeyCodeBitwise = {

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

}