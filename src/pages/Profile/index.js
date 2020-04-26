import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';
import AvatarInput from './AvatarInput';
import { routes } from '~/routes';

export default function Profile() {
  // const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const history = useHistory();
  // function handleSubmit(data) {
  //   dispatch(updateProfileRequest(data));
  // }

  function handleSignOut() {
    localStorage.clear();
    history.push(routes.signin);
  }

  return (
    <Container>
      {/* <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Nome" />
        <Input type="email" name="email" placeholder="Email" />
        <hr />
        <Input type="password" name="oldPassword" placeholder="Senha antiga" />
        <Input type="password" name="password" placeholder="Senha atual" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação da senha atual"
        />
        <button type="submit">Atualizar</button>
      </Form> */}
      <button onClick={handleSignOut} type="button">
        Logout
      </button>
    </Container>
  );
}
