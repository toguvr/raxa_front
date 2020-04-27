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
import numeral from 'numeral';
import NumberFormat from 'react-number-format';
import Table from '~/components/Table';
import Avatar from '~/components/Avatar';
import Status from '~/components/Status';
import Action from '~/components/Action';
import { removeValueMask } from '../../utils/masks';
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
  ToPay,
} from './styles';
import { DivFlex, pallete, DivCol } from '~/styles';
import { filterResult } from '~/services/filter';
import { routes } from '~/routes';
import { deleteOrder } from '~/services/order';
import { holdOrder } from '~/store/order/reducer';
import api from '~/services/api';

import 'numeral/locales/pt-br';

export default function Task() {
  numeral.locale('pt-br');

  const history = useHistory();

  const [type, setType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [orders, setOrders] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(false);
  const [values, setValues] = useState({ title: '', description: '' });
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

      setMembers(response.data);
    } catch (e) {}
  }

  async function getProfile() {
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

  async function getTasks() {
    const id = history.location.pathname.replace('/task/', '');

    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/projects/${id}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
    } catch (e) {}
  }

  async function createTask() {
    const id = history.location.pathname.replace('/task/', '');

    try {
      values.value = Number(removeValueMask(values.value));
      const token = localStorage.getItem('token');
      const response = await api.post(`/projects/${id}/tasks`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Gasto adicionado');
      getTasks();
      setOpen(false);
    } catch (e) {
      toast.error('Gasto não adicionado');
    }
  }

  useEffect(() => {
    const id = history.location.pathname.replace('/task/', '');

    getProfile();
    getProjectMembers(id);
    getTasks();
  }, []);

  const total = tasks.reduce(function(a, b) {
    return a + b.value * b.amount;
  }, 0);

  const yourTotal = tasks.reduce(function(a, b) {
    if (b.payer_id === profile.id) {
      return a + b.value * b.amount;
    }
    return a;
  }, 0);

  const subTotal = Number(yourTotal - total / Number(members.length));

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
    const id = history.location.pathname.replace('/task/', '');

    setLoading(true);
    try {
      values.value = Number(removeValueMask(values.value));

      const token = localStorage.getItem('token');
      const response = await api.put(
        `/projects/${id}/tasks/${currentOrder}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getTasks();
      toast.success('Conta atualizada');
      setLoading(false);
      setOpen(false);
    } catch (e) {
      toast.error('não foi possível atualizar a conta');
      setLoading(false);
    }
  }
  // useEffect(() => {
  //   getOrder();
  // }, []);

  function viewDialog(item) {
    setCurrentOrder(item);
    setOpen(true);
  }

  function editTask(item) {
    setOpen(true);
    setType('edit');
    setCurrentOrder(item.id);
    setValues({
      description: item.description,
      title: item.title,
      amount: item.amount,
      value: item.value,
    });
  }

  return (
    <Container>
      <Header>
        <span>
          {profile ? `Bem vindo, ${profile.username}` : 'Bem vindo, ao Raxa'}
        </span>
        <Avatar width={100} url={profile.file && profile.file.url} />
      </Header>
      <header>
        <span>
          {subTotal >= 0 ? (
            <>
              Recebe:{' '}
              <div style={{ color: pallete.primary }}>
                <MdTrendingUp color={pallete.primary} /> R$
                {numeral(subTotal).format('0,0.00')}
              </div>
            </>
          ) : (
            <>
              Paga:
              <div style={{ color: '#C44131' }}>
                {' '}
                <MdTrendingDown /> R$
                {numeral(subTotal).format('0,0.00')}
              </div>
            </>
          )}
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
      <Title>Extrato</Title>
      <Body>
        {tasks &&
          tasks.map(task =>
            task.payer_id === profile.id ? (
              <Paid key={task.id}>
                <span>
                  Eu: Comprei {task.amount} {task.title} totalizando R$
                  {numeral(task.amount * task.value).format('0,0.00')}
                </span>
                <Action
                  edit={() => {
                    editTask(task);
                  }}
                  del={async () => {
                    try {
                      const confirm = window.confirm(
                        'Deseja realmente deletar ?'
                      );
                      if (confirm) {
                        const id = history.location.pathname.replace(
                          '/task/',
                          ''
                        );

                        await deleteOrder(id, task.id);
                        await getTasks();
                        toast.success('Deletado com sucesso');
                      }
                    } catch (err) {
                      toast.error('Não foi possível deletar');
                    }
                  }}
                />
              </Paid>
            ) : (
              <ToPay key={task.id}>
                <span>
                  {task.payer.username}: Comprei {task.amount} {task.title}{' '}
                  totalizando R$
                  {numeral(task.amount * task.value).format('0,0.00')}
                </span>
                <Action
                  edit={() => {
                    editTask(task);
                  }}
                  del={async () => {
                    try {
                      const confirm = window.confirm(
                        'Deseja realmente deletar ?'
                      );
                      if (confirm) {
                        const id = history.location.pathname.replace(
                          '/task/',
                          ''
                        );

                        await deleteOrder(id, task.id);
                        await getTasks();
                        toast.success('Deletado com sucesso');
                      }
                    } catch (err) {
                      toast.error('Não foi possível deletar');
                    }
                  }}
                />
              </ToPay>
            )
          )}
      </Body>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <PopUp>
          <>
            <strong>Adicionar Gasto</strong>
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
              id="outlined-basic"
              label="Quantidade"
              required
              name="amount"
              value={values.amount}
              onChange={e =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              variant="outlined"
            />
            <br />
            <NumberFormat
              customInput={TextField}
              decimalScale="2"
              decimalSeparator=","
              prefix="R$ "
              thousandSeparator="."
              id="outlined-basic"
              label="Valor"
              required
              name="value"
              value={values.value}
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
              name="description"
              value={values.description}
              onChange={e =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              variant="outlined"
            />
            <br />
            <button
              onClick={type === 'edit' ? editProject : createTask}
              type="submit"
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : type === 'edit' ? (
                'Atualizar'
              ) : (
                'Adicionar'
              )}
            </button>
          </>
        </PopUp>
      </Dialog>
    </Container>
  );
}
