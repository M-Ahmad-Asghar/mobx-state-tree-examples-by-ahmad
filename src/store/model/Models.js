import { observable, action } from 'mobx';
// useStrict(true)

const appState = observable({
  count: 0,
  decCounter:action("dabc", function() {
    appState.count -= 1;
  }),
  incCounter: action(function () {
    appState.count += 1;
  })
})
export default appState;