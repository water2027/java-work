import { useRequest } from "../request";

export function SendCode(email:string, subject:string, text:string) {
  return useRequest('/api/send',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        to:email,
        subject:subject,
        body:text
    })
  },false);
}