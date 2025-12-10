import "../../css/mainArea/SongList.css";

const SongList = ({ songs, onSelectSong, currentIndex }) => {
  return (
    <div className="songlist-root">
      <div className="songlist-scroll">
        <table className="songlist-table">
          <thead>
            <tr>
              <th className="songlist-th songlist-th-index">No</th>
              <th className="songlist-th">Name</th>
              <th className="songlist-th">Artist</th>
              <th className="songlist-th">Year</th>
              <th className="songlist-th songlist-th-duration">Duration</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr
                key={index}
                onClick={() => onSelectSong && onSelectSong(index)}
                className="songlist-row"
              >
                <td className="songlist-td songlist-th-index">{index + 1}</td>
                <td className="songlist-td">{song.name}</td>
                <td className="songlist-td">{song.artist_name}</td>
                <td className="songlist-td">{song.releasedate}</td>
                <td className="songlist-td songlist-th-duration">
                  {song.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SongList;
