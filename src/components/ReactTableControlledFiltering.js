import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'
import { useTable, useFilters, useAsyncDebounce } from 'react-table'

import './ReactTable.css'

const ShipsTable = ({columns, shipList: data, isLoading, fetchShipsList }) => {

    const DefaultColumnFilter = ({column}) => {
        const {Header, filterValue, setFilterValue} = column
        return (
            <input 
                onChange = { useAsyncDebounce(value => {setFilterValue(value)}, 200) }
                placeholder = { `${Header}` }  
                type = 'text'
                value = { filterValue || '' }          
            />
        )
    }

    const defaultColumn = useMemo(() => ({
        Filter: DefaultColumnFilter,
    }), [])

    const {
       getTableProps,
       getTableBodyProps,
       headerGroups,
       rows,
       prepareRow
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            manualFilters: true,
        },
        useFilters
    )

    useEffect(() => {
        fetchShipsList()
    },[fetchShipsList])

    return (
        <div className = 'people-table'>
            <table { ...getTableProps() }>
                <thead>
                    {
                        headerGroups.map((headerGroup, headerIndex) => {
                            return (
                                <tr { ...headerGroup.getHeaderGroupProps() } key = { headerIndex }>
                                    {headerGroup.headers.map((column, index) => {
                                        return (
                                            <th { ...column.getHeaderProps() } key = { index }>
                                                {column.render('Header')}
                                                {column.canFilter ? column.render('Filter') : null}
                                            </th>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    }
                </thead>
                <tbody { ...getTableBodyProps() }>
                    {!isLoading && (
                        rows.map((row, rowIndex) => {
                            prepareRow(row)                            
                            return (
                                <tr key = { rowIndex } { ...row.getRowProps() }>
                                    {row.cells.map((cell, cellIndex) => {
                                        return (
                                            <td key = { cellIndex } { ...cell.getCellProps() }>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                        )}
                </tbody>
            </table>
            {
                isLoading && <Skeleton
                    count = { 10 } height = { 50 }
                    width = { '100%' }
                             />
            }
        </div>
    )
}  

const ReactTableControlledFiltering = () => {
    const [starShips, setStarShips] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState('')
    const [consumable, setConsumable] = useState('')

    let fetchShipsList = useCallback(() => {
        let fetchShips = async () => {
            try {
                setIsLoading(true)
                let response = await axios.get(`https://swapi.dev/api/starships/`)
                setStarShips(response.data.results)
                setIsLoading(false)
            } catch (err) {
                // eslint-disable-next-line no-undef
                console.log('Error:', err)
            }
        }
        fetchShips()
    },[]) 

    let columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                width: '20%',
                filterValue: name,
                setFilterValue: setName,
            },
            {
                Header: 'Consumables',
                accessor: 'consumables',
                width: '15%',
                filterValue: consumable,
                setFilterValue: setConsumable,
            },
            {
                Header: 'Crew',
                accessor: 'crew',
                width: '10%',
                disableFilters: true
            },
            {
                Header: 'Length',
                accessor: 'length',
                width: '15%',
                disableFilters: true
            },
            {
                Header: 'Passengers',
                accessor: 'passengers',
                width: '15%',
                disableFilters: true
            },
            {
                Header: 'MGLT',
                accessor: 'MGLT',
                width: '13%',
                disableFilters: true
            },
            {
                Header: 'Rating',
                accessor: 'hyperdrive_rating',
                width: '12%',
                disableFilters: true
            },
        ],
        [],
    )

    return (
        <div>
            <ShipsTable
                columns = { columns }
                fetchShipsList = { fetchShipsList }
                isLoading = { isLoading }
                shipList = { starShips }
            /> 
        </div>
    )
}

export default ReactTableControlledFiltering
