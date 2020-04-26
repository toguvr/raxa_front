import axios from 'axios';
import { baseURL } from '~/services';

export async function filterResult() {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${baseURL}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
