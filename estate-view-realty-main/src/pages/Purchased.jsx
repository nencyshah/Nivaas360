import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Purchased = () => {
  const user = useSelector((state) => state.user.user);
  const [buyings, setBuyings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/buying?buyerId=${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setBuyings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (!user) {
    return <div>Please sign in to view your purchased properties.</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">My Purchased Properties</h2>
        {loading ? (
          <div>Loading...</div>
        ) : buyings.length === 0 ? (
          <div>No purchased properties yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {buyings.map((buying) =>
              buying.listingId ? (
                <PropertyCard key={buying._id} property={buying.listingId} />
              ) : null
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Purchased;
