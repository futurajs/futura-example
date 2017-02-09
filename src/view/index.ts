import { Decrement, Increment, State } from 'app/state';
import { centerCenter } from 'csstips';
import { h } from 'futura-dom';
import { style } from 'typestyle';

export const view = (state: State, notify) =>
  h(`div.${styles.page}`, [
    h(`div.${styles.container}`, [
      button('-', decrement(notify)),
      counter(state.counter),
      button('+', increment(notify))
    ])
  ]);

const button = (label: string, onClick) =>
  h(`button.${styles.button}`, {on: {click: onClick}}, label);

const counter = (value: number) =>
  h(`div.${styles.counter}`, String(value));

// Events

const decrement = (notify) => (event) =>
  notify(new Decrement());

const increment = (notify) => (event) =>
  notify(new Increment());

// Styles

namespace styles {
  export const page = style(centerCenter, {
  });

  export const container = style({
    display: 'flex'
  });

  export const button = style({
    $nest: {
      '&:hover': {
        borderColor: '#ccccee'
      }
    },
    background: '#eeeeff',
    border: '1px solid #eeeeff',
    borderRadius: '2px',
    color: '#111122',
    outline: 'none'
  });

  export const counter = style({
    background: '#eeeeff',
    textAlign: 'center',
    lineHeight: '2em',
    width: '5em'
  });
}
