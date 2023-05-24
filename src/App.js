import { useContext } from 'react';
import './App.scss';
import List from './components/List';
import Tree from './components/Tree';
import DataProvider, { DataContext } from './context/DataContext';

function App() {

  const { filteredEmployees, error, loading} = useContext(DataContext);

  return (
    <div className="App">
      <header className="App-header">
        <h4>Employee Chart</h4>
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
              <Tree />
            </div>
          </DataProvider>
        </div>
      </section>
    </div>
  );
}

export default App;
