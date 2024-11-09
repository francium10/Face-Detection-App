// ====================NO BUGS Code ==============================

// Works upto ImageBox
import React from 'react';
import ReactDOM from 'react-dom/client';
import ParticlesBg from 'particles-bg';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'; 
import { useState } from "react";
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';

const ReturnClarifaiRequestOptions=(imageUrl)=>{
  const PAT = 'e9ee0d42b14146b49d8278ceb43caf86';
  const USER_ID = '1m12wok8v2rh';       
  const APP_ID = 'test';
  const MODEL_ID = 'face-detection'; 
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';  
  const IMAGE_URL = imageUrl

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": imageUrl
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
  return requestOptions
}

const App = () => {
  const [input, setInput] = useState('');
  const[imageUrl, setImageUrl]=useState('');
  const [box, setBox]=useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
    console.log("Input changed:", event.target.value);  
  };


  calculateFaceLocation = (data) => {
    const box = data.outputs[0].data.regions[0].region_info.bounding_box;
 
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height); //430 287
 
    const newBox = {
        left: box.left_col * width,
        top: box.top_row * height,
        right: width - (box.right_col * width),
        bottom: height - (box.bottom_row * height)
    }
    
    setBox(newBox)
  };

  const handleSubmit = (event) => {
    setImageUrl(input)
    event.preventDefault();  
    console.log("Button submitted!");

    fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/versions/" +"6dc7e46bc9124c5c8824be4822abe105"+ "/outputs", 
      ReturnClarifaiRequestOptions(input))
      .then(response => response.json())

      .then(response=>calculateFaceLocation(response))
      .catch(error => console.log(error));
    }

  return (
    <div className='App'>
      <ParticlesBg type="cobweb" bg={true} /> 
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
      <FaceRecognition imageUrl={imageUrl} box={box}/>
    </div>
  );
};

const divElement = ReactDOM.createRoot(document.getElementById("root"));
divElement.render(<App />);


// ======================FaceRecognition Component================================================================
import React from 'react';
import './FaceRecognition.css';

function FaceRecognition({ imageUrl, box }) {

  return (
    <div className='tc ma4 center mw-50'>
      <div className='faces'>
        <img className='shadow-5 br3' src={imageUrl} alt='' id='inputImage'/>
        <div className='bounding-box' style={{top:box.top, right: box.right, left:box.left, bottom:box.bottom}}></div>
      </div>
    </div>
  )
}

export default FaceRecognition;


//===================================Multiple Detections ===================================================

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    // Map through all detected regions
    const boxes = data.outputs[0].data.regions.map(region => {
        const box = region.region_info.bounding_box;
        return {
            left: box.left_col * width,
            top: box.top_row * height,
            right: width - (box.right_col * width),
            bottom: height - (box.bottom_row * height)
        };
    });

    setBoxes(boxes);  // update the state with the array of boxes
  }

  // ====================FaceRecognition Component=====================================================



  //============================================ Route for signing in ============================================
  // const [route,setRoute]=useState('SignIn')

  handleRoute=(route)=>{
    setRoute(route)}

  return (

    <div className='App'>
    <ParticlesBg type="cobweb" bg={true} /> 
    <Navigation handleRoute={handleRoute} />
    {route === 'SignIn' ? (
      <SignIn handleRoute={handleRoute} />
    ) : (
      <div>
        <Logo />
        <Rank />
        <ImageLinkForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
      </div>
    )}
  </div>
  
  );

  // Put the following in SignIn Component 
{handleRoute}
// onClick={()=>handleRoute('home')}

// Put the Following in Navigation Component
{handleRoute}
// onClick={()=>handleRoute('signIn')}