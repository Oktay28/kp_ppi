import React from 'react';
import Home from './components/Home';
import Header from './components/header/Header';
import {useQuery, gql} from '@apollo/client';

const g = gql`
  query {
  getProduct {
    name
    id
  }
}
`

function App() {

  const {data} = useQuery(g);

  return (
    <div className="App">
      <Header />
      {data && data.getProduct.name}
      <Home />
    </div>
  );
}

export default App;
