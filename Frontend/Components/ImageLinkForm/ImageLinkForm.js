import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm=({handleInputChange,handleSubmit})=> {
  return (
    <div>
      <div className='shadow-5 mw7 center pa2 br3 mt4 pa4'>
        <p className='f5 tc fw7 purple'>Insert your image URL below, submit, and watch the magic:</p>
        <div className='form-inline pa2'>
          <input type='search' placeholder='Insert URL here' 
          className='pa2 bg-transparent hover-bg-purple hover-white w-100 br3 ba' onChange={handleInputChange}/>
           <button className='f6 fl grow link ba bg-purple hover-bg-white hover-purple white b--purple pa4 mt4 mr2 pv2 dpi'
            onClick={handleSubmit}>Submit
            </button>

        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;