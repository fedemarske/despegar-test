import React, { useState, useEffect } from 'react';
import { Table, Form, FormGroup, Label, Input } from 'reactstrap';
import PaginationDataGrid from './PaginationDataGrid'
import ArrowDown from '../assets/down-arrow.svg';
import ArrowUp from '../assets/up-arrow.svg';

const getValue = (content, dataItem, customHandlers) => {
  if(typeof content === 'string') {
    const path = content.split('.')
    return dataItem[path[0]][path[1]]
  } else if(typeof content === 'function') {
    return content(dataItem, customHandlers)
  } else if(typeof content === 'object') {
    const CustomComp = content.template
    return <CustomComp rowData={dataItem} customHandlers={customHandlers}/>
  }
}

const getRowsWithData = (columns, data, customHandlers) => {
  return data.map( item => {
    let row = []
    columns.forEach((column) => {
      const value = getValue(column.content, item, customHandlers)
      row.push(value)
    })
    return row
  })
}

const getFilterFields = (columns) => {
  return columns.map( (column, index) => {
    return { 
      name: column.title,
      value: null,
      indexColmn: index,
      filter: column.filter
    }
  }).filter(column => column.filter)
}

const getFilteredRows = (rows, value, index) => {
  return rows.filter((row) => {
    return row[index].toString().toLowerCase().indexOf(value.toLowerCase()) !== -1;
  })
}

const DataGrid = ({
  data,
  itemsPerPage,
  columns,
  customHandlers
}) => {
  const [rows, setRows] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageRows, setCurrentPageRows] = useState([])
  const [sortableColumns, setSortableColumns] = useState([])
  const [filteredDeliveries, setFilteredDeliveries] = useState([])
  const [fields, setFields] = useState([{ value: null }]);

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;

  useEffect(() => {
    const rowsData = getRowsWithData(columns, data, customHandlers)
    const filterFields = getFilterFields(columns)
    const sortablesFiltered = columns
      .filter(column => column.sortable)
    if(sortablesFiltered.length !== 0) {
      const sortables = sortablesFiltered.map(sortItem => { return { name: sortItem.title, order: 'desc' }})
      setSortableColumns(sortables)
    }
    setRows(rowsData)
    setFilteredDeliveries(rowsData)
    setFields(filterFields)
  }, [data])

  useEffect(() => {
    if(filteredDeliveries) {
      const currentItems = filteredDeliveries.slice(firstItem, lastItem)
      setCurrentPageRows(currentItems)
    }
  }, [rows, currentPage, sortableColumns, filteredDeliveries])

  const sortColumn = (sortedColumn, index) => {
    if(sortedColumn && sortedColumn.length !== 0) {
      const isDesc = sortedColumn.order === 'desc'
      filteredDeliveries.sort((a,b) => {
        let result = ''
        if(!isDesc) {
          result = a[index].localeCompare(b[index]);
        } else {
          result = b[index].localeCompare(a[index]);
        }
        return result;
      })
      sortedColumn.order = isDesc ? 'asc' : 'desc'
      const newSortData = sortableColumns.filter( sorted => sorted.name !== sortedColumn.name)
      newSortData.push(sortedColumn)
      setSortableColumns(newSortData)
      setRows(filteredDeliveries)
    }
  }

  const handleFilter = (e, field, index) => {
    const values = [...fields];
    const currentValue = e.currentTarget.value
    const filteredData = getFilteredRows(rows, currentValue, field.indexColmn)
    values[index].value = currentValue;
    setFilteredDeliveries(filteredData)
    setFields(values);
  }

  return (
    <React.Fragment>
      {
        fields && fields.length !== 0 ? 
          <div className="filter">
            <Form inline>
              <span className="mr-5 title-filter">Filtros</span>
              { fields.map((field, index) => 
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0" key={index}>
                    <Label for={field.name} className="mr-sm-2">{field.name}</Label>
                    <Input type="text" name={field.name} id={field.name} onChange={(e) => handleFilter(e, field, index)} />
                  </FormGroup>
                )}
            </Form>
          </div> : null
      }

      <Table className="table-delivery" striped>
        <thead>
          <tr>
            {
              columns.map( (column, index) => {
                const isSortedColumn = sortableColumns.filter( sorted => sorted.name === column.title)
                const sortedColumn = isSortedColumn.length !== 0 ? isSortedColumn[0] : false
                return (
                <th 
                  className={ sortedColumn ? 'sortable-column' : ''} 
                  onClick={() => sortColumn(sortedColumn,index)} key={column.title}
                >
                  {column.title}
                  {sortedColumn ? 
                    <img src={sortedColumn.order === 'desc' ? ArrowDown : ArrowUp} width="16" height="16" alt="arrow" /> 
                      : null
                  }
                </th>
                )
              }
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            currentPageRows.map( (row, index) => 
              <tr key={index}>
                { row.map( (value, index) => <td key={index}>{value}</td>) }
              </tr>
            )
          }
        </tbody>
      </Table>
      <PaginationDataGrid 
        postsPerPage={itemsPerPage}
        totalPosts={filteredDeliveries.length}
        paginate={setCurrentPage}
      />
    </React.Fragment>
  );
}

export default DataGrid;