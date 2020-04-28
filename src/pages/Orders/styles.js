import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { pallete } from '~/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 22px 10px;

  strong {
    font-size: 24px;
    color: #ffffff;
  }

  header {
    margin: 34px 0 22px;
    margin: 34px 0 22px;
    display: flex;
    justify-content: space-between;
  }

  button {
    background: ${darken(0.05, pallete.primary)};
    box-shadow: 0px 0px 10px #00000033;
    border-radius: 18px;
    width: 36px;
    height: 36px;
    font-size: 14px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
      outline: none;
    }
  }
`;

export const Search = styled.div`
  display: flex;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #dddddd;
  border-radius: 4px;
  width: 200px;
  height: 36px;
  justify-content: flex-start;
  align-items: center;
  padding: 9px 16px;

  input {
    margin-left: 8px;
    border: none;
    color: #999999;
    width: 100%;
    font-size: 14px;

    ::placeholder {
      color: #999999;
    }
  }
`;

export const PopUp = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 10px #00000033;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 20px;
  width: 100%;
  min-width: 300px;

  strong {
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    height: 100px;
  }

  button {
    margin: 5px 0 0;
    height: 45px;
    background: ${pallete.primary} 0% 0% no-repeat padding-box;
    border-radius: 4px;
    font-weight: bold;
    color: #fff;
    border: 0;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
      background: ${darken(0.08, pallete.primary)};
    }
  }
`;

export const Card = styled.div`
  width: 100%;
  background: #f5f5f5;
  border-radius: 25px;
  min-height: 100px;
  padding: 10px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  border: 2px solid ${pallete.primary};
  box-shadow: 0px 0px 10px #00000033;

  div {
    margin: 0 8px;
  }
`;

export const Description = styled.span`
  color: ${lighten(0.3, 'black')};
  font-size: 14px;
  font-style: italic;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 40ch;
`;

export const Title = styled.span`
  font-weight: bold;
  color: black;
  font-size: 16px;
  align-self: flex-start;
`;

export const Body = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: calc(100vh - 330px);

  ::-webkit-scrollbar {
    display: none;
  }
`;
