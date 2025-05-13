
import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (imageFile) => {
  const result = await Tesseract.recognize(imageFile, 'eng', {
    logger: (m) => console.log(m),
  });
  return result.data.text;
};

export const parseReceiptText = (text) => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  const data = {
    storeName: lines[0],
    date: '',
    total: '',
    items: [],
  };

  lines.forEach(line => {
    if (!data.date && /\d{2}[\/\-]\d{2}[\/\-]\d{2,4}/.test(line)) {
      data.date = line.match(/\d{2}[\/\-]\d{2}[\/\-]\d{2,4}/)[0];
    }

    if (!data.total && /total/i.test(line)) {
      const amount = line.match(/[\d.,]+/);
      if (amount) data.total = amount[0];
    }

    const itemMatch = line.match(/(.+)\s+([\d.,]+)$/);
    if (itemMatch) {
      data.items.push({ name: itemMatch[1], price: itemMatch[2] });
    }
  });

  return data;
};
