import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { useNavigate, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {
  messageAdded,
  messageDeleted,
  messageDeletedAll,
  messageUpdated,
} from '../redux/messagesReducer';

const Messages = () => {
  const [show, setShow] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [text, setText] = useState('');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { contacts } = useSelector((state) => state.contacts);
  const { messages } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (id) {
      const message = messages.find((item) => item.id === id);
      setSearchQuery(message.phone);
      setText(message.text);
    }
  }, [id]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const results = contacts.filter((item) => item.phone.includes(query));
    setSearchResults(results);
    setIsMenuOpen(true);
  };

  const handleResultClick = (result) => {
    setSearchQuery(result.phone);
    setIsMenuOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleSaveMessage = () => {
    if (id) {
      navigate({ pathname: '/messages' });
      dispatch(messageUpdated({ id, phone: searchQuery, text }));
    } else {
      dispatch(messageAdded({ id: uniqid(), phone: searchQuery, text }));
    }
    setShow(false);
    setSearchQuery('');
    setText('');
  };
  console.log('RENDER');
  return (
    <div className="messages">
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {id ? 'Редагувати повідомлення' : 'Створити повідомлення'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="messages__search-field mb-3">
              <Form.Label>
                {id ? 'Відредагуйте контакт:' : 'Оберіть контакт за номером:'}
              </Form.Label>
              <Form.Control
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Пошук"
                autoFocus
              />
              <div className="search-results" ref={menuRef}>
                {isMenuOpen && searchResults.length > 0 ? (
                  <ul className="search-results__list">
                    {searchResults.map((result, index) => (
                      <li
                        className="search-results__list-item"
                        key={index}
                        onClick={() => handleResultClick(result)}
                      >
                        {result.name}: {result.phone}
                      </li>
                    ))}
                  </ul>
                ) : (
                  isMenuOpen &&
                  searchResults.length === 0 && (
                    <ul className="search-results__list">
                      <li className="search-results__list-item search-results__list-item--no-results">
                        Нічого не знайдено
                      </li>
                    </ul>
                  )
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                {id ? 'Відредагуйте повідомлення:' : 'Напишіть повідомлення:'}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
              setSearchQuery('');
              setText('');
              navigate({ pathname: '/messages' });
            }}
          >
            Відмінити
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveMessage}
            disabled={Boolean(!(searchQuery && text))}
          >
            Зберегти
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Номер контакту:</th>
            <th>Повідомлення:</th>
            <th>Дії:</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((item) => (
            <tr key={item.id}>
              <td>{item.phone}</td>
              <td>{item.text}</td>
              <td>
                <Button
                  className="messages__table-buttons m-1"
                  size="sm"
                  variant="warning"
                  onClick={() => {
                    navigate({ pathname: `/messages/${item.id}` });
                    setShow(true);
                  }}
                >
                  Редагувати
                </Button>
                <Button
                  className="messages__table-buttons m-1"
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    navigate({ pathname: '/messages' });
                    dispatch(messageDeleted(item.id));
                  }}
                >
                  Видалити
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="messages__buttons">
        <Button
          className="me-2"
          variant="primary"
          onClick={() => {
            if (id) {
              setSearchQuery('');
              setText('');
            }
            navigate({ pathname: '/messages' });
            setShow(true);
          }}
        >
          Створити повідомлення
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            navigate({ pathname: '/messages' });
            dispatch(messageDeletedAll());
          }}
        >
          Видалити вcі повідомлення
        </Button>
      </div>
    </div>
  );
};

export default Messages;
