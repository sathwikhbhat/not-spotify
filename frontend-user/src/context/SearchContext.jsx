import { createContext, useContext, useEffect, useState } from "react";
import { PlayerContext } from "./PlayerContext.jsx";

export const SearchContext = createContext();

export const useSearch = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}

export const SearchProvider = ({ children }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ songs: [], albums: [] });
    const [isSearchActive, setIsSearchActive] = useState(false);
    const playerContext = useContext(PlayerContext) || {};
    const songsData = Array.isArray(playerContext.songsData) ? playerContext.songsData : [];
    const albumsData = Array.isArray(playerContext.albumsData) ? playerContext.albumsData : [];

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults({ songs: [], albums: [] });
            return;
        }

        const query = String(searchQuery).toLowerCase();

        const toLower = (val) => (typeof val === 'string' ? val.toLowerCase() : '');

        const filteredSongs = songsData
            .filter(Boolean)
            .filter(song => {
                const name = toLower(song?.name);
                const description = toLower(song?.description ?? song?.desc);
                return name.includes(query) || description.includes(query);
            });

        const filteredAlbums = albumsData
            .filter(Boolean)
            .filter(album => {
                const name = toLower(album?.name);
                const description = toLower(album?.description ?? album?.desc);
                return name.includes(query) || description.includes(query);
            });

        setSearchResults({
            songs: filteredSongs,
            albums: filteredAlbums
        })
    }, [searchQuery, songsData, albumsData]);

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults({ songs: [], albums: [] });
        setIsSearchActive(false);
    }

    const contextValue = {
        searchQuery, setSearchQuery,
        searchResults,
        isSearchActive, setIsSearchActive,
        clearSearch
    }

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    )
}