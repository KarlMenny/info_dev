import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import About from './pages/About/About';
import GalleryPhotos from './pages/Gallery/GalleryPhotos';
import Сontacts from './pages/Сontacts';
import Messages from './pages/Messages';
import TopNavigation from './components/TopNavigation';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Row>
          <Col>
            <TopNavigation />
            <main>
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="/gallery" element={<GalleryPhotos />} />
                <Route path="/contacts" element={<Сontacts />} />
                <Route path="/contacts/:id" element={<Сontacts />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/messages/:id" element={<Messages />} />
              </Routes>
            </main>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
