import { render } from 'react-dom';

// Styles
import '../public/stylus/main.styl';

// Router
import router from './router';

render(router, document.querySelector('#root'));
