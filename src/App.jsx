import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Surat, Doa, JadwalSholat, SharedLayout } from './pages/Main';
import { Landing, Error } from './pages';
import OpenSurat from './components/OpenSurat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Surat />} />
          <Route path="surat/:id" element={<OpenSurat />} />
          <Route path="doa" element={<Doa />} />
          <Route path="jadwal-sholat" element={<JadwalSholat />} />
          <Route path="landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
