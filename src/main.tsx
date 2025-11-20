import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import 'flowbite';
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      
        <App />
      
    </Provider>
  </StrictMode>,
)