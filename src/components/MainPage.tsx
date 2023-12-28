import { Form,Button, Col, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import NoteCard from "./NoteCard"
import { Note, Tag } from "../types"
import { useMemo, useState } from "react"

type MainPageProps = {
  notes:Note[];
  availableTags:Tag[];
}

const MainPage = ({availableTags,notes}:MainPageProps) => {
  const [title,setTitle] =useState<string>('')
  const [selectedTags,setSelectedTags] =useState<Tag[]>([])

  //filtereleme yaparken
  //1. aratılan başlığı içeren note var mı
  // 2. seçilen etiketlere sahip note var mı
  const filtredNotes = useMemo(
    ()=> notes.filter((note)=> {
      return (
        //notun başlığı aratılan başlığı içeriyorsa 
        (title === '' || note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()))
        &&
        //seçilen etikletlerin tamamı note da varsa 
        (selectedTags.length===0 ||  selectedTags.every((s_tag)=> 
        note.tags.some((noteTag)=> noteTag.value===s_tag.value)
        ))
      )
    })

  ,[title,selectedTags,notes])
  return (
    <div className="container py-5 ">
        {/* Üst kısım */}
      <Stack direction="horizontal" className="justify-content-between ">
        <h1>Notlar</h1>
         <Link to={'/new'}>
            <Button> Not Oluştur</Button>
         </Link>
      </Stack>
      {/* Filtreleme alanı */}
      <Form className="mt-4">
        <Row>
            <Col>
                <Form.Group>
                    <Form.Label> Başlığa Göre Ara</Form.Label>
                    <Form.Control 
                    onChange={(e)=>setTitle(e.target.value)}
                     className="shadow"/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label> Etikete Göre Ara</Form.Label>
                   <ReactSelect
                   //@ts-ignore
                   onChange={(allTags)=>setSelectedTags(allTags)}
                   options={availableTags} isMulti className="shadow"/>
                </Form.Group>
            </Col>
        </Row>

      </Form>

      {/* Not listesi */}
        <Row xs={1} sm={2} lg={3} xl={4} className="g-4 mt-5">
  
           {filtredNotes.map((note)=> (
              <Col key={note.id}>
              <NoteCard  note={note}/>
              </Col>
           ))}
        </Row>
    </div>
  )
}

export default MainPage
