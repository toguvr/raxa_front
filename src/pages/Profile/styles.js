import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto 0;
  padding: 0 20px 10px;
  @media screen and (min-width: 900px) {
    width: 410px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 10px 0 20px;
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: #fff;
    margin: 0 0 10px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  button {
    margin: 5px 0 0;
    height: 44px;
    background: #3b9eff;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
      background: ${darken(0.03, '#3b9eff')};
    }
  }

  > button {
    margin: 10px 0 0;
    height: 44px;
    background: #f64c75;
    width: 100%;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
      background: ${darken(0.08, '#f64c75')};
    }
  }
`;
