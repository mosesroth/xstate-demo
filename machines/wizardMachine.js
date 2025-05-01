import { createMachine, assign } from 'xstate';

// Multi-step wizard machine
export const wizardMachine = createMachine({
  id: 'wizard',
  initial: 'step1',
  context: {
    userData: {
      name: '',
      email: '',
      preferences: {
        notifications: false,
        theme: 'light'
      }
    },
    errors: {}
  },
  states: {
    step1: {
      on: {
        NEXT: [
          {
            target: 'step2',
            cond: (context) => {
              return context.userData.name.trim() !== '' && context.userData.email.trim() !== '';
            }
          },
          {
            // Stay in step1 but update errors
            actions: assign({
              errors: (context) => {
                const errors = {};
                if (!context.userData.name.trim()) {
                  errors.name = 'Name is required';
                }
                if (!context.userData.email.trim()) {
                  errors.email = 'Email is required';
                }
                return errors;
              }
            })
          }
        ],
        UPDATE_NAME: {
          actions: assign({
            userData: (context, event) => ({
              ...context.userData,
              name: event.value
            }),
            errors: (context, event) => {
              const errors = { ...context.errors };
              if (!event.value.trim()) {
                errors.name = 'Name is required';
              } else {
                delete errors.name;
              }
              return errors;
            }
          })
        },
        UPDATE_EMAIL: {
          actions: assign({
            userData: (context, event) => ({
              ...context.userData,
              email: event.value
            }),
            errors: (context, event) => {
              const errors = { ...context.errors };
              if (!event.value.trim()) {
                errors.email = 'Email is required';
              } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.value)) {
                errors.email = 'Invalid email format';
              } else {
                delete errors.email;
              }
              return errors;
            }
          })
        }
      }
    },
    step2: {
      on: {
        PREV: 'step1',
        NEXT: 'step3',
        TOGGLE_NOTIFICATIONS: {
          actions: assign({
            userData: (context) => ({
              ...context.userData,
              preferences: {
                ...context.userData.preferences,
                notifications: !context.userData.preferences.notifications
              }
            })
          })
        },
        SET_THEME: {
          actions: assign({
            userData: (context, event) => ({
              ...context.userData,
              preferences: {
                ...context.userData.preferences,
                theme: event.value
              }
            })
          })
        }
      }
    },
    step3: {
      on: {
        PREV: 'step2',
        SUBMIT: 'submitting'
      }
    },
    submitting: {
      invoke: {
        src: 'submitWizard',
        onDone: 'success',
        onError: 'failure'
      }
    },
    success: {
      on: {
        RESET: {
          target: 'step1',
          actions: assign({
            userData: {
              name: '',
              email: '',
              preferences: {
                notifications: false,
                theme: 'light'
              }
            },
            errors: {}
          })
        }
      }
    },
    failure: {
      on: {
        RETRY: 'submitting',
        RESET: {
          target: 'step1',
          actions: assign({
            userData: {
              name: '',
              email: '',
              preferences: {
                notifications: false,
                theme: 'light'
              }
            },
            errors: {}
          })
        }
      }
    }
  }
});
