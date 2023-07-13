import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Global } from './styles/newsStyles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <Global />
    <App />
  </>,
);
