import React from 'react'
import { AttachmentContext } from '../AttachmentContext'
import axios from 'axios'
import './Requirement.css'
import Button from 'react-bootstrap/Button'
import { SignDocument } from '../SignDocument'

/* function Requirement({index, name, description}) { */
function Requirement(props) {

  const {
    studentData,
    setStudentData,
    env
  } = React.useContext(AttachmentContext);

  const [file, setFile] = React.useState();
  const [fileName, setFileName] = React.useState();

  function FileUpload(event) {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  }

  const URL = "http://localhost:5000/api/attachments/UploadFile/"

  function handleSubmit() {
    console.log(props.name)
    console.log(props.description)
    //localStorage.setItem('token', '625f988bc48e92d701c0492c9127189d67e6596d');
    //let token = localStorage.getItem('token');
    //let token = 'ef4337b16ef855d2780accf3701a218b71ad99a4'; //prod
    //let token = 'aa2f42e96c56c479540c9488773eea30931253ce'; //local
    let formData = new FormData();
    formData.append('identityCard', studentData.IDENTITY_CARD)
    formData.append('fullName', studentData.FULL_NAME)
    formData.append('program', studentData.PROGRAM)
    formData.append('requirementCode', props.name)
    formData.append('requirementDescription', props.description)
    formData.append('file', file)
    formData.append('env', env)

    
    console.log(fileName);


    //axios.post(URL, formData, { headers: { "Content-type": "multipart/form-data'", "Authorization": `Token ${token}` } })
    axios.post(
        URL,
        formData,
        { 
          headers: {
            /* "Authorization": `Token ${token}`, */
            "Content-type": "multipart/form-data",
          },
        }
    )
    .then((response) => {
            if (response.status === 201) {
                console.log("tas bien");
                console.log(response.data);
                // setOpen(true);
            }
        })
        .catch((error) => {
            // handle error
            console.log(error);
        })
  }

  return (
    <tr className="text-body-table">
      <th className="text-center" scope="col">{props.index}</th>
      <th scope="col">{props.name} - {props.description}</th>
      <th scope="col">
      {props.uploadKind == null || props.uploadKind == 'A'?
        <>
          <input type='file' onChange={FileUpload} />
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
          >
            Upload
          </Button>
          {/* <button type="submit" onClick={handleSubmit}>Upload</button> */}
        </>
        : null
      }

      {props.uploadKind == 'F' || props.uploadKind == 'A'?
        <SignDocument
          pdfForm={props.pdfTemplate}
          name={props.name}
          description={props.description}
        />
        : null
      }
        
      </th>
    </tr>
  )
}

export { Requirement }
