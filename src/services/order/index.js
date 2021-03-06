import axios from 'axios';
import { baseURL } from '~/services';

export async function addOrder(data) {
  const token = localStorage.getItem('token');

  const body = {
    deliveryman_id: data.deliveryman_id,
    recipient_id: data.recipient_id,
    product: data.product,
  };

  const response = await axios.post(`${baseURL}/orders`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function updateOrder(data, orderId) {
  const token = localStorage.getItem('token');

  const body = {
    deliveryman_id: data.deliveryman_id,
    recipient_id: data.recipient_id,
    product: data.product,
  };

  const response = await axios.put(`${baseURL}/orders/${orderId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function deleteOrder(projectId, taskId) {
  const token = localStorage.getItem('token');

  const response = await axios.delete(
    `${baseURL}/projects/${projectId}/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}

export async function deleteOnlyOrder(projectId) {
  const token = localStorage.getItem('token');

  const response = await axios.delete(`${baseURL}/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
