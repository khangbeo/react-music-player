import { useState, useEffect } from "react";

export default function AudioPlayer({ tracks }) {
    const [trackIndex, setTrackIndex] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const { title, artist, color, image, audioSrc } = tracks[trackIndex]

    const audioRef = useRef(new Audio(audioSrc))
    const intervalRef = useRef()
    const isReady = useRef(fase)

    const duration = audioRef.current

    const toPrevTrack = () => {
        console.log('go to prev')
    }
    return (
        <></>
    )
}