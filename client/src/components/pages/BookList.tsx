import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../../types/book";

interface BookRowProps {
  book: Book;
  deleteBook: (id: string) => void;
  onShowReviews: (book: Book) => void;
}

const BookRow = ({ book, deleteBook, onShowReviews }: BookRowProps) => (
  <tr className="border-b transition-all hover:bg-gray-50/50 data-[state=selected]:bg-gray-100">
    <td className="p-4 align-middle">{book.title}</td>
    <td className="p-4 align-middle">{book.author}</td>
    <td className="p-4 align-middle">{book.rating}</td>
    <td className="p-4 align-middle">{book.pages}</td>
    <td className="p-4 align-middle">{book.genres.join(", ")}</td>
    <td className="p-4 align-middle">
      <button
        onClick={() => onShowReviews(book)}
        className="inline-flex items-center justify-center rounded-lg px-3 py-1 text-sm font-medium
        text-gray-900 bg-gray-100 hover:bg-gray-200 focus-visible:outline focus-visible:outline-offset-2
        focus-visible:outline-gray-500
        transition-colors"
      >
        {book.reviews.length} {book.reviews.length === 1 ? "Review" : "Reviews"}
      </button>
    </td>
    <td className="p-4 align-middle">
      <div className="flex gap-3">
        <Link
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium
          text-gray-900 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 focus-visible:outline 
          focus-visible:outline-offset-2 focus-visible:outline-gray-500 transition-colors"
          to={`/edit/${book._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium
          text-gray-900 bg-white border border-gray-200 shadow-sm hover:bg-red-50 hover:text-red-700
          hover:border-red-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-500
          transition-colors"
          onClick={() => deleteBook(book._id)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

interface ReviewModalProps {
  book: Book | null;
  onClose: () => void;
}

const ReviewModal = ({ book, onClose }: ReviewModalProps) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Reviews for "{book.title}"
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {book.reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No reviews yet</p>
          ) : (
            <div className="space-y-4">
              {book.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  <p className="mt-1 text-gray-600">{review.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium
              text-gray-900 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 focus-visible:outline
              focus-visible:outline-offset-2 focus-visible:outline-gray-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    async function getBooks() {
      try {
        const response = await fetch(`http://localhost:3000/books/`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const books = await response.json();
        setBooks(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    getBooks();
  }, []);

  async function deleteBook(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`);
      }
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Book Collection</h3>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full divide-y divide-gray-200 table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Title
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Author
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Rating
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Pages
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Genres
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Reviews
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {books.map((book) => (
                <BookRow
                  key={book._id}
                  book={book}
                  deleteBook={deleteBook}
                  onShowReviews={setSelectedBook}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReviewModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
}