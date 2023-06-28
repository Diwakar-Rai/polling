import React from "react";

const ImageDisplay = ({ byteArray }) => {
  const stringToByteArray = byteString => {
    if (byteString) {
      const binaryString = window.atob(byteString);
      const length = binaryString.length;
      const byteArray = new Uint8Array(length);
      for (let i = 0; i < length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
      }
      return byteArray;
    }
  };

  const byteArrayToDataURL = byteArray => {
    const blob = new Blob([byteArray], { type: "image/jpeg" });
    const dataURL = URL.createObjectURL(blob);
    return dataURL;
  };

  const binaryByteArray = stringToByteArray(byteArray);

  return (
    <img
      src={byteArrayToDataURL(binaryByteArray)}
      alt="Uploaded Image"
      style={{ width: 200, height: 200 }}
    />
  );
};

export default ImageDisplay;
