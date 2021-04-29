import React from 'react'
import { NavLink } from 'react-router-dom'

import './TableContent.css'

const TableContent = () => {
    return (
        <div className = 'app-content-listing'>
            <NavLink to = '/react-table'>React Table Basic Version</NavLink>
            <NavLink to = '/react-table-pagination'>React Table - Pagination </NavLink>
            <NavLink to = '/react-table-controlled-pagination'>React Table - Server Side Pagination</NavLink>
            <NavLink to = '/react-table-sorting'>React Table - Sorting Columns</NavLink>
            <NavLink to = '/react-table-filtering'>React Table - Filtering </NavLink>
            <NavLink to = '/react-table-controlled-filtering'>React Table - Server side Filtering </NavLink>            
            <NavLink to = '/react-table-vitualized-rows'>React Table - Virtualized Rows </NavLink>
        </div>
    )
}

export default TableContent
