// Encryption utility - encrypts and decrypts asset content
const crypto = require('crypto');

// Algorithm for encryption
const ALGORITHM = 'aes-256-cbc';
// Key must be 32 characters (256 bits)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default32characterencryptionkey1';

// Function to encrypt text
const encrypt = (text) => {
  // Create a random initialization vector (IV)
  // IV ensures same text encrypts to different values each time
  const iv = crypto.randomBytes(16);
  
  // Create cipher with our algorithm, key, and IV
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  
  // Encrypt the text
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Return both encrypted text and IV (IV is needed for decryption)
  return {
    encryptedData: encrypted,
    iv: iv.toString('hex')
  };
};

// Function to decrypt text
const decrypt = (encryptedData, iv) => {
  // Create decipher with algorithm, key, and the same IV used for encryption
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(iv, 'hex')
  );
  
  // Decrypt the data
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

module.exports = { encrypt, decrypt };