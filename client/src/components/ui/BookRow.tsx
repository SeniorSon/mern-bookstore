import { Book } from "../../types/book";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { TableRow, TableCell } from "./table";

interface BookRowProps {
  book: Book;
  onDelete: (id: string) => void;
}

const BookRow = ({ book, onDelete }: BookRowProps) => (
  <TableRow>
    <TableCell>{book.title}</TableCell>
    <TableCell>{book.author}</TableCell>
    <TableCell>{book.rating}</TableCell>
    <TableCell>{book.pages}</TableCell>
    <TableCell>{book.genres.join(", ")}</TableCell>
    <TableCell>{book.reviews.length}</TableCell>
    <TableCell>
      <div className="flex items-center gap-3">
        <Link
          to={`/edit/${book._id}`}
          className="text-blue-500 hover:text-blue-700 transition font-medium"
        >
          Edit
        </Link>
        <Button 
          variant="destructive" 
          className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          onClick={() => onDelete(book._id)}
        >
          Delete
        </Button>
      </div>
    </TableCell>
  </TableRow>
);

export default BookRow;
