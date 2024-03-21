import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPEG", "JPG", "PNG"]

function App() {

  const [selectedFile, setSelectedFile] = useState("")
  const [removedImage, setRemovedImage] = useState("")
  const [loader, setLoader] = useState(false)

  const handleChange = (file) => {
    if(!file){
      throw new Error(`No files selected.`)
    }

    const reader = new FileReader()
    reader.onload = function(evt){
      setSelectedFile(evt.target.result)
    }
    reader.readAsDataURL(file)


    const form = new FormData()
    form.append("file", file, file.name)
    setLoader(true)
    fetch("/api/upload", {method: "POST", body: form}).then(async(res) => {
      const blob = await res.blob()
      const objrl = URL.createObjectURL(blob)
      setRemovedImage(objrl)
    }).finally(() => setLoader(false))



  }

  return (<>
  <div className='container'>
    <div className='row'>
      <div className='col-md-6'>
      <FileUploader
              multiple={false}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />

            {selectedFile && <img src={selectedFile} width={600} height={200} alt="selected_file"/>}
      </div>
      <div className='col-md-6'>
        {loader && <>converting files</>}

        {!loader && removedImage && <img alt="removedimage" src={removedImage} width={600} height={200}/>}
      </div>
    </div>
  </div>
  </>);
}

export default App;
