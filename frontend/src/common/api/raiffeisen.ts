import axios from 'common/axios';

export const postRaiffeisenReport = (formData: FormData) => axios.post('/api/raiffeisen/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
