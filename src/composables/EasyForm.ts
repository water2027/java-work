import EasyForm from '@/components/EasyForm.vue';

import { type CustomFormData } from '@/model/CustomFormData';

import { createApp } from 'vue';

export const useEasyForm = (inputData:CustomFormData[], submitHandler:Function) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const app = createApp(EasyForm, {
    inputData,
    submitHandler:(id:number)=>{
      submitHandler(id);
      app.unmount();
      document.body.removeChild(div);
    },
    isCourse:true,
    close: () => {
      app.unmount();
      document.body.removeChild(div);
    },
  });
  app.mount(div);
};
