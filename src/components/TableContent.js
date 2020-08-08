import React from 'react'
import { NavLink } from 'react-router-dom'

import './TableContent.css'

const TableContent = () => {
    return (
        <div className = 'app-container'>
            <div className = 'app-container-title'>React Table</div>
            <div className = 'app-container-subtitle'>Star Wars</div>
            <div className = 'app-content-listing'>
                <NavLink to = '/react-table'>React Table Basic Version</NavLink>
                <NavLink to = '/react-table'>React Table - Pagination </NavLink>
                <NavLink to = '/react-table'>React Table - Server Side Pagination</NavLink>
                <NavLink to = '/react-table'>React Table - Sorting Columns</NavLink>
                <NavLink to = '/react-table'>React Table - Virtualized Rows </NavLink>
            </div>
        </div>
    )
}

export default TableContent
