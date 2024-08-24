import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const Scanner = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    onCapture(imageSrc);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      onCapture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <button onClick={capture}>Capture from Webcam</button>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && <img src={image} alt="Captured ID" />}
    </div>
  );
};

export default Scanner;
