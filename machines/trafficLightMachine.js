import { createMachine } from 'xstate';

// Traffic light state machine
export const trafficLightMachine = createMachine({
  id: 'trafficLight',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: 'yellow'
      },
      after: {
        3000: 'yellow'
      }
    },
    yellow: {
      on: {
        TIMER: 'red'
      },
      after: {
        1000: 'red'
      }
    },
    red: {
      on: {
        TIMER: 'green'
      },
      after: {
        4000: 'green'
      }
    }
  }
});
