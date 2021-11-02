import React from 'react'
import { AttachmentContext } from '../AttachmentContext'
import { PDFDocument } from 'pdf-lib'
import { DocumentVisualization } from '../DocumentVisualization'
import Button from 'react-bootstrap/Button'
/* import PdfForm from '../../assets/pdf_templates/compromiso_autorizacion_template.pdf'; */
/* import PdfForm from '../../assets/pdf_templates/compromiso_autorizacion_template.pdf'; */

function SignDocument(props) {

  const {
    studentData,
    setStudentData
  } = React.useContext(AttachmentContext);

  console.log(studentData);

  const [ samplePDF, setSamplePDF ]  = React.useState(null)
  const [ modalShow, setModalShow ] = React.useState(false)
  const [file, setFile] = React.useState();

  /* function setStateSynchronous(stateUpdate) {
    return new Promise(resolve => {
      setStudentData(
          stateUpdate,
          () => resolve()
        );
    });
  } */

  async function fillForm() {
    // Fetch the PDF with form fields
    //const formUrl = 'https://pdf-lib.js.org/assets/dod_character.pdf'
    console.log(props.pdfForm)
    const formPdfBytes = await fetch(props.pdfForm).then(res => res.arrayBuffer());

    // Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes)

    let today = new Date()
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    console.log('Soy date: ' + date)

    /* setStudentData(prevState => {
      //let student = prevState;              // creating copy of object
      let student = { ...prevState };
      student.acceptance_date = date;         // update properties                 
      student.acceptance_time = time
      return { student };                     // return new object
    }) */

    setStudentData(prevState => ({
        ...prevState,
        ACCEPTANCE_DATE: date,
        ACCEPTANCE_TIME: time
      })
    )

    /* const promise = new Promise(() => 
      {setStudentData(prevState => ({
          ...prevState,
          ACCEPTANCE_DATE: date,
          ACCEPTANCE_TIME: time
        })
      )}
    ) */

    /* await setStateSynchronous(prevState => ({
        ...prevState,    // keep all other key-value pairs
        ACCEPTANCE_DATE: date,
        ACCEPTANCE_TIME: time
      })
    ); */

    /* setStudentData(
      (prevState) => ({
        ...prevState,
        ACCEPTANCE_DATE: date,
        ACCEPTANCE_TIME: time
      }),
      () => { console.log('Value updated') }
    ); */

    // execution will only resume here once state has been applied
    const form = pdfDoc.getForm()

    // Get the form containing all the fields
    const fields = form.getFields()
    fields.forEach(field => {
      const type = field.constructor.name
      const fieldName = field.getName()

      field.setText(studentData[fieldName])
      field.enableReadOnly()

      console.log(`${type}: ${fieldName}`)
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    setSamplePDF(blobUrl);

    let file = new File([blob], "document.pdf", { type: 'application/pdf' });
    setFile(file)

    setModalShow(true);

  }

  return (
    <>
      {/* <button type="submit">Sign Document</button> */}
      <Button
        variant="primary"
        size="sm"
        /* onClick={() => setModalShow(true)} */
        onClick={fillForm}
      >
        Sign
      </Button>
      <DocumentVisualization
        show={modalShow}
        onHide={() => setModalShow(false)}
        pdf={samplePDF}
        file={file}
        name={props.name}
        desciption={props.desciption}
        /* fillFform={fillForm} */
      />
    </>
  )
}

export { SignDocument }
