import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
//import { gql, useQuery } from '@apollo/client';
import BookList from './components/BookList';

/* const BOOKS = gql`
 query {
  books {
    id
    title
    author
  }
}
`; 

console.log(BOOKS) 
*/

/*
 function Books (){
  const {loading, error, data} = useQuery(BOOKS) ;
  console.log("All books: ", data);

  return (
    <div className='tableContainer'>
      {loading&& <p>Loading...</p>}
      {error&& <p>Error: {error.message}</p>}
      {data && (
        <table className='booksTable'>
          <thead>
            <tr>
              <th className='id_th'>Id</th>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>

           <tbody>
            {data.books.map((book, index)=>(
              <tr key= {index}>
                <td className='id_td'>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
              </tr>

            ))}

           </tbody>

        </table>
      )}
    </div>
  )

}
 */
function App() {

  return (
    <>
    <Routes>
       <Route path= "/booklist" element ={ <BookList/>} />
      </Routes>
    </>
  )
}

export default App
