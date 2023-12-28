
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateNote from './components/Form/CreateNote'
import EditNote from './components/Form/EditNote'
import { useMemo } from 'react'
import { NoteData, RowNote, Tag } from './types'
import { v4 } from 'uuid'
import { useLocaleStorage } from './utilis/useLocaleStorage'
import MainPage from './components/MainPage'
import DetailPage from './components/DetailPage'
import Layout from './components/Layout'

const App = () => {
  const [notes,setNotes] = useLocaleStorage<RowNote[]>('notes',[])
  const [tags,setTags] = useLocaleStorage<Tag[]>('tags',[])

  //note verilerindeki etiket idlerine göre 
  //etiketlerin isimlerini al ve notlara ekle

  //her render sırasında tekrardan tüm notların etiketlerinin hesaplamaması için 
  //useMemo kullanacağız
  const noteWithTags = useMemo(()=> (
      notes.map((note)=> ({
        ...note,
        tags:tags.filter((tag)=>note.tagIds.includes(tag.value))
      }))
  ),[notes,tags])



  //yeni not Oluştur
  //local e notu eklerken notun etiketlerinin sadece id sini kaydedeceğiz
  const addNote = ({tags,...data}:NoteData)=> {
  // {tags,...data}   notun tag lerini ayrı diğerlerini ayrı alır rest parametresi
  const newNote = {
    id:v4(),
    ...data,
    tagIds:tags.map((tag)=>tag.value) // etiketlerin sadece id lerini aldık
  }
 // setNotes([...notes,newNote])
 //bu şekilde kullanıldığında başka bir bileşene setNote prop olarak verildiğinde ek olarak note 
 //larıda göndermemize gerek kalmadan state e ekleme yapaiblmemizi sağlıyor
  setNotes((prevNotes)=> [...prevNotes,newNote]) 


  }
  //yeni etiket oluştur
  const createTag = (tag:Tag)=> {
      setTags((prevTag)=> [...prevTag,tag])
  }

  //notu sil
  const deleteNote = ( id:string)=> {
    setNotes((prevNote)=> prevNote.filter((note)=> note.id !== id))
  }
  //notu güncelle
  const updateNote = (id:string, {tags,...data}:NoteData) => {
    //güncellenecek notun halini bulup onu kaldırıp onun yerine yenisini aktaracağız
    //bunu yaparken daha önce yaptığımız gibi etiketlerin sadece idlerini alacağız
   const updatedNotes =  notes.map((note)=> note.id ===id ? {
      ...note, //state deki notun bilgileri
      ...data, // yeni notun güncel bilgileri
      tagIds:tags.map((tag)=> tag.value)  
    }:note)
    //state i güncelle
    setNotes(updatedNotes)

  }
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<MainPage availableTags={tags} notes={noteWithTags}/>}/>
          <Route
          path='/new' 
          element =
           {<CreateNote
            avaliableTags= {tags}
            createTag={createTag}
             onSubmit={addNote}/>} />

          <Route element={<Layout notes = {noteWithTags}/>} path='/:id'>
            <Route index element={<DetailPage/>}/>
            <Route path='edit' element={<EditNote/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App