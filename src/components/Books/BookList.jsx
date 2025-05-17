import React from 'react'
import './BookList.css';
import { useDataFetch } from "../Data/DataFetchProvider";
//import { useQuery } from '@apollo/client';

const BookList = () => {
  //const {GET_BOOKS} = useDataFetch();
  //const {loading, error, data} = useQuery(GET_BOOKS) ;
  const {useGetBooks} =useDataFetch();
  const {loading, error, data} = useGetBooks() ;

  return (
    <div className='tableContainer'>
       <h2>
        GraphQL BookList
      </h2>
      {loading&& <p>Loading...</p>}
      {error&& <p>Error: {error.message}</p>}
      {data && (
        <table className='booksTable'>
          <thead>
            <tr>
              <th className='id_th'>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Image</th>
            </tr>
          </thead>

           <tbody>
            {data.books.map((book, index)=>(
              <tr key= {index}>
                <td className='id_td'>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <img src={book.thumbnailUrl} width={50} />
              </tr>

            ))}

           </tbody>

        </table>
      )}
    </div>
  )
}

export default BookList