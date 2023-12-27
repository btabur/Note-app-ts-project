
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateNote from './components/Form/CreateNote'
import EditNote from './components/Form/EditNote'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<h1>AnaSayfa</h1>}/>
          <Route path='/new' element = {<CreateNote/>} />

          <Route path='/:id'>
            <Route index element={<h1>Detay Sayfası</h1>}/>
            <Route path='edit' element={<EditNote/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App