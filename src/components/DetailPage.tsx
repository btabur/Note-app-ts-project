import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import { Link, useOutletContext } from "react-router-dom"
import { Note } from "../types"
import ReactMarkdown from 'react-markdown'

type DetailPageProps = {
    deleteNote :(id:string)=>void
}

const DetailPage = ({deleteNote}:DetailPageProps) => {
    const data:Note = useOutletContext()
  return (
    <div className="container my-5">
        <Row className="align-items-center">
            <Col>
                <h1>{data.title}</h1>
                <Stack direction="horizontal" gap={3} className="flex-wrap">
                    {data.tags.map((tag)=> (
                        <Badge className="fs-6"> {tag.label}</Badge>
                    ))}
                </Stack>
            </Col>
            <Col>
                 <Stack 
                 direction="horizontal" 
                 gap={2} 
                 className="align-items-center">
                    {/* edit şeklinde yazıldığında var olan url nin sonuna /edit şeklinde ekleme yapar */}
                                 <Link to={'edit'}>
                                    <Button>Düzenle</Button>
                                </Link>
                                <Button
                                onClick={()=> deleteNote(data.id)}
                                 variant="danger">Sil</Button>
                                <Link to={'/'}>
                                    <Button variant="outline-secondary">Geri</Button>
                                </Link>
                </Stack>
           
            </Col>
        </Row>

        {/* markdown içeriğini ekrana bas */}
       <ReactMarkdown className='my-5'>
         {data.markdown}
       </ReactMarkdown>

    </div>
  )
}

export default DetailPage