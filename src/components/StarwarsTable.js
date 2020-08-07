import React, { useState, useEffect, useMemo } from 'react'

import axios from 'axios'
import { useTable } from 'react-table'
import './StarwarsTable.css'

const PeopleTable = ({columns, peopleList: data, peopleCount}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data
    })

    return (
        <>
            <table { ...getTableProps } className = 'people-table'>
                <thead>
                    {
                        headerGroups.map((headerGroup, headerIndex) => (
                            <tr { ...headerGroup.getHeaderGroupProps() } key = { headerIndex }>
                                {
                                    headerGroup.headers.map((column, columnIndex) => {
                                        return (
                                            <th key = { columnIndex }>
                                                {column.render('Header')}
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody { ...getTableBodyProps }>
                    {
                        rows.map((row,rowIndex) => {
                            prepareRow(row)
                            return (
                                <tr { ...row.getRowProps() } key = { rowIndex }>
                                    {
                                        row.cells.map((cell, cellIndex) => {
                                            return (
                                                <td key = { cellIndex }>
                                                    {cell.render('Cell')}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    
                    }
                </tbody>
            </table>
        </>
    )
}

const StarwarsTable = () => {
    const [peopleList, setPeopleList] = useState([])
    const [peopleCount, setPeopleCount] = useState(0)

    useEffect(() => {
        let fetchPeopleList = async () => {
            let response = await axios.get(`https://swapi.dev/api/people/`)
            setPeopleList(response.data.results)
            setPeopleCount(response.data.count)
        }
        fetchPeopleList()
    }, [])

    let columns = useMemo(() => [
        {
            Header: 'Name',
            accessor: 'name' 
        },
        {
            Header: 'Gender',
            accessor: 'gender' 
        },
        {
            Header: 'Height',
            accessor: 'height' 
        },
        {
            Header: 'Mass',
            accessor: 'mass' 
        },
        {
            Header: 'Hair Color',
            accessor: 'hair_color' 
        },
        {
            Header: 'Skin Color',
            accessor: 'skin_color' 
        },
        {
            Header: 'Eye Color',
            accessor: 'eye_color' 
        },
    ],[])

    return (
        <div className = 'table-container'>
            <div className = 'table-container-title'>Star Wars People </div>
            <PeopleTable 
                columns = { columns }
                peopleCount = { peopleCount }
                peopleList = { peopleList }
            />
        </div>
    )
}

export default StarwarsTable
