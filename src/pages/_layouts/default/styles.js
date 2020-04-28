import styled from 'styled-components';
import { pallete } from '~/styles';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(#50c445, #3fd188);
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 900px) {
    max-width: 700px;
  }

  img {
    width: 150px;
  }

  header {
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Body = styled.div`
  flex: 1;
`;

export const Pc = styled.div`
  @media screen and (min-width: 900px) {
    background: lightgray;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100%;
  }
`;
