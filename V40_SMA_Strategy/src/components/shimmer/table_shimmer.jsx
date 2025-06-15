import './styles.css';

export default function TableShimmer() {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th></th><th></th><th></th><th></th><th></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              {[...Array(5)].map((_, j) => (
                <td key={j}>
                  <div className="shimmer" style={{ height: '1rem' }}></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
