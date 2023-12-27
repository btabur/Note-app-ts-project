import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import ReactSelect from "react-select/creatable"
import { Tag } from "../../types"

const NoteForm = () => {
    const navigate = useNavigate()
    const titleRef =useRef<HTMLInputElement>(null)
    const markDownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags,setSelectedTags] = useState<Tag[]>()
    const handleSubmit = (e:FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
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
                    <ReactSelect  className="shadow" isMulti/>
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