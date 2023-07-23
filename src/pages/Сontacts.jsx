import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import {
  contactAdded,
  contactUpdated,
  contactDeleted,
  contactDeletedAll,
} from '../redux/contactsReducer';

const Contacts = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { contacts } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const contact = contacts.find((item) => item.id === id);
      setName(contact.name);
      setPhone(contact.phone);
    }
  }, [id]);

  const handleSaveContact = () => {
    if (id) {
      navigate({ pathname: '/contacts' });
      dispatch(contactUpdated({ id, name, phone }));
    } else {
      dispatch(contactAdded({ id: uniqid(), name, phone }));
    }
    setName('');
    setPhone('');
  };

  const checkValidate = () => {
    if (!(name.length >= 2) || phone.length === 0 || phone.includes('_')) {
      return true;
    } else {
      return false;
    }
  };

  console.log('RENDER');
  return (
    <div className="contacts">
      <Form className="contacts__form">
        <Form.Group className="mb-3">
          <Form.Label className="contacts__label-name">
            Ім'я <span>(від двох букв)</span>:
          </Form.Label>
          <Form.Control
            placeholder="Введіть ім'я"
            value={name}
            onChange={(e) => {
              if (
                !(e.target.value.length === 0) &&
                !/^[A-Za-zА-Яа-яЁёІії]+$/.test(e.target.value)
              )
                return;
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Номер телефону:</Form.Label>
          <InputMask
            className="form-control"
            mask="+38(099)999-99-99"
            placeholder="Введіть номер телефону"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Button
          className="me-2"
          variant="primary"
          onClick={handleSaveContact}
          disabled={checkValidate()}
        >
          Зберегти
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            setName('');
            setPhone('');
            navigate({ pathname: '/contacts' });
            dispatch(contactDeletedAll());
          }}
        >
          Видалити все
        </Button>
      </Form>
      <Table className="contacts__table" striped bordered hover>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Телефон</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>
                <Button
                  className="m-1"
                  size="sm"
                  variant="warning"
                  onClick={() => navigate({ pathname: `${item.id}` })}
                  disabled={Boolean(id)}
                >
                  Редагувати
                </Button>
                <Button
                  className="m-1"
                  size="sm"
                  variant="danger"
                  onClick={() => dispatch(contactDeleted(item.id))}
                  disabled={Boolean(id)}
                >
                  Видалити
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Contacts;
