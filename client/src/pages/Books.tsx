import React, { useEffect, useState } from 'react';
import DataTable from '../components/ui/Table';
import { Column } from '../components/ui/types';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import axios from '../utils/axios.config';
import toast from 'react-hot-toast';

interface Book {
  id: number,
  name: string
  author: string
  publisher: string
  publicationYear: number
  subject: string
}

const colums: Column[] = [
  { key: "id", header: "Id", sortable: true },
  { key: "name", header: "Book Name", sortable: true },
  { key: "authro", header: "Author", sortable: true },
  { key: "publisher", header: "Publisher", sortable: true },
  { key: "publicationYear", header: "Publication year", sortable: true },
  { key: "subject", header: "Subject", sortable: true },
]



const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])

  //GET ALL BOOKS
  useEffect(()=>{
    axios.get('/book').then(({data}: {data: Book[]})=>{
      setBooks(data)
      toast.success('Books loaded')
    }).catch((err)=>{
      toast.error("something went wrong while loading books")
    })
  }, [])

  return (
    <div>
      <div className="pb-4 flex items-center justify-between">
        <h2 className='text-xl font-bold text-gray-800'>All Books</h2>
        
      </div>
      <div className="">
        <DataTable
          data={books}
          columns={colums}
          pagination={{
            limit: 10,
            page: 1,
          }}
        />
      </div>  
    </div>
  );
};

export default BooksPage;