import { useContext, useState } from 'react';
import './App.scss';
import List from './components/List';
import Tree from './components/Tree';
import { initMirageServer } from './server/employees';
import DataProvider, { DataContext } from './context/DataContext';

function App() {

  // const [filter, setFilter] = useState("-1");
  const { filter, filteredEmployees, updateEmployee, error, loading} = useContext(DataContext);
  // const [employees, setEmployees] = useState(true);


  if (process.env.NODE_ENV === 'development') {
    console.log('dev mode');
    initMirageServer({ environment: 'development' });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Employee Chart</p>
      </header>
      <section className={loading ? "App-body Loading" : "App-body"}>
        {error ? <p>{error.message}</p> : null}
        {loading ? <div className='Loading-background'></div> : null}
        <div className="Panel-container">
          <DataProvider value={filteredEmployees}>
            <div className="Panel-one">
              <List />
            </div>
            <div className="Panel-two">
              <Tree filter={filter} data={filteredEmployees} />
            </div>
          </DataProvider>
        </div>
      </section>
    </div>
  );
}

export default App;
