const CryptoJS = require("crypto-js");

class Security{
    passphrase = "123";

    encrypt(plainText){
        return CryptoJS.AES.encrypt(plainText, this.passphrase).toString();
    };
    
    decrypt(ciphertext){
        const bytes = CryptoJS.AES.decrypt(ciphertext, this.passphrase);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    };
}

export const secure = new Security();