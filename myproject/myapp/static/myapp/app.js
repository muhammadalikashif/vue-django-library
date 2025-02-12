new Vue({
    el: '#app',
    data: {
        authors: [],
        books: [],
        newAuthor: { name: '', bio: '' },
        newBook: { 
            title: '', 
            publication_date: '', 
            authors: [] 
        },
        editAuthor: null,
        editBook: null
    },
    methods: {
        getAuthorsList(authors) {
            return authors.map(author => author.name).join(', ');
        },
        fetchAuthors() {
            fetch('/myapp/authors/')
                .then(response => response.json())
                .then(data => {
                    this.authors = data.authors;
                });
        },
        fetchBooks() {
            fetch('/myapp/books/')
                .then(response => response.json())
                .then(data => {
                    this.books = data.books;
                });
        },
        addAuthor() {
            fetch('/myapp/authors/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.newAuthor)
            })
            .then(response => response.json())
            .then(data => {
                this.authors.push(data);
                this.newAuthor = { name: '', bio: '' };
            });
        },
        addBook() {
            const bookData = {
                ...this.newBook,
                authors: Array.isArray(this.newBook.authors) ? this.newBook.authors : [this.newBook.authors]
            };
            
            fetch('/myapp/books/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            })
            .then(response => response.json())
            .then(data => {
                this.books.push(data);
                this.newBook = { title: '', publication_date: '', authors: [] };
            });
        },
        updateAuthor() {
            fetch('/myapp/authors/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.editAuthor)
            })
            .then(response => response.json())
            .then(data => {
                const index = this.authors.findIndex(a => a.id === data.id);
                if (index !== -1) {
                    this.authors.splice(index, 1, data);
                }
                this.editAuthor = null;
            });
        },
        deleteAuthor(id) {
            fetch('/myapp/authors/', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            .then(() => {
                this.authors = this.authors.filter(author => author.id !== id);
            });
        },
        updateBook() {
            const bookData = {
                ...this.editBook,
                authors: Array.isArray(this.editBook.authors) ? this.editBook.authors : [this.editBook.authors]
            };

            fetch('/myapp/books/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            })
            .then(response => response.json())
            .then(data => {
                const index = this.books.findIndex(b => b.id === data.id);
                if (index !== -1) {
                    this.books.splice(index, 1, data);
                }
                this.editBook = null;
            });
        },
        deleteBook(id) {
            fetch('/myapp/books/', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            .then(() => {
                this.books = this.books.filter(book => book.id !== id);
            });
        },
        editAuthorDetails(author) {
            this.editAuthor = { ...author };
        },
        editBookDetails(book) {
            this.editBook = {
                ...book,
                authors: book.authors.map(author => author.id)
            };
        }
    },
    created() {
        this.fetchAuthors();
        this.fetchBooks();
    }
});