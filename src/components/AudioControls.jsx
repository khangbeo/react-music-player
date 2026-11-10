const Icon = ({ children, size = 22 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

export const PlayIcon = (p) => (
  <Icon {...p}>
    <path d="M8 5.5v13a1 1 0 0 0 1.52.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" />
  </Icon>
);

export const PauseIcon = (p) => (
  <Icon {...p}>
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </Icon>
);

export const PrevIcon = (p) => (
  <Icon {...p}>
    <path d="M7 6a1 1 0 0 0-2 0v12a1 1 0 1 0 2 0V6Z" />
    <path d="M19.48 5.64a1 1 0 0 0-1.48-.86l-9.5 6.5a1 1 0 0 0 0 1.64l9.5 6.58a1 1 0 0 0 1.48-.86V5.64Z" />
  </Icon>
);

export const NextIcon = (p) => (
  <Icon {...p}>
    <path d="M17 6a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V6Z" />
    <path d="M4.52 5.64a1 1 0 0 1 1.48-.86l9.5 6.5a1 1 0 0 1 0 1.64L6 19.5a1 1 0 0 1-1.48-.86V5.64Z" />
  </Icon>
);

export const ShuffleIcon = (p) => (
  <Icon {...p}>
    <path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41ZM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5Zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13Z" />
  </Icon>
);

export const RepeatIcon = (p) => (
  <Icon {...p}>
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7Zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4Z" />
  </Icon>
);

export const RepeatOneIcon = (p) => (
  <Icon {...p}>
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7Zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4Zm-4-9.5h-2.2v1.6h1.1v4.4h1.75V8c0-.28-.22-.5-.65-.5Z" />
  </Icon>
);

export const VolumeIcon = (p) => (
  <Icon {...p}>
    <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4ZM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6Z" />
  </Icon>
);

export const MuteIcon = (p) => (
  <Icon {...p}>
    <path d="M3 9v6h4l5 5V4L7 9H3Zm14.6 3 2.2-2.2-1.4-1.4-2.2 2.2-2.2-2.2-1.4 1.4 2.2 2.2-2.2 2.2 1.4 1.4 2.2-2.2 2.2 2.2 1.4-1.4-2.2-2.2Z" />
  </Icon>
);
