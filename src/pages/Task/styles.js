import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { pallete } from '~/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 22px 0;
  @media screen and (min-width: 900px) {
    width: 410px;
  }
  strong {
    font-size: 24px;
    color: #ffffff;
  }

  header {
    margin: 10px 0 22px;
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 20px;
      font-weight: bold;
      color: white;
    }
    div {
      background: white;
      display: flex;

      align-items: center;
    }
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

export const Paid = styled.div`
  width: 50%;
  border-radius: 25px 0 25px 25px;
  margin-right: 8px;
  color: white;
  background: ${pallete.primary};
  align-self: flex-end;
  padding: 10px;
  margin-top: 8px;
`;

export const ToPay = styled.div`
  width: 50%;
  padding: 10px;
  border-radius: 0 25px 25px 25px;
  background: lightgray;
  margin-left: 8px;
  margin-top: 8px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    color: white;
    font-size: 20px;
    margin-bottom: 8px;
    font-weight: bold;
  }
`;

export const Title = styled.div`
  font-weight: bold;
  color: white;
  background: ${pallete.secUp};
  font-size: 16px;
  text-align: center;
  padding: 4px 0;
  box-shadow: 0px 0px 10px #00000033;

  border-radius: 25px 25px 0 0;

  width: 100%;
`;

export const Body = styled.div`
  overflow-y: scroll;
  box-shadow: 0px 0px 10px #00000033;
  width: 100%;
  height: calc(100vh - 334px);
  background: white;
  display: flex;
  flex-direction: column;
  padding: 5px;

  ::-webkit-scrollbar {
    display: none;
  }
`;
