import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { openDB } from 'idb';
import {idb} from '../services/openDB'
import ReactPaginate from 'react-paginate';



const App = () => {
  const [books, setBooks] = useState([])
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(0);

  const demo2 = async (booksData) => {
    const db1 = await idb.db1;
    booksData.map(book =>{
      
      db1.put('books', book, book.bookID)
        // .then(result => {
        //   console.log('success!');
        // })
        // .catch(err => {
        //   console.error('error: ', err);
        // });
    })
    
    
  }

  const getData = () =>{
    axios 
      .get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json')
      .then(res => {
        console.log(res.data);
        demo2(res.data);
      })
      .then(() => {
        console.log('query done')
      })
      .catch(err => {
        console.log(err);
      })
  }
  const callDB = async () =>{
    const db1 = await idb.db1;
    const data = await db1.getAll('books')
    console.log(data);
    // setBooks(data);
    const slice = data.slice(offset, offset + perPage)
                const postData = slice.map(pd => <div key={pd.bookID}>
                    <p>{pd.title}</p>
                </div>)
                setBooks(postData)
                setPageCount(Math.ceil(data.length / perPage))

  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
};
  /* Only gets executed once  */
  useEffect(() =>{
    getData();
    
  }, [])
  useEffect(() =>{
    callDB();
    
  }, [offset])


  return (
    <div className="app">
      <h1>BOOKS</h1>
      {books}
      <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
      {/* {books.length > 0 && */}
        {/* <ul>
        {books.map(book =>(
          <li key={book.bookID}> {book.title}</li>
        ))}
      </ul> */}
      {/* npm install react-paginate */}
      
    </div>
  );
}

export default App;
