import { render } from 'react-dom';

// Styles
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import layoutCSS from 'antd/lib/layout/style/css';
import css from '../public/stylus/main.styl';

// Router
import router from './router';

render(router, document.querySelector('#root'));
