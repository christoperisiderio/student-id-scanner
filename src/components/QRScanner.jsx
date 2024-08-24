import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import QrScanner from "qr-scanner";

const QRScanner = ({ onScan }) => {
  const [scanResult, setScanResult] = useState("");

  const handleScan = (result) => {
    if (result) {
      setScanResult(result.text);
      onScan(result.text); // Pass the result to the parent component
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageDataUrl = URL.createObjectURL(file);
      const result = await QrScanner.scanImage(imageDataUrl);
      if (result) {
        setScanResult(result);
        onScan(result);
      } else {
        console.error("No QR code found in the image");
      }
      URL.revokeObjectURL(imageDataUrl); // Clean up the object URL
    }
  };

  return (
    <div>
      <h2>QR Code Scanner</h2>
      <QrReader
        onResult={handleScan}
        onError={handleError}
        style={{ width: "100%" }}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {scanResult && (
        <div>
          <p>Scanned Result: {scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
