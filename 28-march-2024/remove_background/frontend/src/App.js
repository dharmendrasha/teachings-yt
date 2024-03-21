import { useState } from 'react'
import './App.css';
import { FileUploader } from 'react-drag-drop-files'

const imageTypes = ["JPEG", "PNG", "JPG"]

function App() {

  const [file, setFile] = useState(null)
  const [selectedFile, setSelectedFile] = useState("")
  const [removedImage, setRemoveImage] = useState("")
  const [loading, setLoader] = useState(false)


  const submit = (file) => {

    if(!file){
      throw Error(`Please upload file.`)
    }


    setFile(file)

    const read = new FileReader()
    read.onload = function(ev){
      setSelectedFile(ev.target.result)
    }


    read.readAsDataURL(file)

    const form = new FormData()
    form.append("file", file, file.name)
    setLoader(true)
    fetch("/api/upload", {body: form, method: 'post'}).then(async(res) => {
      const blob = await res.blob()
      const bloburl = URL.createObjectURL(blob)
      setRemoveImage(bloburl)
    }).catch(e => {console.log(e)}).finally((e) => setLoader(false))

    

    


  }

  return (<>

      <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-6'>
              <FileUploader types={imageTypes} multiple={false} handleChange={submit} name={"file"} />

              {selectedFile && <img src={selectedFile} width={600} height={400} alt={file?.name} /> }

            </div>
            <div className='col-md-6'>
              {loading && <><img src='https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif' alt='loader' width={50} height={50} /></>}
              {!loading && removedImage && (<><img alt='removed_image' src={removedImage} width={600} height={400}/></>)}
            </div>
          </div>
      </div>

  </>);
}

export default App;
