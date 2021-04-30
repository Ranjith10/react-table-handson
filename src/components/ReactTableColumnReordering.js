import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'
import { useTable, useColumnOrder } from 'react-table'

import './ReactTable.css'

const shuffle = (arr) => {
    arr = [...arr]
    const shuffled = []
    while (arr.length) {
      const rand = Math.floor(Math.random() * arr.length)
      shuffled.push(arr.splice(rand, 1)[0])
    }
    return shuffled
}

const FilmsTable = ({ columns, filmsList: data, isLoading, fetchFilmsList }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        setColumnOrder,
        state,
    } = useTable(
        {
            columns,
            data,
        },
        useColumnOrder
    )

    const randomizeColumns = () => {
        setColumnOrder(shuffle(visibleColumns.map(d => d.id)))
    }
    
    useEffect(() => {
        fetchFilmsList()
    },[fetchFilmsList])

    return (
        <div className = 'people-table'>
            <button onClick = { () => randomizeColumns({}) }>Randomize Columns</button>
            <table { ...getTableProps() }>
                <thead>
                    {headerGroups.map((headerGroup, headerIndex) => (
                        <tr
                            { ...headerGroup.getHeaderGroupProps() }
                            key = { headerIndex }
                        >
                            {headerGroup.headers.map((column, columnIndex) => {
                            return (
                                <th key = { columnIndex } { ...column.getHeaderProps() }>
                                    {column.render('Header')}
                                </th>
                            )
                        })}
                        </tr>
                ))}
                </thead>
                <tbody { ...getTableBodyProps() }>
                    {!isLoading && (
                    rows.map((row, rowIndex) => {
                        prepareRow(row)
                        return (
                            <tr { ...row.getRowProps() } key = { rowIndex }>
                                {row.cells.map((cell, cellIndex) => {
                                    return (
                                        <td key = { cellIndex }>
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

const ReactTableColumnReordering = () => {
    const [filmsList, setFilmsList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    let fetchFilmsList = useCallback(() => {
        let fetchFilms = async () => {
            try {
                setIsLoading(true)
                let response = await axios.get(`https://swapi.dev/api/films/`)
                setFilmsList(response.data.results)
                setIsLoading(false)
            } catch (err) {
                // eslint-disable-next-line no-undef
                console.log('Error:', err)
            }
        }
        fetchFilms()
    },[]) 

    let columns = useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Director',
                accessor: 'director',
            },
            {
                Header: 'Producer',
                accessor: 'producer',
            },
            {
                Header: 'Release Date',
                accessor: 'release_date',
            },
            {
                Header: 'Episode Number',
                accessor: 'epsiode_id',
            },

        ],
        [],
    )

    return (
        <FilmsTable
            columns = { columns }
            fetchFilmsList = { fetchFilmsList }
            filmsList = { filmsList }
            isLoading = { isLoading }
        />
    )
}

export default ReactTableColumnReordering
