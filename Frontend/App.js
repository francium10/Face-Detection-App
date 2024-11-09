import React from 'react';
import ReactDOM from 'react-dom/client';
import ParticlesBg from 'particles-bg';
import 'tachyons';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'; 
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import {useState } from "react";

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
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState('SignIn');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  });

  const handleLoadUser = (data) => {
    // Use the response data to populate user details
    setUser({
      id: data.id,
      name: data.name || "Guest", // set a custom name if not present
      email: data.email,
      entries: data.entries,
      joined: data.joined
    });
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    console.log("Input changed:", event.target.value);
  };

  const calculateFaceLocation = (data) => {
    if (data.outputs && data.outputs[0].data.regions) {
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);

      const boxes = data.outputs[0].data.regions.map(region => {
        const box = region.region_info.bounding_box;
        return {
          left: box.left_col * width,
          top: box.top_row * height,
          right: width - (box.right_col * width),
          bottom: height - (box.bottom_row * height)
        };
      });
      setBoxes(boxes);
    } else {
      console.log("No faces detected.");
      setBoxes([]);
    }
  };

  const handleSubmit = (event) => {
    setImageUrl(input);
    event.preventDefault();
    console.log("Button submitted!");

    fetch("https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs",
      ReturnClarifaiRequestOptions(input))
      .then(response => response.json())
      .then(response => calculateFaceLocation(response))
      .then(() =>
        fetch("http://localhost:3000/image", {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: user.id })
        })
      )
      .then(response => response.json())
      .then(count => {
        setUser(prevUser => ({
          ...prevUser,
          entries: count,  // Update the entries count from backend
        }));
      })
      .catch(error => console.log(error));
  };

  const handleRoute = (route) => {
    if (route === 'SignOut') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className='App'>
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation handleRoute={handleRoute} isSignedIn={isSignedIn} />
      {route === 'home' ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
          <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
        </div>
      ) : (
        route === 'SignIn' ? (
          <SignIn handleRoute={handleRoute} handleLoadUser={handleLoadUser}  />
        ) : (
          <Register handleRoute={handleRoute} handleLoadUser={handleLoadUser} />
        )
      )}
    </div>
  );
};

const divElement = ReactDOM.createRoot(document.getElementById("root"));
divElement.render(<App />);

// https://media.istockphoto.com/id/498240967/photo/faces-of-india.jpg?s=612x612&w=0&k=20&c=pF2c0nF8ehYb-Zm7f2DYXpxB21ruP1zGRvOLLoEDQtY=