/* @refresh reload */
import { render } from 'solid-js/web';
import { enableRootsAutoattach, Debugger } from '@solid-devtools/debugger'

import './index.css';
import App from './App';

enableRootsAutoattach()


render(
  () => (
    <Debugger>
      <App />
    </Debugger>
  ),
  document.getElementById('root'),
)

