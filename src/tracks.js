import cover from "./assets/resources/images/Image0001.JPG";
import ops from "./assets/resources/songs/01. Oriental Power Shooter.mp3";
import bg from "./assets/resources/songs/02. Backstreet Girls.mp3";
import sb from "./assets/resources/songs/03. Spring Bloomer.mp3";
import nn from "./assets/resources/songs/04. 9190.mp3";
import fly from "./assets/resources/songs/05. Fly with the Wild Wind.mp3";
import dark from "./assets/resources/songs/06. Into the Darkness.mp3";
import rain from "./assets/resources/songs/07. Rainy Day.mp3";

export const artist = "minami";
export const albumCover = cover;

// One album, seven tracks, one cover image — same as the original 2022 build.
const tracks = [
  { title: "Oriental Power Shooter", artist, audioSrc: ops, image: cover },
  { title: "Backstreet Girls", artist, audioSrc: bg, image: cover },
  { title: "Spring Bloomer", artist, audioSrc: sb, image: cover },
  { title: "9190", artist, audioSrc: nn, image: cover },
  { title: "Fly with the Wild Wind", artist, audioSrc: fly, image: cover },
  { title: "Into the Darkness", artist, audioSrc: dark, image: cover },
  { title: "Rainy Day", artist, audioSrc: rain, image: cover },
];

export default tracks;
