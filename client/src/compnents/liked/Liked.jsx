import BikeCard from "../bike-card/BikeCard";
import useRequest from "../../hooks/useRequest";
import { useMemo } from "react";


export default function Liked() {
  const { data: likes } = useRequest(`/likes`, []);
  const { data: dataBike } = useRequest(`/bikes`, []);

  const theMostLikedBikes = useMemo(() => {
    const bikes = [];

    likes.forEach((like) => {
      const foundBikes = dataBike.find((b) => b._id === like.bikeId);
      if (!foundBikes) return;

      const existing = bikes.find((b) => b._id === foundBikes._id);
      if (existing) {
        existing.count = (existing.count ?? 0) + 1;
      } else {
        bikes.push({ ...foundBikes, count: 1 }); // avoid mutating original
      }
    });

    const slicedBikes = bikes.sort((a, b) => b.count - a.count).slice(0,3);
    
    return slicedBikes;

  }, [likes, dataBike]);


  return (
    <div className="welcome">
      <div className="logged">
        <h4>The Most Liked Bikes</h4>
        {theMostLikedBikes.length === 0 && <p className="no-bikes">No bikes yet</p>}
        {theMostLikedBikes.map(bike => <BikeCard key={bike._id} {...bike} />)}
      </div>
    </div>
  );
}