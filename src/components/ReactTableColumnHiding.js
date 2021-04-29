import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'
import { useTable } from 'react-table'
import Modal from 'react-modal'

import './ReactTable.css'

const modalCustomStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: 0,
        width: '500px',
    }
}

Modal.defaultStyles.overlay.backgroundColor = 'rgba(191, 191, 191, 0.3)'

const ColumnsPopup = ({isOpen, handleClose, allColumns}) => {
    return (
        <Modal
            ariaHideApp = { false }
            isOpen = { isOpen }
            onRequestClose = { handleClose }
            style = { modalCustomStyles }        
        >
            {allColumns.map(column => (
                <div key = { column.id }>
                    <label>
                        <input type = 'checkbox' { ...column.getToggleHiddenProps() } />{' '}
                        {column.id}
                    </label>
                </div>
            ))}
        </Modal>
    )
}


// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return <input
          ref = { resolvedRef } type = 'checkbox'
          { ...rest }
             />
    }
)

const PlanetsTable = ({ columns, planetList: data, isLoading, fetchPlanetList }) => {
    const [isOpen, setIsOpen] = useState(false)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps
    } = useTable(
        {
            columns,
            data,
        },
    )
    
    useEffect(() => {
        fetchPlanetList()
    },[fetchPlanetList])

    return (
        <div className = 'people-table'>
            <div>
                <IndeterminateCheckbox { ...getToggleHideAllColumnsProps() } />
            </div>
            <button onClick = { () => setIsOpen(prevVal => !prevVal) }>Open Popup</button>
            {
                isOpen &&
                <ColumnsPopup 
                    allColumns = { allColumns }
                    handleClose = { () => setIsOpen(false) }
                    isOpen = { isOpen }
                />
            }
            <br />
            <table { ...getTableProps() }>
                <thead>
                    {headerGroups.map((headerGroup, headerIndex) => (
                        <tr
                            { ...headerGroup.getHeaderGroupProps() }
                            key = { headerIndex }
                        >
                            {headerGroup.headers.map((column, columnIndex) => {
                            return (
                                <th
                                    key = { columnIndex } { ...column.getHeaderProps() }
                                    width = { column.width }
                                >
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

const ReactTableColumnHiding = () => {
    const [planetList, setPlanetList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    let fetchPlanetList = useCallback(() => {
        let fetchPlanet = async () => {
            try {
                setIsLoading(true)
                let response = await axios.get(`https://swapi.dev/api/planets/`)
                setPlanetList(response.data.results)
                setIsLoading(false)
            } catch (err) {
                // eslint-disable-next-line no-undef
                console.log('Error:', err)
            }
        }
        fetchPlanet()
    },[]) 

    let columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                width: '20%',
            },
            {
                Header: 'Climate',
                accessor: 'climate',
                width: '15%',
            },
            {
                Header: 'Diameter',
                accessor: 'diameter',
                width: '10%',
                disableFilters: true
            },
            {
                Header: 'Gravity',
                accessor: 'gravity',
                width: '15%',
                disableFilters: true
            },
            {
                Header: 'Population',
                accessor: 'population',
                width: '15%',
                disableFilters: true
            },
            {
                Header: 'Terrain',
                accessor: 'terrain',
                width: '13%',
                disableFilters: true
            },
            {
                Header: 'Surface Water',
                accessor: 'surface_water',
                width: '12%',
                disableFilters: true
            },
        ],
        [],
    )

    return (
        <PlanetsTable
            columns = { columns }
            fetchPlanetList = { fetchPlanetList }
            isLoading = { isLoading }
            planetList = { planetList }
        />
    )
}

export default ReactTableColumnHiding
