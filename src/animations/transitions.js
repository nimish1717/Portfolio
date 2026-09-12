// Shared easing curves and timing constants
// Use these everywhere for a consistent motion language

export const EASE = {
  outExpo:   [0.16, 1, 0.3, 1],
  outQuart:  [0.25, 1, 0.5, 1],
  inOutQuart:[0.76, 0, 0.24, 1],
  spring:    [0.34, 1.56, 0.64, 1],
  smooth:    [0.43, 0.13, 0.23, 0.96],
};

export const DUR = {
  fast:   0.35,
  normal: 0.55,
  slow:   0.75,
  slower: 1.0,
  reveal: 0.8,
};

export const STAGGER = {
  char: 0.025,
  word: 0.06,
  item: 0.08,
};
