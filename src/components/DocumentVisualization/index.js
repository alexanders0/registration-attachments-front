import React from 'react';
import { AttachmentContext } from '../AttachmentContext'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DocumentVisualization.css';
import './styles.css'
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function DocumentVisualization(props) {

  const {
    studentData,
    setStudentData,
    env
  } = React.useContext(AttachmentContext);

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
      textLayers.forEach(layer => {
        const { style } = layer;
        style.top = "47.5%";
        //style.left = "0";
        //style.transform = "";
    });
  }

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
  };

  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const URL = "http://localhost:5000/api/attachments/UploadFile/"

  const handleSubmit = (event) => {
    event.preventDefault();
    /* console.log(name)
    console.log(description) */
    //localStorage.setItem('token', '625f988bc48e92d701c0492c9127189d67e6596d');
    //let token = localStorage.getItem('token');
    //let token = 'ef4337b16ef855d2780accf3701a218b71ad99a4'; //prod
    //let token = 'aa2f42e96c56c479540c9488773eea30931253ce'; //local

    let formData = new FormData();
    /* formData.append('name', 'name_test')
    formData.append('description', 'description_test')
    formData.append('attachment', props.file) */
    /*  */
    formData.append('identityCard', studentData.IDENTITY_CARD)
    formData.append('fullName', studentData.FULL_NAME)
    formData.append('program', studentData.PROGRAM)
    formData.append('requirementCode', props.name)
    formData.append('requirementDescription', props.description)
    formData.append('file', props.file)
    formData.append('env', env)
    /*  */


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

  /* const handleCheckboxChange = (event) => {
    if(event.target.checked == true){
        props.fillForm()
    }
  } */

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-90w"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Firmar Documento
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Document
          file={props.pdf}
          onLoadSuccess={onDocumentLoadSuccess}
          /* options={options} */
        >
          <Page onLoadSuccess={removeTextLayerOffset} pageNumber={pageNumber} />
        </Document>
        {/* <div>
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div> */}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button size="sm" onClick={props.onHide}>Cancelar</Button> */}

        <Form onSubmit={handleSubmit}>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Acepto términos y condiciones"
                /* onClick={props.fillForm} */
                /* onClick={handleCheckboxChange} */
                required
              />
            </Col>
            <Col xs="auto">
              <Button
                size="sm"
                type="submit"
                /* className="mb-2" */
              >
                Firmar/Enviar
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={props.onHide}
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>

      </Modal.Footer>
    </Modal>
  )
}

export { DocumentVisualization }
