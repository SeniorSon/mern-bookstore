import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MultiSelect } from "../MultiSelect";
import { Book } from "../../types/Book";

const INITIAL_BOOK_STATE: Omit<Book, "_id"> = {
  title: "",
  author: "",
  rating: 0,
  pages: 0,
  genres: [],
  reviews: [],
};

const GENRE_OPTIONS = [
  "Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery", "Biography", "History", "Science"
];

export default function BookForm() {
  const [form, setForm] = useState<Omit<Book, "_id">>(INITIAL_BOOK_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(params.id);

  const fetchBook = useCallback(async () => {
    if (!params.id) return;
    try {
      setIsLoading(true);
      setError(null);
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
  }, [params.id, navigate]);

  useEffect(() => {
    if (isEditMode) {
      fetchBook();
    }
  }, [fetchBook, isEditMode]);

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
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          {isEditMode ? "Edit Book" : "Create New Book"}
        </h3>
        {error && <div className="text-red-600 p-4 bg-red-100 rounded-md mb-4">{error}</div>}
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateForm({ title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => updateForm({ author: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-1">Rating</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="1"
                  value={form.rating}
                  onChange={(e) => updateForm({ rating: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-1">Pages</label>
                <input
                  type="number"
                  value={form.pages}
                  onChange={(e) => updateForm({ pages: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">Genres</label>
              <MultiSelect
                options={GENRE_OPTIONS}
                values={form.genres}
                onChange={(genres) => updateForm({ genres })}
                // className="w-full border rounded-lg"
                placeholder="Select genres..."
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoading ? "Saving..." : "Save Book"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3 text-lg border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
