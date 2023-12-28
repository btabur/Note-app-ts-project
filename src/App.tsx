
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateNote from './components/Form/CreateNote'
import EditNote from './components/Form/EditNote'
import { useState } from 'react'
import { NoteData, RowNote, Tag } from './types'
import { v4 } from 'uuid'
import { useLocaleStorage } from './utilis/useLocaleStorage'
import MainPage from './components/MainPage'

const App = () => {
  const [notes,setNotes] = useLocaleStorage<RowNote[]>('notes',[])
  const [tags,setTags] = useLocaleStorage<Tag[]>('tags',[])

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
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route
          path='/new' 
          element =
           {<CreateNote
            avaliableTags= {tags}
            createTag={createTag}
             onSubmit={addNote}/>} />

          <Route path='/:id'>
            <Route index element={<h1>Detay Sayfası</h1>}/>
            <Route path='edit' element={<EditNote/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App