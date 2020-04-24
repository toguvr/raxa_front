import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Helmet from 'react-helmet';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';
import logo from '~/assets/logo.svg';
import { routes } from '~/routes';
import api from '~/services/api';

const Schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .email('Email Inválido')
    .required('Email obrigatório'),

  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Senha obrigatória'),
});

export default function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  async function signUp(name, email, password) {
    const body = {
      username: name,
      email,
      password,
      password_confirmation: password,
    };
    setLoading(true);

    try {
      await api.post(`/users`, body);
      history.push(routes.signin);
      toast.success('Cadastrado com sucesso');
      setLoading(false);
    } catch (e) {
      setLoading(false);

      toast.error('Não foi possível realizar o cadastro');
    }
  }

  function handleSubmit(data) {
    const { name, email, password } = data;
    signUp(name, email, password);
  }

  return (
    <Form schema={Schema} onSubmit={handleSubmit}>
      <label htmlFor="id_password">SEU NOME</label>

      <Input name="name" placeholder="Nome" />
      <label htmlFor="id_password">SEU EMAIL</label>

      <Input name="email" type="email" placeholder="Email" />
      <label htmlFor="id_password">SUA SENHA</label>

      <Input name="password" type="password" placeholder="Senha" />
      <button type="submit">
        {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
      </button>
    </Form>
  );
}
