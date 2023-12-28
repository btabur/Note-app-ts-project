
//bu layout bileşeni sayesinde url den alınan id ile
//eşleşen note 'un bilgilerini bulacağız 

import { Navigate, Outlet, useParams } from "react-router-dom"
import { Note } from "../types";

type LayoutProps = {
    notes: Note[];
}

// ve bu bilgileri bütün alt rootlara aktaracağız 
const Layout = ({notes}:LayoutProps) => {
    //url den id yi al
    const {id} = useParams();

    //url den alınan id ile eşleşen notu bul 
    const found = notes.find((note)=> note.id === id);

    // note yoksa kullanıcıyı anasayfaya yönlendir
    if(!found) return <Navigate to={'/'}/>

    //bulunan note u alt rootlara aktar

  return (
    //alt rootları gösteriri
    <Outlet context={found}/>
  )
}

export default Layout