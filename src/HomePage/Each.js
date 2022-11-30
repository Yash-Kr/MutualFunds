import React from 'react'
import './Each.css'

function Each({day,ret}) {
  return (
    <div className='each'>
        <div className='one'> <h3 style={{display:"inline-block",margin:"0",color:"#379237"}}>{ret}%</h3> </div>
        <div className='two'>return</div>
        <div className='three'></div>
        <div className='four'>Day{day}</div>
    </div>
  )
}

export default Each