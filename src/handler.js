const nanoid = require('nanoid')
const books = require('./books')

const addBookHandler = (request, h) => {
  {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  }

  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = (pageCount, readPage) => {
    if (pageCount === readPage) {
      return true
    }
    return false
  }

  const newBook =
    {
      name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertedAt, updatedAt
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
  } else if (name = null) {
    const response = h.response(
      {
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
      }
    )
    response.code(400)
    return response
  } else if (readPage > pageCount) {
    const response = h.response(
      {
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      }
    )
    response.code(400)
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

const getAllBooksHandler = () => (
  {
    status: 'success',
    data:
        {
          books
        }
  }
)

const getBooksByIdHandler = (request, h) => {
  const { id } = request.params

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

  const response = h.response
  (
    {
      status: 'fail',
      message: 'Buku tidak ditemukan'
    }
  )
  response.code(404)
  return response
}

const editBooksByIdHandler = (request, h) => {
  const { id } = request.params

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const updatedAt = new Date().toISOString()

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
          reading
        }

    const response = h.response(
      {
        status: 'success',
        message: 'Buku berhasil diperbarui'
      }
    )
    response.code(200)
    return response
  } else if (name = null) {
    const response = h.response(
      {
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      }
    )
    response.code(400)
    return response
  } else if (readPage > pageCount) {
    const response = h.response(
      {
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      }
    )
    response.code(400)
    return response
  }

  const response = h.response(
    {
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    }
  )
  response.status(404)
  return response
}

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params

  const index = books.findIndex((book) => book.id === id)

  if (index !== -1) {
    books.splice(index, 1)
    const response = h.response(
      {
        status: 'success',
        message: 'Buku berhasil dihapus'
      }
    )
    response.status(200)
    return response
  }

  const response = h.response(
    {
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    }
  )
  response.status(404)
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
