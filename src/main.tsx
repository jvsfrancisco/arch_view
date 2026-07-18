import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from './lib/theme'
import { Layout } from './components/Layout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Inspections from './pages/Inspections'
import InspectionDetail from './pages/InspectionDetail'
import PhotoRegistry from './pages/PhotoRegistry'
import Issues from './pages/Issues'
import Schedule from './pages/Schedule'
import Reports from './pages/Reports'
import ClientArea from './pages/ClientArea'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/projetos/:id" element={<ProjectDetail />} />
            <Route path="/vistorias" element={<Inspections />} />
            <Route path="/vistorias/:id" element={<InspectionDetail />} />
            <Route path="/registro" element={<PhotoRegistry />} />
            <Route path="/pendencias" element={<Issues />} />
            <Route path="/cronograma" element={<Schedule />} />
            <Route path="/relatorios" element={<Reports />} />
            <Route path="/cliente" element={<ClientArea />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
