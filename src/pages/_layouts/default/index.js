import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import logo from 'assets/raxa.svg';

import Header from '~/components/Header';

import { Container, Body, Pc } from './styles';
import { routes } from '~/routes';

export default function DefaultLayout({ children }) {
  const history = useHistory();
  return (
    <Pc>
      <Container>
        <header>
          {history.location.pathname.indexOf(routes.taskRedirect) !== -1 && (
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
        {history.location.pathname.indexOf(routes.taskRedirect) === -1 && (
          <Header />
        )}
      </Container>
    </Pc>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
