import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../../types/Book";
import BookRow from "../ui/BookRow";
import { Table, TableHeader, TableBody, TableHead, TableRow } from "../ui/Table";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/books/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while fetching books");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while deleting the book");
    }
  };

  if (isLoading) return <div className="p-6 text-lg text-center text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-lg text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h3 className="text-2xl font-bold text-gray-800">📚 Book Records</h3>
        <Link
          to="/create"
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium shadow-md transition"
        >
          ➕ Add New Book
        </Link>
      </div>

      {/* Table */}
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow className="text-gray-700 font-semibold">
              <TableHead className="p-3">Title</TableHead>
              <TableHead className="p-3">Author</TableHead>
              <TableHead className="p-3">Rating</TableHead>
              <TableHead className="p-3">Pages</TableHead>
              <TableHead className="p-3">Genres</TableHead>
              <TableHead className="p-3">Reviews</TableHead>
              <TableHead className="p-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <BookRow key={book._id} book={book} onDelete={deleteBook} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
