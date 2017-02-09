import { Services } from 'app/services';

export function init(services: Services): State {
  return State.init();
};

export class State {
  public readonly counter: number;

  public static init() {
    return new State(0);
  }

  constructor(counter: number) {
      this.counter = counter;
  }

  get transitions() {
    return [
      {on: Increment, do: (event: Increment, services: Services) =>
        this.update(this.counter + 1)},
      {on: Decrement, do: (event: Decrement, services: Services) =>
        this.update(this.counter - 1)}
    ];
  }

  private update(counter) {
    return new State(counter);
  }
}

// Events

export class Increment {}
export class Decrement {}
