import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import TableContent from './components/TableContent'
import StarwarsTable from './components/StarwarsTable'

function App() {
    return (
        <Router>
            <Route 
                exact
                path = '/'
            >
                <TableContent />
            </Route>
            <Route 
                exact
                path = 'react-table'
            >
                <StarwarsTable />
            </Route>
        </Router>
    )
}

export default App
