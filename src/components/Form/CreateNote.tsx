import { NoteData, Tag } from "../../types"
import NoteForm from "./NoteForm"


export type CreateNoteProps = {
  onSubmit:(data:NoteData)=> void;
  createTag:(tag:Tag)=>void;
  avaliableTags:Tag[];


}


const CreateNote = ({onSubmit, createTag,avaliableTags}:CreateNoteProps) => {
  return (
    <div className="container py-5 ">
        <h1>Yeni Not Oluştur</h1>
        <NoteForm 
        avaliableTags={avaliableTags}
        onSubmit = {onSubmit}
         createTag={createTag}/>
    </div>
  )
}

export default CreateNote