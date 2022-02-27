const { nanoid } = require('nanoid')
const books = require('./books')

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  if (!name) {
    const response = h.response(
      {
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
      }
    )
    response.code(400)
    return response
  } if (readPage > pageCount) {
    const response = h.response(
      {
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      }
    )
    response.code(400)
    return response
  }

  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = (pageCount === readPage)

  const newBook =
    {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      id,
      finished,
      insertedAt,
      updatedAt
    }

  books.push(newBook)
  const isSuccess = books.filter((books) => books.id === id).length > 0

  if (isSuccess) {
    const response = h.response(
      {
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data:
                {
                  bookId: id
                }
      }
    )
    response.code(201)
    return response
  }

  const response = h.response(
    {
      status: 'fail',
      message: 'Failed Adding Book'
    }
  )
  response.code(500)
  return response
}

const getAllBooksHandler = (request, h) => {
  const { name: isName, reading: isReading, finished: isFinished } = request.query

  let bookList = books

  if (isName !== undefined) {
    bookList = bookList.filter((book) => book.name.toLowerCase().includes(isName.toLowerCase()))
  }

  if (isReading !== undefined) {
    const reading = isReading === '1'
    bookList = bookList.filter((book) => book.reading === reading)
  }

  if (isFinished !== undefined) {
    const finished = isFinished === '1'
    bookList = bookList.filter((book) => book.finished === finished)
  }

  bookList = bookList.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher
  }))

  const response = h.response({
    status: 'success',
    data:
        {
          books: bookList
        }
  })
  response.code(200)
  return response
}

const getBooksByIdHandler = (request, h) => {
  const { bookid: id } = request.params

  const book = books.filter((n) => n.id === id)[0]

  if (book !== undefined) {
    const response = h.response(
      {
        status: 'success',
        data:
                    {
                      book
                    }
      }
    )
    response.code(200)
    return response
  }

  const response = h.response(
    {
      status: 'fail',
      message: 'Buku tidak ditemukan'
    }
  )
  response.code(404)
  return response
}

const editBooksByIdHandler = (request, h) => {
  const { bookid: id } = request.params

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  if (!name) {
    const response = h.response(
      {
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      }
    )
    response.code(400)
    return response
  } if (readPage > pageCount) {
    const response = h.response(
      {
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      }
    )
    response.code(400)
    return response
  }

  const updatedAt = new Date().toISOString()
  const finished = pageCount === readPage

  const index = books.findIndex((book) => book.id === id)

  if (index !== -1) {
    books[index] =
        {
          ...books[index],
          name,
          year,
          author,
          summary,
          publisher,
          pageCount,
          readPage,
          reading,
          updatedAt,
          finished
        }

    const response = h.response(
      {
        status: 'success',
        message: 'Buku berhasil diperbarui'
      }
    )
    response.code(200)
    return response
  }
  const response = h.response(
    {
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    }
  )
  response.code(404)
  return response
}

const deleteBookByIdHandler = (request, h) => {
  const { bookid: id } = request.params

  const index = books.findIndex((book) => book.id === id)

  if (index !== -1) {
    books.splice(index, 1)
    const response = h.response(
      {
        status: 'success',
        message: 'Buku berhasil dihapus'
      }
    )
    response.code(200)
    return response
  }

  const response = h.response(
    {
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    }
  )
  response.code(404)
  return response
}

module.exports =
{
  addBookHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
  editBooksByIdHandler,
  deleteBookByIdHandler
}
