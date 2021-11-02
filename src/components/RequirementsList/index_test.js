import React from 'react'
import {
  useParams
} from "react-router-dom"
import CryptoJS from "crypto-js"

const decrypt = (encodedData, encodedVector, encodedKey) => {
  let rawData = CryptoJS.enc.Base64.parse(encodedData);
  let key = CryptoJS.enc.Base64.parse(encodedKey);
  let iv = CryptoJS.enc.Base64.parse(encodedVector);
  let plaintextData = CryptoJS.AES.decrypt(
    { ciphertext: rawData },
    key,
    { iv: iv }
  );
  let plaintext = plaintextData.toString(CryptoJS.enc.Utf8); //also CryptoJS.enc.Latin1

  return plaintext
}

function RequirementsList() {

  let { encodedUrl } = useParams();
  let encryptedData = decodeURIComponent(encodedUrl);
  let parametersArray = encryptedData.split('$')
  let encodedData = parametersArray[0];
  let encodedVector = parametersArray[1];
  let encodedKey = parametersArray[2];
  /* console.log(encodedUrl) */
  /* console.log(parametersArray) */

  let data = decrypt(encodedData, encodedVector, encodedKey)

  /* const encrypt = (text) => {
    let textEncrypted = CryptoJS.AES.encrypt(text, '@alexander').toString()
    return textEncrypted
  }

  const decrypt = (text) => {
    let bytes = CryptoJS.AES.decrypt(text, '@alexander')
    let textDecrypted = bytes.toString(CryptoJS.enc.Utf8)
    return textDecrypted
  } */

  return (
    <div>
      Parámetros pasados por cabecer: {encryptedData}
      {/* <p>"text$vi$pass" encriptado: {encrypt("text$vi$pass")}</p> */}
      <p>Parámetros desencriptados: {data}</p>
    </div>
  )
}

export {RequirementsList}
