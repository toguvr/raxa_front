import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import logo from '~/assets/logo.png';

import Header from '~/components/Header';

import { Container, Body } from './styles';
import { routes } from '~/routes';

export default function DefaultLayout({ children }) {
  const history = useHistory();
  return (
    <Container>
      <header>
        {history.location.pathname === routes.task && (
          <MdKeyboardArrowLeft
            cursor="pointer"
            style={{ position: 'absolute', left: '10px' }}
            onClick={() => history.push(routes.orders)}
            size={35}
            color="white"
          />
        )}
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
