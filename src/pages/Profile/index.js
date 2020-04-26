import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';
import AvatarInput from './AvatarInput';
import { routes } from '~/routes';
import api from '~/services/api';

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [profile, setProfile] = useState('');
  async function getProfile(data) {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data);
    } catch (e) {}
  }
  useEffect(() => {
    getProfile();
  }, []);

  async function updateProfile(data) {
    try {
      const token = localStorage.getItem('token');

      data.file_id = data.avatar_id;

      const response = await api.put('/users', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data);
    } catch (e) {}
  }

  function handleSignOut() {
    localStorage.clear();
    history.push(routes.signin);
  }

  function handleSubmit(data) {
    updateProfile(data);
  }

  return (
    <Container>
      <Form initialData={profile[0]} onSubmit={handleSubmit}>
        <AvatarInput name="file_id" />
        <Input type="text" name="username" placeholder="Username" />
        <Input disabled type="email" name="email" placeholder="Email" />

        <button type="submit">Atualizar</button>
      </Form>
      <button onClick={handleSignOut} type="button">
        Logout
      </button>
    </Container>
  );
}
