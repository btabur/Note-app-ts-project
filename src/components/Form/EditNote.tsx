import { useOutletContext } from "react-router-dom"
import NoteForm from "./NoteForm"


const EditNote = () => {
  const data = useOutletContext()
  return (
    <div className="container py-5">
        <h2>Notu Düzenle</h2>
        <NoteForm/>
    </div>
  )
}

export default EditNote