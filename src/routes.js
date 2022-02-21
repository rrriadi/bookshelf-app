const {handler} = require('@hapi/hapi/lib/cors');
const 
{
    addBookHandler,
    getAllBooksHandler,
    getBooksByIdHandler,
    editBooksByIdHandler,
    deleteBookByIdHandler,
} = require('./handler');


const routes = 
[
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },

    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },

    {
        method: 'GET',
        path: '/books/{bookid}',
        handler: getBooksByIdHandler,
    },
    
    {
        method: 'PUT',
        path:'/books/{bookid}',
        handler: editBooksByIdHandler,
    },

    {
        method: 'DELETE',
        path: '/books/{bookid}',
        method: deleteBookByIdHandler,
    },
];

module.exports = routes;