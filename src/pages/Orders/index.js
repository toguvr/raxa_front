import React, { useState, useEffect } from 'react';
import { MdSearch, MdAdd, MdPeople, MdContentCopy } from 'react-icons/md';
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
} from './styles';
import { DivFlex, pallete, DivCol } from '~/styles';
import { filterResult } from '~/services/filter';
import { routes } from '~/routes';
import { deleteOrder } from '~/services/order';
import { holdOrder } from '~/store/order/reducer';
import api from '~/services/api';

export default function Orders() {
  const history = useHistory();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(useLocation().search);

  const [type, setType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [orders, setOrders] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(false);
  const [values, setValues] = useState({ title: '', description: '' });
  const [projectsIds, setProjectsIds] = useState([]);
  const [newMembers, setMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState([]);

  const url = `${process.env.REACT_APP_URL}/orders?code=${currentOrder.id}`;
  const msg = `Entra ai pra facilitar o raxa da nossa conta "${currentOrder.title}" ${url}
  #Raxa`;

  const newLink = `https://api.whatsapp.com/send?text=${msg}`;
  const invitationCode = queryParams.get('code');

  useEffect(() => {
    getOrder();
  }, []);

  async function getProjectMembers(id) {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/projectmembers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTotalMembers(response.data);
    } catch (e) {}
  }

  useEffect(() => {
    const membersArr = [];
    orders && orders.map(item => membersArr.push(item.project_id));

    setProjectsIds(membersArr);
  }, [orders]);

  useEffect(() => {
    const membersArr = [];

    projectsIds &&
      projectsIds.map(async item => {
        const token = localStorage.getItem('token');
        const response = await api.get(`/projectmembers/${item}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return membersArr.push(response.data.length);
      });

    setMembers(membersArr);
  }, [projectsIds]);

  async function enterMember() {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(`/members/${invitationCode}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getOrder();
      toast.success('Entrou pro raxa');
    } catch (e) {
      toast.error('não foi possível entrar pro raxa');
      setLoading(false);
    }
  }
  useEffect(() => {
    if (invitationCode) {
      setType('codeInvited');
      setOpen(true);
    }
  }, []);

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
    if (type === 'members') {
      getProjectMembers(currentOrder);
    }
  }, [type, currentOrder]);

  function viewMembers(item) {
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
      <strong>Seus Raxas</strong>
      <header>
        <Search>
          <MdSearch color="#999999" size={16} />
          <input
            value={filter}
            onChange={e => setFilter(e.target.value)}
            type="text"
            placeholder="Filtrar Contas"
          />
        </Search>
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
        {orders &&
          orders
            .filter(
              item =>
                item.projects[0].title
                  .toLowerCase()
                  .indexOf(filter.toLowerCase()) > -1
            )
            .map((project, index) => {
              return (
                <Card>
                  <DivFlex
                    style={{ width: 'calc(100% - 50px' }}
                    onClick={() => {
                      history.push(
                        `${routes.taskRedirect}/${project.projects[0].id}`
                      );
                    }}
                  >
                    <div style={{ width: '40px' }}>
                      <Avatar
                        width="40"
                        name={
                          project.projects.length > 0 &&
                          project.projects[0].title
                        }
                      />
                    </div>

                    <DivCol>
                      <Title>{project.projects[0].title}</Title>
                      <Description>
                        {project.projects[0].description}
                      </Description>
                    </DivCol>
                  </DivFlex>

                  <DivCol style={{ width: '50px' }}>
                    <DivFlex
                      onClick={() => {
                        setType('members');
                        setOpen(true);
                        setCurrentOrder(project.projects[0].id);
                      }}
                    >
                      <MdPeople size={20} color={pallete.primary} />
                      {/* <span>{newMembers[index]}</span> */}
                    </DivFlex>

                    <Action
                      viewDetail={() => {
                        history.push(
                          `${routes.taskRedirect}/${project.projects[0].id}`
                        );
                      }}
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
                  </DivCol>
                </Card>
              );
            })}
      </Body>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <PopUp>
          {type === 'members' ? (
            totalMembers &&
            totalMembers.map(member => (
              <DivFlex style={{ margin: '8px' }}>
                <Avatar width="40" name={member.user[0].username} />

                <span style={{ marginLeft: '8px' }}>
                  {member.user[0].username}
                </span>
              </DivFlex>
            ))
          ) : type === 'codeInvited' ? (
            <>
              <strong>
                Bem Vindo, você foi convidado para raxar uma conta!
              </strong>
              <button
                onClick={() => {
                  enterMember();
                  setOpen(false);
                }}
                type="submit"
              >
                Aceitar
              </button>
            </>
          ) : type === 'invite' ? (
            <>
              <strong>Convidar para o Raxa</strong>
              <a target="_blank" style={{ cursor: 'pointer' }} href={newLink}>
                <FaWhatsapp color={pallete.primary} size={32} />
                <span>Convidar por whatsapp</span>
              </a>
              <br />
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  toast.success('Link copiado');
                  copy(url);
                }}
              >
                <MdContentCopy color={pallete.primary} size={32} />
                <span>Copiar Link do convite</span>
              </div>
            </>
          ) : (
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
