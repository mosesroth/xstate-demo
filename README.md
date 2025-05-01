# XState Demo for Amazon Fire Tablet

This is a React Native application that demonstrates state machine concepts inspired by [XState](https://github.com/statelyai/xstate), a library for creating, interpreting, and executing finite state machines and statecharts.

## Features

This app showcases state machine patterns:

1. **Traffic Light**
   - Simple state machine with automatic transitions
   - Timed transitions between states
   - Visual representation of states

2. **Toggle Switch**
   - Basic toggle machine with state tracking
   - Counting state transitions
   - Displaying machine state

## Screenshot

![XState Demo on Amazon Fire Tablet](./screenshot.png)

## Implementation Details

The app demonstrates key concepts of state machines:

- **States**: Clearly defined states that a component can be in
- **Transitions**: Moving between states based on events
- **Actions**: Side effects when transitions occur
- **Automatic Transitions**: Time-based state changes

## State Machine Examples

```javascript
// Simple traffic light state machine
const trafficLightMachine = {
  initial: 'green',
  states: {
    green: {
      next: 'yellow'
    },
    yellow: {
      next: 'red'
    },
    red: {
      next: 'green'
    }
  }
};

// Using the machine in a component
const [currentState, setCurrentState] = useState(trafficLightMachine.initial);

// Transition to next state
const goToNextState = () => {
  if (currentState && trafficLightMachine.states[currentState]) {
    setCurrentState(trafficLightMachine.states[currentState].next);
  }
};
```

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/mosesroth/xstate-demo.git
   cd xstate-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. To run on an Amazon Fire tablet:
   - Generate the bundle:
     ```bash
     npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
     ```
   - Build the APK:
     ```bash
     cd android && ./gradlew assembleDebug
     ```
   - Install on connected device:
     ```bash
     adb install -r app/build/outputs/apk/debug/app-debug.apk
     ```

## License

MIT
