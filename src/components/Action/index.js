import React, { useState } from 'react';
import {
  MdRemoveRedEye,
  MdModeEdit,
  MdDeleteForever,
  MdAdd,
  MdGroupAdd,
} from 'react-icons/md';
import { ClickAwayListener } from '@material-ui/core';
import { Container, ActionList } from './styles';
import { pallete } from '~/styles';

export default function Action({ view, edit, del, viewDetail }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }
  return (
    <ClickAwayListener onClickAway={() => setVisible(false)}>
      <Container>
        <div onClick={handleToggleVisible}>...</div>
        <ActionList visible={visible}>
          {viewDetail && (
            <>
              <li
                onClick={() => {
                  viewDetail();
                  setVisible(false);
                }}
              >
                <MdRemoveRedEye color={pallete.primary} size={15} />
                <span>Detalhar</span>
              </li>

              <hr />
            </>
          )}
          {view && (
            <>
              <li
                onClick={() => {
                  view();
                  setVisible(false);
                }}
              >
                <MdGroupAdd color="#8E5BE8" size={15} />
                <span>Convidar</span>
              </li>

              <hr />
            </>
          )}

          {edit && (
            <li
              onClick={() => {
                edit();
                setVisible(false);
              }}
            >
              <MdModeEdit color="#4D85EE" size={15} />
              <span>Editar</span>
            </li>
          )}
          {del && (
            <>
              <hr />
              <li
                onClick={() => {
                  del();
                  setVisible(false);
                }}
              >
                <MdDeleteForever color="#DE3B3B" size={15} />
                <span>Excluir</span>
              </li>
            </>
          )}
        </ActionList>
      </Container>
    </ClickAwayListener>
  );
}
