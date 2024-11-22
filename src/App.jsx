import './App.css'
import { gql, useQuery } from '@apollo/client';

const BOOKS = gql`
 query {
  books {
    id
    title
    author
  }
}
`;

console.log(BOOKS) 

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

function App() {

  return (
    <>
    <div className='App'>
      <h2>Test GraphQL: Book List</h2>
       <Books /> 

    </div>
     
    </>
  )
}

export default App
