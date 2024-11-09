import React from 'react';
import brain from './brain.png'
import Tilt from 'react-parallax-tilt';


const Logo=()=>{
  return(
    <div className="Logo ma4 mt0">
      <Tilt className='Tilt br3 shadow-2' options={{max:55 }} style={{ width:'150px', height:'150px'}}>
      <div className='pa3' >
             <img src={brain} alt='logo' style={{paddingTop:"5px"}}/> 
          </div>
      </Tilt>
    </div>
  )
}

export default Logo;