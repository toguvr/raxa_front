import styled from 'styled-components';
import { pallete } from '~/styles';

export const Container = styled.div`
  min-height: 100%;
  background: linear-gradient(#50c445, #3fd188);
  display: flex;
  flex-direction: column;

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
