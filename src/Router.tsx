import { Route, Routes } from 'react-router-dom';
import Event from '@/pages/Event';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/event/lesson/:slug" element={<Event />} />
        </Routes>
    );
}

const Home = () => <a href="/event">Evento</a>;
