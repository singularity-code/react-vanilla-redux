// select DOM
const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

// action names
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// action creation functions
const toggleSwitch = () => ({
  type: TOGGLE_SWITCH,
});
const increase = (difference) => ({
  type: INCREASE,
  difference,
});
const decrease = () => ({
  type: DECREASE,
});

// set default values
const initState = {
  toggle: false,
  counter: 0,
};

// reducer get state and action as a params
function reducer(state = initState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // keep the immutable
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

// create store
import { createStore } from "redux";

const store = createStore(reducer);

const render = () => {
  const state = store.getState(); // get current state
  // Process toggle
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  // process counter
  counter.innerText = state.counter;
};

render();
// subscribe
store.subscribe(render);

// trigger action
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};

btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
