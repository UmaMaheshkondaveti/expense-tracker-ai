
import React, { useState } from 'react';
import { extractTextFromImage, parseReceiptText } from '../utils/receiptParser';

function Upload() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setParsedData(null);
  };

  const handleProcess = async () => {
    if (!image) return;
    setLoading(true);
    const text = await extractTextFromImage(image);
    const data = parseReceiptText(text);
    setParsedData(data);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Receipt</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
        onClick={handleProcess}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Extract Info'}
      </button>

      {parsedData && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p><strong>Store:</strong> {parsedData.storeName}</p>
          <p><strong>Date:</strong> {parsedData.date}</p>
          <p><strong>Total:</strong> {parsedData.total}</p>
          <h4 className="font-bold mt-2">Items:</h4>
          <ul>
            {parsedData.items.map((item, index) => (
              <li key={index}>{item.name} - ₹{item.price}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Upload;
