import { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    sell: false,
    rent: true,
    parkingSpot: false,
    furnished: false,
    offer: false,
    beds: 1,
    baths: 1,
    price: 0,
    discountedPrice: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-8 bg-gray-950 border border-gray-800">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-center text-white">Create a Listing</h2>

        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          <input
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-xl border border-gray-600 focus:border-indigo-500 p-3 bg-gray-900 text-white placeholder-gray-400 w-full"
          />

          <textarea
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="rounded-xl border border-gray-600 p-3 resize-none min-h-[100px] focus:border-indigo-500 bg-gray-900 text-white placeholder-gray-400 w-full"
          />

          <input
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="rounded-xl border border-gray-600 focus:border-indigo-500 p-3 bg-gray-900 text-white placeholder-gray-400 w-full"
          />

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-gray-300">
              <input type="checkbox" name="sell" checked={formData.sell} onChange={handleChange} /> Sell
            </label>
            <label className="flex items-center gap-2 text-gray-300">
              <input type="checkbox" name="rent" checked={formData.rent} onChange={handleChange} /> Rent
            </label>
            <label className="flex items-center gap-2 text-gray-300">
              <input type="checkbox" name="parkingSpot" checked={formData.parkingSpot} onChange={handleChange} /> Parking Spot
            </label>
            <label className="flex items-center gap-2 text-gray-300">
              <input type="checkbox" name="furnished" checked={formData.furnished} onChange={handleChange} /> Furnished
            </label>
            <label className="flex items-center gap-2 text-gray-300">
              <input type="checkbox" name="offer" checked={formData.offer} onChange={handleChange} /> Offer
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Beds</label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                className="rounded-xl border border-gray-600 focus:border-indigo-500 p-3 bg-gray-900 text-white placeholder-gray-400 w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Baths</label>
              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
                className="rounded-xl border border-gray-600 focus:border-indigo-500 p-3 bg-gray-900 text-white placeholder-gray-400 w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Regular Price (Rs/Month)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="rounded-xl border border-gray-600 focus:border-indigo-500 p-3 bg-gray-900 text-white placeholder-gray-400 w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Discounted Price (Rs/Month)</label>
            <input
              type="number"
              name="discountedPrice"
              value={formData.discountedPrice || ''}
              onChange={handleChange}
              className="rounded-xl border border-gray-600 focus:border-indigo-500 p-3 bg-gray-900 text-white placeholder-gray-400 w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400 font-medium">Images (max 6)</label>
            <input type="file" multiple accept="image/*" className="rounded-xl border border-gray-600 p-3 bg-gray-900 text-white w-full" />
            <button className="w-full sm:w-fit px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
              Upload
            </button>
          </div>

          <button className="mt-6 w-full py-3 text-lg rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 text-white hover:from-pink-700 hover:to-indigo-700">
            Create Listing
          </button>
        </div>
      </div>
    </div>
  );
}
