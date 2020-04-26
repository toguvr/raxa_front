import React, { useState, useEffect } from 'react';
import {
  MdSearch,
  MdAdd,
  MdPeople,
  MdContentCopy,
  MdTrendingUp,
  MdTrendingDown,
} from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import Dialog from '@material-ui/core/Dialog';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { TextField, CircularProgress } from '@material-ui/core';
import copy from 'clipboard-copy';
import Table from '~/components/Table';
import Avatar from '~/components/Avatar';
import Status from '~/components/Status';
import Action from '~/components/Action';
import {
  Container,
  Search,
  PopUp,
  Title,
  Description,
  Card,
  Body,
  Header,
  Paid,
  ToPay
} from './styles';
import { DivFlex, pallete, DivCol } from '~/styles';
import { filterResult } from '~/services/filter';
import { routes } from '~/routes';
import { deleteOrder } from '~/services/order';
import { holdOrder } from '~/store/order/reducer';
import api from '~/services/api';
import numeral from 'numeral';

import 'numeral/locales/pt-br';

export default function Task() {
  const history = useHistory();

  const [type, setType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [orders, setOrders] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(false);
  const [values, setValues] = useState({ title: '', desription: '' });
  const [profile, setProfile] = useState(false);
  const [members, setMembers] = useState(false);


  async function getProjectMembers(id) {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/projectmembers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data[0]);
    } catch (e) {}
  }

  async function getProfile(data) {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data[0]);
    } catch (e) {}
  }
  useEffect(() => {
    const id = history.location.pathname.replace('/task/', "")
    console.log(id)
    getProfile();
    getProjectMembers(id)
  }, []);

  const total = 0;

  async function getOrder() {
    const response = await filterResult();

    setOrders(response.data);
  }

  async function createProject() {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/projects', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getOrder();
      toast.success('Conta criada');
      setLoading(false);
      setOpen(false);
    } catch (e) {
      toast.error('não foi possível criar a conta');
      setLoading(false);
    }
  }

  async function editProject() {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(`/projects/${currentOrder}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getOrder();
      toast.success('Conta atualizada');
      setLoading(false);
      setOpen(false);
    } catch (e) {
      toast.error('não foi possível atualizar a conta');
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrder();
  }, []);

  function viewDialog(item) {
    setCurrentOrder(item);
    setOpen(true);
  }

  function editOrder(item) {
    setOpen(true);
    setType('edit');
    setCurrentOrder(item.id);
    setValues({ description: item.description, title: item.title });
  }

  return (
    <Container>
      <Header>
        <span>
          {profile ? `Bem vindo, ${profile.username}` : 'Bem vindo, ao Raxa'}
        </span>
        <Avatar width="100" url={profile.file && profile.file.url} />
      </Header>
      <header>
        <span>
          SALDO:{' '}
          {total >= 0 ? (
            <div style={{color: pallete.primary}}><MdTrendingUp color={pallete.primary} /> R${numeral(total).format('0,0.00')}</div>
          ) : (
           <div style={{color: "#C44131"}}> <MdTrendingDown  /> R${numeral(total).format('0,0.00')}
          </div>)}
        </span>
        <button
          onClick={() => {
            setValues({ title: '', desription: '' });
            setType('create');
            setOpen(true);
          }}
        >
          <MdAdd color="#fff" size={16} />
        </button>
      </header>
      <Body>

          <Title>Extrato</Title>

          <ToPay>
            <span>Pedro: Comprei um extrato de tomate por R$ 29,50</span>
          </ToPay>
          <Paid>
            <span>Eu: Comprei um extrato de tomate por R$ 29,50</span>
          </Paid>
          <Paid>
            <span>Eu: Comprei um extrato de tomate por R$ 29,50</span>
          </Paid>
          <ToPay>
            <span>Pedro: Comprei um extrato de tomate por R$ 29,50</span>
          </ToPay>
          <Paid>
            <span>Eu: Comprei um extrato de tomate por R$ 29,50</span>
          </Paid>
          <Paid>
            <span>Eu: Comprei um extrato de tomate por R$ 29,50</span>
          </Paid>

        {/* <Action
                      edit={() => {
                        editOrder(project.projects[0]);
                      }}
                      del={async () => {
                        try {
                          const confirm = window.confirm(
                            'Deseja realmente deletar ?'
                          );
                          if (confirm) {
                            await deleteOrder(project.projects[0].id);
                            await getOrder();
                            toast.success('Deletado com sucesso');
                          }
                        } catch (err) {
                          toast.error('Não foi possível deletar');
                        }
                      }}
                      view={() => {
                        setType('invite');
                        setCurrentOrder(project.projects[0]);
                        setOpen(true);
                      }}
                    />

       */}
      </Body>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <PopUp>
          (
            <>
              <strong>Criar novo Raxa</strong>
              <TextField
                id="outlined-basic"
                required
                label="Titulo"
                name="title"
                value={values.title}
                onChange={e =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                variant="outlined"
              />
              <br />
              <TextField
                multiline
                rows="3"
                id="outlined-basic"
                label="Descrição"
                required
                name="description"
                value={values.description}
                onChange={e =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                variant="outlined"
              />
              <br />
              <button
                onClick={type === 'edit' ? editProject : createProject}
                type="submit"
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : type === 'edit' ? (
                  'Atualizar'
                ) : (
                  'Criar'
                )}
              </button>
            </>
          )}
        </PopUp>
      </Dialog>
    </Container>
  );
}
