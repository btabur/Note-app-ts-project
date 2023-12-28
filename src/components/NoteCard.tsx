import { Badge, Card, Stack } from "react-bootstrap"
import { Note } from "../types"

//modüle.css dosyaları geriye stil objesi döndürür
import styles from './note-card.module.css'
import { useNavigate } from "react-router-dom";

type CardProps = {
  note:Note;
}

const NoteCard = ({note}:CardProps) => {
  const navigate = useNavigate()
  return (
    <Card 
    onClick={()=>navigate(`/${note.id}`) }
    className={styles.noteCard}>
      <Card.Body>
        <Stack gap={2} 
        className="align-items-center justify-content-between h-100">
          <span>{note.title}</span>
          <Stack 
          gap={2}  className="justify-content-center "
          direction="horizontal">
            {note.tags.map((tag)=> (
              <Badge key={tag.value}>{tag.label}</Badge>
            ))}
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  )
}

export default NoteCard