import { createMachine, assign } from 'xstate';

// Fetch machine for API calls
export const fetchMachine = createMachine({
  id: 'fetch',
  initial: 'idle',
  context: {
    data: null,
    error: null
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading'
      }
    },
    loading: {
      invoke: {
        src: 'fetchData',
        onDone: {
          target: 'success',
          actions: assign({
            data: (_, event) => event.data
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: (_, event) => event.data
          })
        }
      },
      on: {
        CANCEL: 'idle'
      }
    },
    success: {
      on: {
        FETCH: 'loading',
        RESET: {
          target: 'idle',
          actions: assign({
            data: null,
            error: null
          })
        }
      }
    },
    failure: {
      on: {
        FETCH: 'loading',
        RESET: {
          target: 'idle',
          actions: assign({
            data: null,
            error: null
          })
        }
      }
    }
  }
});
