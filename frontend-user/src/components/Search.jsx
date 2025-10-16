import { useMemo, useState } from "react";
import { useSearch } from "../context/SearchContext.jsx";
import SongItem from "./SongItem.jsx";
import AlbumItem from "./AlbumItem.jsx";

const Search = () => {
    const { searchQuery, searchResults } = useSearch();
    const [activeTab, setActiveTab] = useState("all");
    const [sortBy, setSortBy] = useState("relevance");
    const { songs = [], albums = [] } = searchResults || {};

    const hasQuery = searchQuery.trim().length > 0;
    const showEmpty = hasQuery && songs.length === 0 && albums.length === 0;

    const highlight = (text = "", q = "") => {
        if (!q) return text;
        try {
            const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const re = new RegExp(`(${esc})`, "ig");
            return text.replace(re, '<span class="bg-yellow-400/30 text-yellow-200 rounded px-0.5">$1</span>');
        } catch (_) {
            return text;
        }
    };

    const sortedSongs = useMemo(() => {
        if (sortBy === "name") {
            return [...songs].sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
        }
        return songs;
    }, [songs, sortBy]);

    const sortedAlbums = useMemo(() => {
        if (sortBy === "name") {
            return [...albums].sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
        }
        return albums;
    }, [albums, sortBy]);

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Search</h1>

            {!hasQuery && (
                <div className="space-y-2">
                    <p className="text-gray-300">Start typing to search songs and albums.</p>
                    <div className="flex gap-2 text-sm text-gray-400 flex-wrap">
                        <span className="px-2 py-1 bg-[#2a2a2a] rounded-full">Try: "lofi"</span>
                        <span className="px-2 py-1 bg-[#2a2a2a] rounded-full">Try: "acoustic"</span>
                        <span className="px-2 py-1 bg-[#2a2a2a] rounded-full">Try: "beats"</span>
                    </div>
                </div>
            )}
            {hasQuery && (
                <>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex gap-2 bg-[#1b1b1b] p-1 rounded-full">
                            {[
                                { key: "all", label: "All" },
                                { key: "albums", label: "Albums" },
                                { key: "songs", label: "Songs" },
                            ].map(t => (
                                <button
                                    key={t.key}
                                    onClick={() => setActiveTab(t.key)}
                                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${activeTab === t.key ? 'bg-white text-black' : 'text-gray-300 hover:text-white'}`}>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <label className="text-gray-400">Sort</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-[#1b1b1b] text-white px-2 py-1 rounded-md">
                                <option value="relevance">Relevance</option>
                                <option value="name">Name A→Z</option>
                            </select>
                        </div>
                    </div>

                    {(activeTab === "all" || activeTab === "albums") && sortedAlbums.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-3">Albums</h2>
                            <div className="flex overflow-auto gap-3">
                                {sortedAlbums.map((a) => (
                                    <AlbumItem
                                        key={a._id}
                                        id={a._id}
                                        name={a.name}
                                        description={a.description ?? a.desc}
                                        imageUrl={a.imageUrl}
                                        nameHtml={highlight(a.name, searchQuery)}
                                        descriptionHtml={highlight(a.description ?? a.desc ?? "", searchQuery)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {(activeTab === "all" || activeTab === "songs") && sortedSongs.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold my-3">Songs</h2>
                            <div className="flex overflow-auto gap-3">
                                {sortedSongs.map((s) => (
                                    <SongItem
                                        key={s._id}
                                        id={s._id}
                                        name={s.name}
                                        desc={s.description ?? s.desc}
                                        image={s.imageUrl}
                                        nameHtml={highlight(s.name, searchQuery)}
                                        descHtml={highlight(s.description ?? s.desc ?? "", searchQuery)}
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