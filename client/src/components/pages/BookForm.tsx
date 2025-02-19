import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "../../types/book";
import { Review } from "../../types/review";

interface BookFormData extends Omit<Book, '_id'> {
  _id?: string;
}

interface ReviewFormData {
  name: string;
  body: string;
}

const initialFormState: BookFormData = {
  title: "",
  author: "",
  rating: 0,
  pages: 0,
  genres: [],
  reviews: []
};

const initialReviewState: ReviewFormData = {
  name: "",
  body: ""
};

export default function BookForm() {
  const [form, setForm] = useState<BookFormData>(initialFormState);
  const [genreInput, setGenreInput] = useState("");
  const [reviewForm, setReviewForm] = useState<ReviewFormData>(initialReviewState);
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString();
      if (!id) return;
  
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const book = await response.json();
        if (!book) {
          console.warn(`Book with id ${id} not found`);
          navigate("/");
          return;
        }
        setForm(book);
        setIsNew(false);
      } catch (error) {
        console.error("Error fetching book:", error);
        navigate("/");
      }
    }
  
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value: Partial<BookFormData>) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  function addGenre(e: React.FormEvent) {
    e.preventDefault();
    if (genreInput.trim()) {
      updateForm({ genres: [...form.genres, genreInput.trim()] });
      setGenreInput("");
    }
  }

  function removeGenre(genreToRemove: string) {
    updateForm({
      genres: form.genres.filter((genre) => genre !== genreToRemove)
    });
  }

  function addReview(e: React.FormEvent) {
    e.preventDefault();
    if (reviewForm.name.trim() && reviewForm.body.trim()) {
      updateForm({
        reviews: [...form.reviews, {
          name: reviewForm.name.trim(),
          body: reviewForm.body.trim()
        }]
      });
      setReviewForm(initialReviewState);
    }
  }

  function removeReview(reviewToRemove: Review) {
    updateForm({
      reviews: form.reviews.filter(
        review => review.name !== reviewToRemove.name || review.body !== reviewToRemove.body
      )
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  
    const formData = { ...form };
    delete formData._id;
  
    try {
      const response = await fetch(
        isNew ? "http://localhost:3000/books/" : `http://localhost:3000/books/${params.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving book:", error);
    } finally {
      setForm(initialFormState);
      navigate("/");
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        {isNew ? "Add New Book" : "Edit Book"}
      </h3>
      <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Book Information
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please provide the book's details below.
            </p>
          </div>

          <div className="grid gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full rounded-lg border-gray-200 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                value={form.title}
                onChange={(e) => updateForm({ title: e.target.value })}
                required
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                className="w-full rounded-lg border-gray-200 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                value={form.author}
                onChange={(e) => updateForm({ author: e.target.value })}
                required
              />
            </div>

            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Rating (1-10)
              </label>
              <input
                type="number"
                id="rating"
                min="1"
                max="10"
                className="w-full rounded-lg border-gray-200 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                value={form.rating}
                onChange={(e) => updateForm({ rating: Number(e.target.value) })}
                required
              />
            </div>

            <div>
              <label
                htmlFor="pages"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Number of Pages
              </label>
              <input
                type="number"
                id="pages"
                min="1"
                className="w-full rounded-lg border-gray-200 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                value={form.pages}
                onChange={(e) => updateForm({ pages: Number(e.target.value) })}
                required
              />
            </div>

            {/* Genres Section */}
            <div>
              <label
                htmlFor="genres"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Genres
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="genres"
                  className="flex-1 rounded-lg border-gray-200 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  value={genreInput}
                  onChange={(e) => setGenreInput(e.target.value)}
                  placeholder="Add a genre"
                />
                <button
                  type="button"
                  onClick={addGenre}
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-gray-900
                  bg-white border border-gray-200 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-offset-2
                  focus-visible:outline-gray-500 transition-colors"
                >
                  Add Genre
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {form.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                  >
                    {genre}
                    <button
                      type="button"
                      onClick={() => removeGenre(genre)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="md:col-span-2 mt-8">
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h2>
            
            {/* Add Review Form */}
            <div className="grid gap-4 mb-6">
              <div>
                <label
                  htmlFor="reviewName"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Reviewer Name
                </label>
                <input
                  type="text"
                  id="reviewName"
                  className="w-full rounded-lg border-gray-200 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter reviewer name"
                />
              </div>

              <div>
                <label
                  htmlFor="reviewBody"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Review
                </label>
                <textarea
                  id="reviewBody"
                  rows={3}
                  className="w-full rounded-lg border-gray-200 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  value={reviewForm.body}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="Write your review here"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={addReview}
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-gray-900
                  bg-white border border-gray-200 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-offset-2
                  focus-visible:outline-gray-500 transition-colors"
                >
                  Add Review
                </button>
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-4">
              {form.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 relative"
                >
                  <button
                    type="button"
                    onClick={() => removeReview(review)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    ×
                  </button>
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  <p className="mt-1 text-gray-600">{review.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white
            bg-gray-900 hover:bg-gray-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-900
            transition-colors"
          >
            {isNew ? "Create Book" : "Update Book"}
          </button>
        </div>
      </form>
    </div>
  );
}