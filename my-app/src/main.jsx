import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainRouter from './routes/mainRouter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainRouter />
  </StrictMode>,
)
