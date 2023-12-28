
//note datanın tiplerini miras al ve üzerine ekle
export  type Note = {
    id:string
} &  NoteData

export type NoteData = {
    title:string;
    markdown:string;
    tags:Tag[]
}

export type Tag = {
    label:string;
    value:string;
}

//verileri localde tutarken verilerin sadece id lerini tutacağız    

export  type RowNote = {
    id:string
} &  RowNoteData

export type RowNoteData = {
    title:string;
    markdown:string;
    tagIds:string[]  
}