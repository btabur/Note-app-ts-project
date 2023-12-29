import { useOutletContext } from "react-router-dom"
import NoteForm from "./NoteForm"
import { Note, NoteData, Tag } from "../../types"

type EditNoteProps = {
    onSubmit:(id:string,data:NoteData)=>void;
    createTag:(tag:Tag) => void;
    availableTags:Tag[];

}

const EditNote = ({onSubmit,availableTags,createTag}:EditNoteProps) => {
  const data:Note = useOutletContext()
  return (
    <div className="container py-5">
        <h2>Notu Düzenle</h2>
        <NoteForm 
        title={data.title}
        tags= {data.tags}
        markdown= {data.markdown}
        //onsubmiti noteform da bir paraetre alan bir fonksiyon olarak tanımladık
        //ama güncelleme fonksiyonu iki parametre alıyor 
        //bu yüzden tek parametre alan bir fonksiyon tanımlayıp
        // içerisinde güncelleme fonksiyonunu çalıştırdık
        onSubmit={(updatedNote)=> {
            onSubmit(data.id,updatedNote)
        }} 
        avaliableTags={availableTags} 
        createTag={createTag}/>
    </div>
  )
}

export default EditNote