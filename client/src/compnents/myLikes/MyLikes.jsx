import useRequest from '../../hooks/useRequest';
import './MyLikes.css';
import { useMemo } from "react";
import { useUserContext } from "../../contexts/UserContext";

export default function MyLikes() {
  const { user } = useUserContext();

  const { data: bikes } = useRequest('/bikes', [], 'GET_ALL');
  const { data: likes } = useRequest(`/likes`, []);

  const likesMap = useMemo(() => {
    const map = {};
    likes.filter(currentLike => currentLike.userId === user._id).forEach(currentLike => map[currentLike.bikeId] = true)
    return map;
  }, [likes, user._id]);

  return (
    <section className="table-card">
      <header className="table-card__head">
        <h2>Bikes & Likes</h2>
      </header>

      <div className="table-wrap">
        <table className="mtb-table mtb-table--compact">
          <thead>
            <tr>
              <th>Bike Name</th>
              <th className="num">Likes</th>
            </tr>
          </thead>
          <tbody>
            {bikes?.map(b => (
              <tr key={b._id}>
                <td>{b.name}</td>
                <td className="num">{likesMap[b._id] ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
