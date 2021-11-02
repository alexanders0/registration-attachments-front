import React from 'react'
import { AttachmentContext } from '../AttachmentContext'
import axios from 'axios'
import CryptoJS from "crypto-js"
import { Requirement } from '../Requirement'
import './RequirementsList.css'
import {
  useParams
} from "react-router-dom"
import { nationalities } from './NationalitiesCatalog'

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

  const {
    studentData,
    setStudentData,
    env,
    setEnv
  } = React.useContext(AttachmentContext);

  let { encodedUrl } = useParams();
  let encryptedData = decodeURIComponent(encodedUrl);
  let parametersArray = encryptedData.split('$')
  let encodedData = parametersArray[0];
  let encodedVector = parametersArray[1];
  let encodedKey = parametersArray[2];

  let decryptedData = decrypt(encodedData, encodedVector, encodedKey)
  let data = JSON.parse(decryptedData);

  console.log(data)

  React.useEffect(() => {
    setEnv(data.ENV)
  }, []);

  /* console.log(data);
  console.log(data.origin);
  console.log(data.env);
  console.log(data.ci);
  console.log(data.name);*/
/*   console.log(data.PK_REQUEST.PIDM);
  console.log(data.PK_REQUEST.SERVICE_NUMBER); */

  const [requirements, setRequirements] = React.useState([]);


  const RequirementsURL = "http://localhost:5000/api/attachments/GetRequirements/";
  /* let formData = new FormData();
  formData.append("pidm", data.pk_request.pidm);
  formData.append("termCode", data.pk_request.term_code);
  formData.append("applicationNumber", data.pk_request.appl_no); */

  const requirementsRequest = JSON.stringify(
    {
      "pidm": data.PK_REQUEST.PIDM.toString(),
      "program": data.PK_REQUEST.PROGRAM,
      "env": data.ENV,
    }
  )

  console.log(requirementsRequest)

  React.useEffect(() => {
    axios.post(
      RequirementsURL,
      requirementsRequest,
      { 
        headers: {
          /* "Authorization": `Token ${token}`, */
          "Content-type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        console.log("Todo OK");
        console.log(response.data);
        setRequirements(response.data);
      }
    })
    .catch((error, response) => {
      console.log(error);
      console.log(response);
    })
  }, []);

  const StudentDataURL = "http://localhost:5000/api/attachments/GetStudentData/";
  /* let studentFormData = new FormData();
  studentFormData.append('pidm', data.pk_request.pidm); */

  const studentDataRequest = JSON.stringify(
    {
      "pidm": data.PK_REQUEST.PIDM.toString(),
      "program": data.PK_REQUEST.PROGRAM,
      "env": data.ENV,
    }
  )

  React.useEffect(() => {
    axios.post(
      StudentDataURL,
      studentDataRequest,
      { 
        headers: {
          /* "Authorization": `Token ${token}`, */
          "Content-type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        console.log("Todo OK");
        setStudentData(response.data);
        setNationality()
        /* getData() */
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  /* console.log(nationalities) */

  const setNationality = async () => {

    setStudentData(prevState => ({
        ...prevState,    // keep all other key-value pairs
        NATIONALITY: nationalities[prevState['NATIONALITY']]
      })
    )

  }

  /* const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data.IPv4);

    setStudentData(prevState => ({
        ...prevState,    // keep all other key-value pairs
        ip: res.data.IPv4
      })
    )

  } */


  return (
    <>
      <div id="pagebody" className="level4 row">

        <div>
            <h5 id="nomb_beca"> Requisitos de Matrícula </h5>
            <br />
            <p className="text-body-table">
                <b>Nota:</b> Todos los requisitos son obligatorios.
            </p>

        </div>

        <table className="table table-sm" id="schola-ship-table">
            <thead className="thead-blue-utpl">
                <tr>
                    <th className="text-center" scope="col">#</th>
                    <th scope="col">Requisitos</th>
                    <th scope="col">Adjutar/Firmar</th>
                </tr>
            </thead>
            <tbody id="tb-rows-request">
              {
                requirements != null &&
                requirements.map(
                  (requirement, index) => 
                  <Requirement
                    key={requirement.CODE}
                    index={index + 1}
                    name={requirement.CODE}
                    description={requirement.DESCRIPTION}
                    uploadKind={requirement.UPLOAD_KIND}
                    pdfTemplate={requirement.PDF_TEMPLATE}
                  />
                )
              }
            </tbody>
        </table>

      </div>

    </>
  )
}

export { RequirementsList }
