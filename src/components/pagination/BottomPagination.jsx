import React from 'react'

function BottomPagination({page,setPage,limit,setLimit}) {
  return (
    <div className='p-2'>
      Number of rows 
      <select
        className=' ml-2 focus:outline-0 p-1'
      >
        <option>
            10
        </option>
        
        <option>
            20
        </option>

        <option>
            25
        </option>

      </select>
    </div>
  )
}

export default BottomPagination
