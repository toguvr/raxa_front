import React, { useState, useEffect, useMemo } from 'react';
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
import { format, parseISO, parse, subHours, addHours } from 'date-fns';
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
import { removeValueMask, changeValueMask } from '../../utils/masks';
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
import { toDate } from 'date-fns-tz/esm';

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
      values.amount = Number(removeValueMask(values.amount));
      values.set_date = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

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

  const total = useMemo(() => {
    if (tasks.length > 0) {
      if (tasks[0].project.set_date) {
        return tasks.reduce(function(a, b) {
          if (new Date(tasks[0].project.set_date) < new Date(b.set_date)) {
            return a + Number(b.value) * Number(b.amount);
          }
          return a;
        }, 0);
      }
    }
  }, [tasks]);

  const yourTotal = useMemo(() => {
    if (tasks.length > 0) {
      if (tasks[0].project.set_date) {
        return tasks.reduce(function(a, b) {
          if (new Date(tasks[0].project.set_date) < new Date(b.set_date)) {
            if (b.payer_id === profile.id) {
              return a + Number(b.value) * Number(b.amount);
            }

            return a;
          }
          return a;
        }, 0);
      }
    }
  }, [tasks]);

  const subTotal = useMemo(() => {
    if (members) {
      return Number(yourTotal) - Number(total) / Number(members.length);
    }
    return 0;
  }, [yourTotal, total, members, tasks]);

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

  async function editTotal() {
    const id = history.location.pathname.replace('/task/', '');
    const body = {
      totalValue: total,

      set_date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
    };
    const confirm = window.confirm(
      'Se quitar as dívidas irão zerar e não terá como desfazer.'
    );
    if (confirm) {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await api.put(`/projects/${id}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        getTasks();
        toast.success('Conta atualizada');
        setLoading(false);
        setOpen(false);
      } catch (e) {
        toast.error('não foi possível atualizar a conta');
        setLoading(false);
      }
    }
  }

  async function editProject() {
    const id = history.location.pathname.replace('/task/', '');

    setLoading(true);
    try {
      values.value = Number(removeValueMask(values.value));
      values.amount = Number(values.amount);

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
      value: changeValueMask(item.value),
    });
  }

  return (
    <Container>
      <Header>
        <span>
          {profile ? `Bem vindo, ${profile.username}` : 'Bem vindo, ao Raxa'}
        </span>
        {profile ? (
          profile.file ? (
            <Avatar width={100} url={profile.file.url} />
          ) : (
            <Avatar width={100} name={profile.username} />
          )
        ) : (
          <Avatar width={100} name="RAXA" />
        )}
      </Header>
      <header>
        <span>
          {subTotal >= 0 ? (
            <>
              Receber:{' '}
              <div style={{ color: pallete.primary }}>
                <MdTrendingUp color={pallete.primary} /> R$
                {numeral(subTotal).format('0,0.00')}
              </div>
            </>
          ) : (
            <>
              Pagar:
              <div style={{ color: '#C44131' }}>
                {' '}
                <MdTrendingDown /> R$
                {numeral(subTotal * -1).format('0,0.00')}
              </div>
            </>
          )}
        </span>
        {subTotal !== 0 ? (
          <button style={{ width: '70px' }} onClick={editTotal}>
            Quitar
          </button>
        ) : (
          <button disabled style={{ width: '70px', background: 'lightgray' }}>
            Quitado
          </button>
        )}
        <button
          onClick={() => {
            setValues({ title: '', desription: '' });
            setType('create');
            setOpen(true);
          }}
        >
          <MdAdd color="#fff" size={20} />
        </button>
      </header>
      <Title>Extrato</Title>
      <Body>
        {tasks &&
          tasks.map(task =>
            task.payer_id === profile.id ? (
              <Paid key={task.id}>
                <span>
                  Eu: Comprei {task.amount} {task.title} por {task.value}{' '}
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
              </Paid>
            ) : (
              <ToPay key={task.id}>
                <span>
                  {task.payer.username}: Comprei {task.amount} {task.title} por{' '}
                  {task.value} totalizando R$
                  {numeral(task.amount * task.value).format('0,0.00')}
                </span>
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
              type="number"
              required
              step="any"
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
              label="Valor"
              required
              name="value"
              value={values.value}
              defaultValue={type === 'edit' && values.value}
              onChange={e =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              variant="outlined"
            />
            <br />
            <TextField
              multiline
              rows="3"
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
