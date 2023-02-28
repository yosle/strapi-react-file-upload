import React from "react";
import "./styles.css";
import FileUploads from "./FileUploads";

export default function App() {
  return (
    <div className="App">
      <h1>Strapi File Upload Hook</h1>
      <FileUploads />
    </div>
  );
}
