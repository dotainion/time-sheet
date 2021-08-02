import { ENCRIPT_KEY } from "./EnvVariables";

const CryptoJS = require("crypto-js");

class Security{
    encrypt(plainText){
        return CryptoJS.AES.encrypt(plainText, ENCRIPT_KEY).toString();
    };
    
    decrypt(ciphertext){
        const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRIPT_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    };
}

export const secure = new Security();