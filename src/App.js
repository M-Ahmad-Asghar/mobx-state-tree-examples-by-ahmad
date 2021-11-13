import "./App.css";
import { observer } from 'mobx-react';
import appState from './store/model/Models'

const App = observer(({ appState }) => {
  return (
    <div>
      <h2>{appState.count}</h2>
      <button onClick={appState.incCounter} >Inc Counter</button>
      <button onClick={appState.decCounter} >Dec Counter</button>
    </div>
  )
})

export default App;
