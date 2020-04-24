import React from 'react';
import PropTypes from 'prop-types';
import logo from '~/assets/logo.png';

import Header from '~/components/Header';

import { Container, Body } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Container>
      <header>
        <img src={logo} alt="GoBarber" />
      </header>
      <Body>{children}</Body>
      <Header />
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
