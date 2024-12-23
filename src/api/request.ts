import { ref, type Ref } from 'vue';

import { type ReturnData } from '@/model/dto/ReturnData';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export interface RequestResult<T> {
  data: Ref<T | undefined>;
  isLoading: Ref<boolean>;
  err: Ref<string>;
}

function useRequest<T>(
  url: string,
  requestInit: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  tokenIsNeeded: boolean = true
): RequestResult<T> {
  const data: Ref<T | undefined> = ref<T>();
  const isLoading = ref(true);
  const err = ref('');
  if (tokenIsNeeded) {
    const token = localStorage.getItem('token');
    const headers = new Headers(requestInit.headers ?? {});
    headers.set('Authorization', `Bearer ${token}`);
    requestInit.headers = headers;
  }
  fetch('https://' + apiBaseUrl + url, { ...requestInit })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((jsonData: ReturnData<T>) => {
      if (jsonData.code >= 200 && jsonData.code < 300) {
        data.value = jsonData.data;
        isLoading.value = false;
      } else {
        throw new Error(jsonData.message);
      }
    })
    .catch((e) => {
      err.value = String(e);
      isLoading.value = false;
    });
  return { data, isLoading, err };
}

// 应该返回一个Promise对象
async function useAsyncRequest<T>(
	url: string,
	requestInit: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	},
	tokenIsNeeded: boolean = true
) {
	let data = null;
	let err = '';
	if (tokenIsNeeded) {
		const token = localStorage.getItem('token');
		const headers = new Headers(requestInit.headers ?? {});
		headers.set('Authorization', `Bearer ${token}`);
		requestInit.headers = headers;
	}
	try {
		const resp = await fetch('https://' + apiBaseUrl + url, {
			...requestInit,
		});
		if (!resp.ok) {
			throw new Error(`HTTP error! status: ${resp.status}`);
		}
		const jsonData = await resp.json();
		if (jsonData.code >= 200 && jsonData.code < 300) {
			data = jsonData.data;
			return { data, err };
		} else {
			throw new Error(jsonData.message);
		}
	} catch (e) {
		err = String(e);
		return { data, err };
	}
}

export { useRequest, useAsyncRequest };
