import { useEffect, useState } from "react";
import axios from "axios";

function Stores() {

    const [stores, setStores] = useState([]);
    const [search, setSearch] = useState("");
    const [myRatings, setMyRatings] = useState({});

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            fetchStores();
            fetchMyRatings();
        }
    }, [token]);

    // GET ALL STORES
    const fetchStores = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/stores",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStores(res.data || []);

        } catch (err) {
            console.log(err);
        }
    };

    // GET MY RATINGS
    const fetchMyRatings = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/ratings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const ratingMap = {};

            (res.data || []).forEach(r => {
                ratingMap[r.store_id] = r.rating;
            });

            setMyRatings(ratingMap);

        } catch (err) {
            console.log(err);
        }
    };

    // SUBMIT / UPDATE RATING
  const submitRating = async (storeId, rating) => {
    try {

        const hasRated = myRatings[storeId];

        if (hasRated) {
            // UPDATE RATING
            await axios.put(
                "http://localhost:8080/api/ratings",
                {
                    store_id: storeId,
                    rating
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        } else {
            // NEW RATING
            await axios.post(
                "http://localhost:8080/api/ratings",
                {
                    store_id: storeId,
                    rating
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }

        // refresh data
        fetchStores();
        fetchMyRatings();

    } catch (err) {
        console.log(err);
    }
};

    // FILTER STORES
    const filteredStores = stores.filter(store =>
        store.name?.toLowerCase().includes(search.toLowerCase()) ||
        store.email?.toLowerCase().includes(search.toLowerCase()) ||
        store.address?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container-fluid" style={{ height: "100vh", overflowY: "auto" }}>

            {/* SEARCH */}
            <div className="row mb-3">
                <div className="col-sm-4">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search stores..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* STORE LIST */}
            <div className="row g-3">

                {filteredStores.length === 0 && (
                    <p className="text-center text-muted">No stores found</p>
                )}

                {filteredStores.map((store) => (

                    <div className="col-12 col-md-6 col-lg-3" key={store.id}>

                        <div className="card p-3 shadow-sm h-100">

                            {/* STORE INFO */}
                            <h6 className="mb-1">{store.name}</h6>
                            <p className="mb-0 text-muted">{store.email}</p>
                            <small className="text-muted">{store.address}</small>

                            {/* OVERALL RATING */}
                            <div className="mt-2">
                                <span className="badge bg-warning text-dark">
                                    ⭐ {store.overallRating || 0}
                                </span>
                            </div>

                            {/* MY RATING */}
                            <div className="mt-2">
                                <small className="text-muted">
                                    My Rating:{" "}
                                    <b>
                                        {myRatings[store.id]
                                            ? `${myRatings[store.id]} ★`
                                            : "Not Rated"}
                                    </b>
                                </small>
                            </div>

                            {/* STAR RATING BUTTONS */}
                            <div className="mt-2 d-flex gap-1 flex-wrap">

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        className={`btn btn-sm ${
                                            myRatings[store.id] === star
                                                ? "btn-success"
                                                : "btn-outline-primary"
                                        }`}
                                        onClick={() => submitRating(store.id, star)}
                                    >
                                        {star} ★
                                    </button>
                                ))}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Stores;