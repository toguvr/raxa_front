import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdHome, MdPersonOutline } from 'react-icons/md';
import logo from '~/assets/logo.png';
import { Container, Content, Profile, LinkPage } from './styles';
import { routes } from '~/routes';
import { pallete } from '~/styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const history = useHistory();
  function logout() {
    localStorage.clear();
    history.push(routes.signin);
  }
  return (
    <Content>
      <MdHome
        onClick={() => history.push(routes.orders)}
        cursor="pointer"
        color={
          history.location.pathname === routes.orders
            ? pallete.primary
            : '#cecece'
        }
        size={30}
      />
      <MdPersonOutline
        onClick={() => history.push(routes.profile)}
        cursor="pointer"
        color={
          history.location.pathname === routes.profile
            ? pallete.primary
            : '#cecece'
        }
        size={30}
      />
    </Content>
  );
}
