import React from 'react'

function PlaceHolder({count}) {

    let bar = Array(count).fill()
  
  return (
    bar.map((val, i)=>{
        return <div key={i} className="notes-placeholder-bar"></div>
    })
  )
}

export default PlaceHolder