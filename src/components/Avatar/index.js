import React from 'react';
import PropTypes from 'prop-types';

import { Container, Photo } from './styles';
import { pallete } from '~/styles';

export default function Avatar({ name, color, width, url }) {
  function cutName(str) {
    if (str) {
      str = str.trim();
      const arr = str.split(' ');

      if (arr[0] && arr[1]) {
        if (arr[1][0].toUpperCase() != arr[1][0]) {
          arr.splice(1, 1);
          if (arr[0] && arr[1]) {
            arr[0] = arr[0].substr(0, 1).toUpperCase();
            arr[1] = arr[1].substr(0, 1).toUpperCase();
          } else {
            arr[0] = arr[0].substr(0, 1).toUpperCase();
          }
        }
      } else {
        arr[0] = arr[0].substr(0, 1).toUpperCase();
      }
      return arr.slice(0, 2).join('');
    }
  }
  if (url) {
    return (
      <Photo color={color} width={width}>
        <img src={url} alt="FASTFEET" />
      </Photo>
    );
  }
  return (
    <Container color={color} width={width}>
      {cutName(name)}
    </Container>
  );
}

Avatar.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  url: PropTypes.string,
  width: PropTypes.number,
};

Avatar.defaultProps = {
  color: pallete.primary,
  width: 35,
  name: 'RAXA',
  url: null,
};
