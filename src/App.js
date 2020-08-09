import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import TableContent from './components/TableContent'
import TableWrapper from './components/TableWrapper'
import GenericNotFound from './GenericNotFound'

function App() {
    return (
        <Router>
            <div className = 'app-container'>
                <div className = 'app-container-title'>React Table</div>
                <div className = 'app-container-subtitle'>Star Wars</div>
                <Switch>
                    <Route exact path = '/'><TableContent /></Route>
                    <Route component = { GenericNotFound } path = '*' />
                    <TableWrapper />
                </Switch>
            </div>
        </Router>
    )
}

export default App
