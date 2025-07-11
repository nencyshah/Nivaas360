import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    sell: false,
    rent: true,
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
  });

  console.log(formData);

  // Image upload function
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)", err);
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  // Convert image to base64 for MongoDB storage
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      if (file.size > 2 * 1024 * 1024) {
        reject(new Error("File size must be less than 2MB"));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Remove image function
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle sell/rent mutual exclusivity and set type field
    if (name === "sell" || name === "rent") {
      setFormData({
        ...formData,
        sell: name === "sell" ? checked : false,
        rent: name === "rent" ? checked : false,
        type: name === "sell" && checked ? "sale" : "rent",
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Submit form to create listing in MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!user) {
      setError("Please sign in to create a listing");
      navigate("/signin");
      return;
    }

    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");

      setLoading(true);
      setError(false);

      // Prepare data with correct field names for backend
      const listingData = {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        type: formData.type,
        parking: formData.parking,
        furnished: formData.furnished,
        offer: formData.offer,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        regularPrice: formData.regularPrice,
        discountPrice: formData.discountPrice,
        imageUrls: formData.imageUrls,
        userRef: user._id,
      };

      console.log("Sending listing data:", listingData);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(listingData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      } else {
        navigate("/");
        alert("Listing created successfully!");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-8 bg-gray-950 border border-gray-800">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-center text-white">
          Create a Listing
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 sm:gap-5"
        >
          {/* NAME INPUT */}
          <input
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-600 focus:border-indigo-500 p-3 bg-gray-900 text-white placeholder-gray-400 w-full"
          />

          {/* DESCRIPTION TEXTAREA */}
          <textarea
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-600 p-3 resize-none min-h-[100px] focus:border-indigo-500 bg-gray-900 text-white placeholder-gray-400 w-full"
          />

          {/* ADDRESS INPUT */}
          <input
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-600 focus:border-indigo-500 p-3 bg-gray-900 text-white placeholder-gray-400 w-full"
          />

          {/* CHECKBOXES SECTION */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                name="sell"
                checked={formData.sell}
                onChange={handleChange}
              />
              Sell
            </label>
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                name="rent"
                checked={formData.rent}
                onChange={handleChange}
              />
              Rent
            </label>
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                name="parking"
                checked={formData.parking}
                onChange={handleChange}
              />
              Parking Spot
            </label>
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                name="furnished"
                checked={formData.furnished}
                onChange={handleChange}
              />
              Furnished
            </label>
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                name="offer"
                checked={formData.offer}
                onChange={handleChange}
              />
              Offer
            </label>
          </div>

          {/* BEDROOMS AND BATHROOMS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                min="1"
                max="10"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                className="rounded-xl border border-gray-600 focus:border-indigo-500 p-3 bg-gray-900 text-white placeholder-gray-400 w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                min="1"
                max="10"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                className="rounded-xl border border-gray-600 focus:border-indigo-500 p-3 bg-gray-900 text-white placeholder-gray-400 w-full"
              />
            </div>
          </div>

          {/* REGULAR PRICE SECTION */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Regular Price {formData.rent ? "(Rs/Month)" : "(Rs)"}
            </label>
            <input
              type="number"
              name="regularPrice"
              min="50"
              max="10000000"
              value={formData.regularPrice}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-600 focus:border-indigo-500 p-3 bg-gray-900 text-white placeholder-gray-400 w-full"
            />
          </div>

          {/* DISCOUNT PRICE SECTION - ALWAYS VISIBLE */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Discount Price (Optional) {formData.rent ? "(Rs/Month)" : "(Rs)"}
            </label>
            <input
              type="number"
              name="discountPrice"
              min="0"
              max="10000000"
              value={formData.discountPrice}
              onChange={handleChange}
              placeholder="Enter discount price (leave 0 for no discount)"
              className="rounded-xl border border-gray-600 focus:border-indigo-500 p-3 bg-gray-900 text-white placeholder-gray-400 w-full"
            />
            <p className="text-xs text-gray-400 mt-1">
              💡 Optional: Enter a discount price lower than regular price (0 =
              no discount)
            </p>
          </div>

          {/* IMAGE UPLOAD SECTION */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400 font-medium">
              📸 Images (max 6)
            </label>
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              multiple
              accept="image/*"
              className="rounded-xl border border-gray-600 p-3 bg-gray-900 text-white w-full"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="w-full sm:w-fit px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:opacity-80"
            >
              {uploading ? "📤 Uploading..." : "📤 Upload"}
            </button>
          </div>

          {/* IMAGE UPLOAD ERROR */}
          {imageUploadError && (
            <p className="text-red-700 text-sm">❌ {imageUploadError}</p>
          )}

          {/* UPLOADED IMAGES PREVIEW */}
          {formData.imageUrls.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-400">📷 Uploaded Images:</p>
              {formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between items-center p-3 border border-gray-600 rounded-xl bg-gray-900"
                >
                  <img
                    src={url}
                    alt="listing"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400 mb-2">
                      Image {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="px-3 py-1 text-red-700 bg-red-100 rounded-lg text-sm hover:bg-red-200 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            disabled={loading || uploading}
            type="submit"
            className="mt-6 w-full py-3 text-lg rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 text-white hover:from-pink-700 hover:to-indigo-700 disabled:opacity-80 font-semibold"
          >
            {loading ? "🔄 Creating..." : "✨ Create Listing"}
          </button>

          {/* ERROR MESSAGE */}
          {error && <p className="text-red-700 text-sm">❌ {error}</p>}
        </form>
      </div>
    </div>
  );
}
