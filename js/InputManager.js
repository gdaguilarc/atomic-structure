// This class is in charge of updating the keyboard state
class InputManager {
  static instance = null;
  static getInstance() {
    if (InputManager.instance == null) {
      InputManager.instance = new InputManager();
    }

    return InputManager.instance;
  }

  constructor() {
    // For easier reference
    this.input = Input.getInstance();
  }

  update() {
    // Reset states. Every input is not happening until the next frames
    this.input.keyboardState = 0;
    this.fetchKeysNow();
  }

  // Will be updated after a frame has been executed
  lateUpdate() {
    this.input.previousKeyboardState = this.input.keyboardState;
  }

  fetchKeysNow() {
    const keyboardState = ADKeyboardState.getInstance().keys;

    // This is kinda nasty
    // Check for key, comment on how to do this without much writing
    if (keyboardState.get(AD_KEY.DIGIT_1)) {
      // Turn on the bit that handles the state for that key
      this.input.keyboardState |= InputKeyCodeBitwise.Digit1;
    }
    if (keyboardState.get(AD_KEY.DIGIT_2)) {
      // Turn on the bit that handles the state for that key
      this.input.keyboardState |= InputKeyCodeBitwise.Digit2;
    }
    if (keyboardState.get(AD_KEY.DIGIT_3)) {
      // Turn on the bit that handles the state for that key
      this.input.keyboardState |= InputKeyCodeBitwise.Digit3;
    }
    if (keyboardState.get(AD_KEY.W)) {
      // Turn on the bit that handles the state for that key
      this.input.keyboardState |= InputKeyCodeBitwise.W;
    }
    if (keyboardState.get(AD_KEY.S)) {
      // Turn on the bit that handles the state for that key
      this.input.keyboardState |= InputKeyCodeBitwise.S;
    }
    if (keyboardState.get(AD_KEY.ARROW_UP)) {
      // Turn on the bit that handles the state for that key
      this.input.keyboardState |= InputKeyCodeBitwise.UpArrow;
    }
    if (keyboardState.get(AD_KEY.AROW_DOWN)) {
      // Turn on the bit that handles the state for that key
      this.input.keyboardState |= InputKeyCodeBitwise.DownArrow;
    }
    if (keyboardState.get(AD_KEY.K)) {
      // Turn on the bit that handles the state for that key
      this.input.keyboardState |= InputKeyCodeBitwise.K;
    }
    if (keyboardState.get(AD_KEY.J)) {
      // Turn on the bit that handles the state for that key
      this.input.keyboardState |= InputKeyCodeBitwise.J;
    }
  }

}