/* eslint-disable import/no-anonymous-default-export */
import imgSrc from "./assets/artwork.jpg";
import imgSrc2 from "./assets/artwork2.jpg";
import imgSrc3 from "./assets/artwork3.jpg";
import clarity from "./assets/clarity-wataboi.mp3";
import fifty from "./assets/50-tobylane.mp3";
import flavour from "./assets/flavour-wataboi.mp3";

// All of these artists are at https://pixabay.com/music/search/mood/laid%20back/
export default [
    {
        title: "Clarity",
        artist: "Wataboi",
        audioSrc: clarity,
        image: imgSrc,
        color: "#00aeb0"
    },
    {
        title: "50",
        artist: "tobylane",
        audioSrc: fifty,
        image: imgSrc2,
        color: "#ffb77a"
    },
    {
        title: "Flavour",
        artist: "Wataboi",
        audioSrc: flavour,
        image: imgSrc3,
        color: "#5f9fff"
    }
];
