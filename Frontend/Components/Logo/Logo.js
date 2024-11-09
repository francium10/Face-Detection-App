import React from 'react';
// import Tilt from 'react-tilt';
import Tilt from 'react-parallax-tilt';
import logo from './logo_transparent.png';
// import logo from './brain.png'
import './Logo.css'

const Logo=()=>{
  return (
    
    <div className='extra'>
      <Tilt className="Tilt br2" options={{ max : 25, perspective: 400 }}>
        <div className="Tilt-inner"><img alt='logo' src={logo}/></div>
      </Tilt>
    </div>
  );
}

export default Logo;


// const Logo=()=>{
//   return(
//     <div className="Logo ma4 mt0">
//       <Tilt className='Tilt br3 shadow-2' options={{max:55 }} style={{ width:'150px', height:'150px'}}>
//       <div className='pa3' >
//              <img src={brain} alt='logo' style={{paddingTop:"5px"}}/> 
//           </div>
//       </Tilt>
//     </div>
//   )
// }

// export default Logo;