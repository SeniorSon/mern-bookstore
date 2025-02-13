import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MultiSelect } from "../MultiSelect";
import { Book } from "../../types/book";

const INITIAL_BOOK_STATE: Omit<Book, "_id"> = {
  title: "",
  author: "",
  rating: 0,
  pages: 0,
  genres: [],
  reviews: [],
};

const GENRE_OPTIONS = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Biography",
  "History",
  "Science",
];

export default function BookForm() {
  const [form, setForm] = useState<Omit<Book, "_id">>(INITIAL_BOOK_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(params.id);

  useEffect(() => {
    if (isEditMode) {
      fetchBook();
    }
  }, [params.id]);

  const fetchBook = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/books/${params.id}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const book = await response.json();
      setForm(book);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = (value: Partial<typeof form>) => {
    setForm((prev) => ({ ...prev, ...value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const url = isEditMode
        ? `http://localhost:3000/books/${params.id}`
        : "http://localhost:3000/books";

      const response = await fetch(url, {
        method: isEditMode ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      navigate("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="p-6 text-xl">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-bold mb-6">
        {isEditMode ? "Edit Book" : "Create New Book"}
      </h3>

      <form onSubmit={onSubmit} className="space-y-6">
        {error && <div className="text-red-600 p-4 bg-red-100 rounded-md">{error}</div>}

        <div className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateForm({ title: e.target.value })}
              className="w-full px-4 py-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Author</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => updateForm({ author: e.target.value })}
              className="w-full px-4 py-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Rating</label>
            <input
              type="number"
              min="0"
              max="10"
              step="1"
              value={form.rating}
              onChange={(e) => updateForm({ rating: parseFloat(e.target.value) })}
              className="w-full px-4 py-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Pages</label>
            <input
              type="text"
              value={form.pages}
              onChange={(e) => updateForm({ pages: e.target.value })}
              className="w-full px-4 py-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Genres</label>
            <MultiSelect
              options={GENRE_OPTIONS}
              values={form.genres}
              onChange={(genres) => updateForm({ genres })}
              placeholder="Select genres..."
            />
          </div>
        </div>

        <div className="flex gap-6">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Book"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-3 text-lg border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
