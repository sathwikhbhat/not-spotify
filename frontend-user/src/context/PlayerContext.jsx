import { createContext, useEffect, useRef, useState } from "react";
import { API_BASE_URL, useAuth } from "./AuthContext.jsx";
import axios from "axios";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });
    const { user, token, getAuthHeaders } = useAuth();
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = (id) => {
        const song = songsData.find(item => item._id === id);
        if (!song) return;
        setTrack(song);
        setPlayStatus(true);
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.load();
                audioRef.current.play().catch(() => { });
            }
        }, 0);
    }

    const previous = () => {
        const idx = songsData.findIndex(item => item._id === track?._id);
        if (idx > 0) {
            const prevTrack = songsData[idx - 1];
            setTrack(prevTrack);
            setPlayStatus(true);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.load();
                    audioRef.current.play().catch(() => { });
                }
            }, 0);
        }
    }

    const next = () => {
        const idx = songsData.findIndex(item => item._id === track?._id);
        if (idx > -1 && idx < songsData.length - 1) {
            const nextTrack = songsData[idx + 1];
            setTrack(nextTrack);
            setPlayStatus(true);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.load();
                    audioRef.current.play().catch(() => { });
                }
            }, 0);
        }
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    }

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/songs`, { headers: getAuthHeaders() });
            const songs = response.data.songs || [];
            setSongsData(songs);
            if (songs.length > 0) {
                setTrack(songs[0]);
            }
        } catch (error) {
            console.error(error);
            setSongsData([]);
        }
    }

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/albums`, { headers: getAuthHeaders() });
            const albums = response.data.albums || [];
            setAlbumsData(albums);
        } catch (error) {
            console.error(error);
            setAlbumsData([]);
        }
    }

    const contextValue = {
        getSongsData,
        getAlbumsData,
        songsData,
        albumsData,
        audioRef, seekBar, seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause, playWithId, previous, next, seekSong,
    }

    useEffect(() => {
        if (user && token) {
            getAlbumsData();
            getSongsData();
        }
    }, [user, token]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateSeekBar = () => {
            if (seekBar.current && audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                seekBar.current.style.width = Math.floor(progress) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audio.currentTime % 60),
                        minute: Math.floor(audio.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audio.duration % 60),
                        minute: Math.floor(audio.duration / 60)
                    }
                });
            }
        };

        const handleLoadedMetadata = () => {
            if (seekBar.current) {
                seekBar.current.style.width = "0%";
            }
        };

        audio.addEventListener('timeupdate', updateSeekBar);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audio.removeEventListener('timeupdate', updateSeekBar);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [track]);

    useEffect(() => {
        if (!audioRef.current || !track) return;
        audioRef.current.load();
        if (playStatus) {
            audioRef.current.play().catch(() => { });
        }
    }, [track, playStatus]);

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    )
}