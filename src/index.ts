import { normalize, setupPage } from 'csstips';
import { percent } from 'csx';
import { App } from 'futura-dom';
import { cssRule, forceRenderStyles } from 'typestyle';

import { init as servicesInit } from 'app/services';
import { init as stateInit } from 'app/state';
import { view } from 'app/view';

normalize();
setupPage('#root');
cssRule('body', {
  fontSize: percent(100),
  overflow: 'hidden' // avoid overscroll
});

const app = new App(stateInit, servicesInit, view);
app.embed(document.getElementById('root') as Element);
forceRenderStyles();
