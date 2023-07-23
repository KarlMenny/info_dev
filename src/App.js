import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopNavigation from './components/TopNavigation';
import About from './pages/About/About';
const GalleryPhotos = lazy(() => import('./pages/Gallery/GalleryPhotos'));
const Contacts = lazy(() => import('./pages/Сontacts'));
const Messages = lazy(() => import('./pages/Messages'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="spinner">LOADING...</div>}>
        <Container>
          <Row>
            <Col>
              <TopNavigation />
              <main>
                <Routes>
                  <Route path="/" element={<About />} />
                  <Route path="/gallery" element={<GalleryPhotos />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/contacts/:id" element={<Contacts />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/messages/:id" element={<Messages />} />
                </Routes>
              </main>
            </Col>
          </Row>
        </Container>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
