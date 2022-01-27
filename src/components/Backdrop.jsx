import { useEffect } from "react/cjs/react.development"

const Backdrop = ({
    activeColor,
    trackIndex,
    isPlaying,
}) => {
    useEffect(() => {
        document.documentElement.style.setProperty('--active-color', activeColor)
    }, [trackIndex])

    return (
        <div className={`color-backdrop ${isPlaying ? 'playing' : 'idle'}`} />
    )
}

export default Backdrop