import { createMachine, assign } from 'xstate';

// Simple toggle machine
export const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  context: {
    count: 0
  },
  states: {
    inactive: {
      on: {
        TOGGLE: {
          target: 'active',
          actions: assign({
            count: (context) => context.count + 1
          })
        }
      }
    },
    active: {
      on: {
        TOGGLE: {
          target: 'inactive',
          actions: assign({
            count: (context) => context.count + 1
          })
        }
      }
    }
  }
});
