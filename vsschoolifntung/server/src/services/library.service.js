const sql = require("../sql");

class LibraryService {
  saveBook({ title, file }) {
    return sql`INSERT INTO library (title, file) VALUES (${title}, ${file})`;
  }

  deleteBook({ id }) {
    return sql`DELETE FROM library where book_id=${id}`;
  }

  getAllBooks() {
    return sql`SELECT * FROM library`;
  }
}

module.exports = new LibraryService();
