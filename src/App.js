import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Add from './component/add';
import Edit from './component/edit';
import List from './component/list';

 const App = () => {

   return (
    <>
      <Switch>
        <Route exact path='/' component={()=> <List/>} />
        <Route exact path='/add-user' component={()=> <Add/>} />
        <Route exact path='/edit-user/:id' component={()=> <Edit/>} />
      </Switch>
    </>
  )
}

export default App