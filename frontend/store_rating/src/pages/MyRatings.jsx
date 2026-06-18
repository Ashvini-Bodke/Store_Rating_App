import { useEffect, useState } from "react";
import axios from "axios";

function MyRatings() {

    const [ratings, setRatings] = useState([]);

    const token = localStorage.getItem("token");
  
    useEffect(() => {
        fetchMyRatings();
    }, []);

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

            setRatings(res.data || []);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-3">

            <h4>My Ratings</h4>

            <div className="row g-3 mt-2">

                {ratings.length === 0 && (
                    <p className="text-muted">No ratings yet</p>
                )}

                {ratings.map((r, index) => (

                    <div className="col-12 col-md-6 col-lg-4" key={index}>

                        <div className="card p-3 shadow-sm">

                            <h6>Store ID: {r.store_id}</h6>

                            <span className="badge bg-warning text-dark">
                                ⭐ {r.rating}
                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default MyRatings;