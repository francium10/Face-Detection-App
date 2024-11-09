import React from 'react';
import './FaceRecognition.css';

function FaceRecognition({ imageUrl, boxes }) {
  return (
    <div className='tc ma4 center mw-50'>
      <div className='faces'>
        <img className='shadow-5 br3' src={imageUrl} alt='' id='inputImage' />
        {
          // Map through each box and render a div for each
          boxes.map((box, index) => (
            <div
              key={index}
              className='bounding-box'
              style={{top: box.top,right: box.right,left: box.left,bottom: box.bottom}}></div>
          ))
        }
      </div>
    </div>
  );
}

export default FaceRecognition;