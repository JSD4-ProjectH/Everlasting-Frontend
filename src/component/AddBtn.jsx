import React from 'react'
import Button from 'react-bootstrap/esm/Button'


function AddBtn() {
  return (
    <div>
    <a href='/AddActivity/data'>
    <Button className='addbtnleft'>
      <span className='plussymbol'>+</span>
      <span className='addtext'><i className="fa-regular fa-square-plus" />  Add Activity</span>
    </Button>
    </a>
    </div>
  )
}

export default AddBtn