import { render } from 'react-dom';

// Styles
import 'antd/lib/layout/style/css';
import '../public/stylus/main.styl';

// Router
import router from './router';

render(router, document.querySelector('#root'));
