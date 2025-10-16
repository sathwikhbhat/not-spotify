import { useSearch } from "../context/SearchContext.jsx";
import SongItem from "./SongItem.jsx";
import AlbumItem from "./AlbumItem.jsx";

const Search = () => {
    const { searchQuery, searchResults } = useSearch();
    const { songs = [], albums = [] } = searchResults || {};

    const hasQuery = searchQuery.trim().length > 0;
    const showEmpty = hasQuery && songs.length === 0 && albums.length === 0;

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Search</h1>
            {!hasQuery && (
                <p className="text-gray-300">Start typing to search songs and albums.</p>
            )}
            {hasQuery && (
                <>
                    {albums.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-3">Albums</h2>
                            <div className="flex overflow-auto gap-3">
                                {albums.map((a) => (
                                    <AlbumItem
                                        key={a._id}
                                        id={a._id}
                                        name={a.name}
                                        description={a.description ?? a.desc}
                                        imageUrl={a.imageUrl}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {songs.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold my-3">Songs</h2>
                            <div className="flex overflow-auto gap-3">
                                {songs.map((s) => (
                                    <SongItem
                                        key={s._id}
                                        id={s._id}
                                        name={s.name}
                                        desc={s.description ?? s.desc}
                                        image={s.imageUrl}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {showEmpty && (
                        <p className="text-gray-300">No results for "{searchQuery}"</p>
                    )}
                </>
            )}
        </div>
    )
}

export default Search;