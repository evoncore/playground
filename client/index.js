import { render } from 'react-dom';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/stylus/main.styl';

// Router
import router from './router';

render(router, document.querySelector('#root'));
