import { session } from 'grammy';

export const getSession = session({
  initial: () => ({
    area: {
      state: 'idle',
    },
    flowRate: {
      state: 'idle',
    },
    weather: {
      state: 'idle',
    },
    menuMessageId: null,
  }),
});
