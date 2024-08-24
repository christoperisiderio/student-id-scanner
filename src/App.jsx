import React, { useState } from "react";
import QRScanner from "./components/QRScanner";
import ExportToExcel from "./components/ExportToExcel";

function App() {
  const [scans, setScans] = useState([]);

  const handleQRCodeScan = (qrCodeData) => {
    const scanData = {
      type: "qrCode",
      content: qrCodeData,
      date: new Date().toLocaleString(),
    };
    setScans([...scans, scanData]);
  };

  return (
    <div>
      <h1>Student ID QR Code Scanner</h1>
      <QRScanner onScan={handleQRCodeScan} />
      <ExportToExcel data={scans} />
      <ul>
        {scans.map((scan, index) => (
          <li key={index}>
            <p>QR Code Data: {scan.content}</p>
            <p>{scan.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
