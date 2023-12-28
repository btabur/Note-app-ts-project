import { Form,Button, Col, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import NoteCard from "./NoteCard"

// todo undefined hatası veriyor

const MainPage = () => {
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
                    <Form.Control className="shadow"/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label> Etikete Göre Ara</Form.Label>
                   <ReactSelect className="shadow"/>
                </Form.Group>
            </Col>
        </Row>

      </Form>

      {/* Not listesi */}
        <Row xs={1} sm={2} lg={3} xl={4} className="gap-4">
            <Col>
            <NoteCard/>
            </Col>
            <Col>
            <NoteCard/>
            </Col>
            <Col>
            <NoteCard/>
            </Col>
        </Row>
    </div>
  )
}

export default MainPage
