import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Container, Content, Img, Header, Route } from './styles';
import { routes } from '~/routes';

export default function AuthLayout({ children }) {
  const history = useHistory();
  return (
    <Container>
      <Img src="" alt="" />
      <Header>
        <Route
          onClick={() => history.push(routes.signin)}
          currentPage={history.location.pathname === routes.signin}
        >
          Entrar
        </Route>
        <Route
          onClick={() => history.push(routes.signup)}
          currentPage={history.location.pathname === routes.signup}
        >
          Cadastrar
        </Route>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
