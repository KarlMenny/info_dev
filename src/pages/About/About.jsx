import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import photo from '../../photo.jpg';
import { profile } from '../About/data';

const About = () => {
  return (
    <div className="about">
      <img className="about__photo" src={photo} alt="photo" />
      <p className="about__text">
        Мій комерційний досвід Front End розробки зараз складає близько трьох
        років. Мій технологічний стек це: WordPress, HTML, CSS, препроцесори
        SCSS/LESS, методологія БЕМ, Gulp, Bootstrap (Ant Design, React
        Bootstrap), JS/jQuery, AXIOS, React + Redux, TypeScript, GIT, Abobe
        Illustrator, Figma та Photoshop. Моя мета – це робота Front End
        розробником. Віддаю перевагу командній розробці. Розглядаю як повну так і
        часткову зайнятість. У написанні коду придержуюся чистоти та
        лаконічності. Уважно та відповідально працюю з чужим кодом (зрозуміти
        код, внести правки чи виправити баг). У вільний від роботи час можу
        вивчати якусь нову технологію. Люблю активний відпочинок на природі,
        грати на музичних інструментах. Люблю бути корисним, мені подобається
        отримувати подяку від людей за свою працю.
      </p>
      <Row xs={1} md={2} className="g-4">
        {profile.map((work) => (
          <Col key={work.id}>
            <Card>
              <Card.Img variant="top" src={work.img} />
              <Card.Body>
                <Card.Title>{work.title}</Card.Title>
                <Card.Text>{work.text}</Card.Text>
                <Card.Link href={work.link}>Перейти</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default About;
