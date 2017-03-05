 const SpriteSheet = (image) => {
  return new createjs.SpriteSheet({
    framerate: 60,
    images: [image],
    frames:[
      [0, 0, 108, 62.7, 0, 54, 10], // 0
      [108, 0, 101.55, 80.1, 0, 50.775, 40.05], // 1
      [209.55, 0, 105.15, 82.8, 0, 52.575, 41.4], // 2
      [314.7, 0, 105.15, 84.15, 0, 52.575, 42.075], // 3
      [419.85, 0, 105.15, 87.3, 0, 52.575, 43.65], // 4
      [0, 87.3, 101.55, 90.6, 0, 50.775, 45.3],  // 5
      [101.55, 87.3, 103.95, 92.85, 0, 51.975, 46.425], // 6
      [205.5, 87.3, 105.15, 93.3, 0, 52.575, 46.65],  // 7
      [310.65, 87.3, 104.55, 99, 0, 52.275, 49.5], // 8
      [415.2, 87.3, 104.55, 99, 0, 52.275, 49.5], // 9
      [0, 186.3, 104.55, 99, 0, 52.275, 49.5], // 10
      [104.55, 186.3, 104.55, 99, 0, 52.275, 49.5], // 11
      [209.1, 186.3, 105.15, 99.6, 0, 52.575, 49.8], // 12
      [314.25, 186.3, 101.55, 104.4, 0, 50.775, 52.2], // 13
      [419.8, 186.3, 101.55, 106.65, 0, 50.775, 53.325]  // 14
    ],
    animations: {
      run: {
        frames: [9, 8, 11, 10],
        speed: .25
      },
      faint: {
        frames: [5, 13, 14, 1, 0, 0, 0, 0, 0, 0, 0],
        speed: .19
      },
      jump: {
        frames: [6, 12, 7, 4, 2, 3],
        next: "run",
        speed: .1
      }
    }
  });
}

export default SpriteSheet;