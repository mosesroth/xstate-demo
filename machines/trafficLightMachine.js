// Simple traffic light state machine without any complex operations
export const trafficLightMachine = {
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
