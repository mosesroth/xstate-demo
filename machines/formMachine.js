import { createMachine, assign } from 'xstate';

// Form validation machine
export const formMachine = createMachine({
  id: 'form',
  initial: 'editing',
  context: {
    name: '',
    email: '',
    nameError: null,
    emailError: null,
    submitCount: 0
  },
  states: {
    editing: {
      on: {
        CHANGE_NAME: {
          actions: assign({
            name: (_, event) => event.value,
            nameError: (_, event) => {
              if (!event.value.trim()) {
                return 'Name is required';
              }
              return null;
            }
          })
        },
        CHANGE_EMAIL: {
          actions: assign({
            email: (_, event) => event.value,
            emailError: (_, event) => {
              if (!event.value.trim()) {
                return 'Email is required';
              }
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.value)) {
                return 'Invalid email format';
              }
              return null;
            }
          })
        },
        SUBMIT: [
          {
            target: 'submitting',
            cond: (context) => {
              return (
                context.name.trim() !== '' &&
                context.email.trim() !== '' &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(context.email) &&
                !context.nameError &&
                !context.emailError
              );
            }
          },
          {
            // Stay in editing state but update errors
            actions: assign({
              nameError: (context) => {
                if (!context.name.trim()) {
                  return 'Name is required';
                }
                return context.nameError;
              },
              emailError: (context) => {
                if (!context.email.trim()) {
                  return 'Email is required';
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(context.email)) {
                  return 'Invalid email format';
                }
                return context.emailError;
              },
              submitCount: (context) => context.submitCount + 1
            })
          }
        ]
      }
    },
    submitting: {
      invoke: {
        src: 'submitForm',
        onDone: 'success',
        onError: {
          target: 'editing',
          actions: assign({
            emailError: (_, event) => event.data?.message || 'Submission failed'
          })
        }
      }
    },
    success: {
      on: {
        RESET: {
          target: 'editing',
          actions: assign({
            name: '',
            email: '',
            nameError: null,
            emailError: null,
            submitCount: 0
          })
        }
      }
    }
  }
});
