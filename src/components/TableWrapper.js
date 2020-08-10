import React from 'react'
import { Route, useHistory, Switch } from 'react-router-dom'

import ReactTable from './ReactTable'
import TableContent from './TableContent'
import './TableWrapper.css'
import ReactTableControlledPagination from './ReactTableControlledPagination'
import GenericNotFound from '../GenericNotFound'
import ReactTablePagination from './ReactTablePagination'

const TableWrapper = () => {
    const history = useHistory()
    const handleBack = () => {
        history.push('/')
    }
    
    return (
        <>  
            <div className = 'button-wrapper'>
                <button className = 'go-back' onClick = { handleBack }>
                    Go To Home
                </button>
            </div>      
            <Switch>
                <Route exact path = '/react-table'><ReactTable /></Route>
                <Route exact path = '/react-table-controlled-pagination'><ReactTableControlledPagination /></Route>
                <Route exact path = '/react-table-pagination'><ReactTablePagination /></Route>
                <Route exact path = '/'><TableContent /></Route>      
                <Route path = '*'> <GenericNotFound /> </Route>
            </Switch>
        </>
    )
}

export default TableWrapper
