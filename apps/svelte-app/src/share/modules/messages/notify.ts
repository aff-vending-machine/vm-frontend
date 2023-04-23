import { notification } from '~/share/stores';

export const notify = (state: string, text: string, err: Error) => {
  notification.set({ enable: false });
  let title = '';
  switch (state) {
    case 'load-failure':
    case 'error':
      title = 'Unable to ' + text;
      notification.set({ enable: true, type: 'error', title: title, msg: err.message });
      break;

    case 'load-success':
      title = 'Success to ' + text;
      notification.set({ enable: true, type: 'success', title: title });
      break;
  }
};
