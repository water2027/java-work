import EasyForm from '@/components/EasyForm.vue';

import { createApp } from 'vue';

export const useEasyForm = () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const app = createApp(EasyForm, {
    close: () => {
      app.unmount();
      document.body.removeChild(div);
    },
  });
  app.mount(div);
};
