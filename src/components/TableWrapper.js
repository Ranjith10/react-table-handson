import React from 'react'
import { Route, useHistory } from 'react-router-dom'

import ReactTable from './ReactTable'
import TableContent from './TableContent'
import './TableWrapper.css'

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
            <Route exact path = '/react-table'><ReactTable /></Route>
            <Route exact path = '/'><TableContent /></Route>
            <Route exact path = '/'><TableContent /></Route>
            <Route exact path = '/'><TableContent /></Route>      
        </>
    )
}

export default TableWrapper
