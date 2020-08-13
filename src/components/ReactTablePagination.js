import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'
import { useTable, usePagination } from 'react-table'

import './ReactTable.css'

const FilmsTable = ({ columns, filmsList: data, isLoading, fetchFilmsList }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        pageOptions,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: {pageSize: 5}
        },
        usePagination
    )
    
    useEffect(() => {
        fetchFilmsList()
    },[fetchFilmsList])

    return (
        <div className = 'people-table'>
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
                    page.map((row, rowIndex) => {
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
                !isLoading && 
                <div className = 'pagination'>
                    <button disabled = { !canPreviousPage } onClick = { () => gotoPage(0) }>
                        {'<<'}
                    </button>{' '}
                    <button disabled = { !canPreviousPage } onClick = { () => previousPage() }>
                        {'<'}
                    </button>{' '}
                    <button disabled = { !canNextPage } onClick = { () => nextPage() }>
                        {'>'}
                    </button>{' '}
                    <button disabled = { !canNextPage } onClick = { () => gotoPage(pageCount - 1) }>
                        {'>>'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    {/* <span>
                        | Go to page:{' '}
                        <input
                            defaultValue = { pageIndex + 1 }
                            onChange = { e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            } }
                            style = {{ width: '100px' }}
                            type = 'number'
                        />
                    </span>{' '}
                    <select
                        onChange = { e => {
                            setPageSize(Number(e.target.value))
                        } }
                        value = { pageSize }
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key = { pageSize } value = { pageSize }>
                                Show {pageSize}
                            </option>
                        ))}
                    </select> */}
                </div>
            }
            {
            isLoading && <Skeleton
                count = { 10 } height = { 50 }
                width = { '100%' }
                         />
        }
        </div>
    )
}

const ReactTablePagination = () => {
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

export default ReactTablePagination
