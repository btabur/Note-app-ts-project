import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import ReactSelect from "react-select/creatable"
import { Tag } from "../../types"
import { CreateNoteProps } from "./CreateNote"
import {v4} from 'uuid'

const NoteForm = ({onSubmit,avaliableTags,createTag}:CreateNoteProps) => {
    const navigate = useNavigate()
    const titleRef =useRef<HTMLInputElement>(null)
    const markDownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags,setSelectedTags] = useState<Tag[]>([])
    const handleSubmit = (e:FormEvent<HTMLFormElement>)=> {
        e.preventDefault();

        //yeni not oluştur
        onSubmit({
            title:titleRef.current!.value,
            markdown: markDownRef.current!.value,
            tags:selectedTags
        })
    }
  return (
   <Form
   onSubmit={handleSubmit}
    className="mt-5">
    <Stack>
    {/* Üst kısım  */}
        <Row>
            <Col>
                <Form.Group>
                    <Form.Label>Başlık</Form.Label>
                    <Form.Control 
                        ref={titleRef}
                        required 
                        className="shadow"/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Etiketler</Form.Label>
                    <ReactSelect 
                    //seçilen elemanları göstermek için
                    value={selectedTags}
                    // elemanlar silindiğinde stati günceller
                    //  bir alt satırda ts tip kontrollerini devre dışı bırakır
                    //@ts-ignore
                    onChange={(allTags)=>setSelectedTags(allTags)}
                    //yeni etiket oluştruldğunda 
                    onCreateOption={(text)=> {
                        // etikete id ekle ve state aktar
                        const newTag:Tag ={
                            label:text,
                            value:v4()
                        }  
                        //state i güncelle
                        setSelectedTags([...selectedTags,newTag])
                        //locale yeni etiketi kaydeder
                        createTag(newTag)

                    }}
                    className="shadow" isMulti/>
                </Form.Group>
            </Col>
        </Row>
        {/* içerik alanı */}
        <Form.Group className="mt-4">
            <Form.Label>İçerik</Form.Label>
            <Form.Control 
                ref={markDownRef}
                as={'textarea'}
                className="shadow" 
                style={{minHeight:'300px', maxHeight:'500px'}} />
        </Form.Group>
        {/* butonlar */}
        <Stack direction="horizontal" className="justify-content-end mt-3" gap={4} >
            <Button type="submit">Kaydet</Button>
            <Button 
            // bir önceki sayfaya geri göndermek için
            onClick={()=> navigate(-1)} 
            type="button" 
            variant="secondary">Geri
            </Button>

        </Stack>
    </Stack>
   </Form>
  )
}

export default NoteForm