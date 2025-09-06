export const movieVideos: Record<number, string> = {
  1: "https://drive.google.com/file/d/1m1WU5MOnV-x1iZCOdN31iNO0PR-6hftE/view?usp=sharing",
  2: "https://drive.google.com/file/d/xxxx-yyyy-zzzz/view?usp=sharing",
};

//acceso: seriesVideos[serieId][season][episode] = videoUrl
export const seriesVideos: Record<
  number, // serieId
  Record<
    number, // season
    Record<
      number, // episode
      string // videoUrl
    >
  >
> = {
  14: {
    // Andor
    1: {
      1: "https://drive.google.com/file/d/1TAlruZ0hGCDX2f5e66hPbuyGYLVMEI8a/view?usp=drive_link",
      2: "https://drive.google.com/file/d/1Hu4Nbd7hed1hvFAXBB72FDv0J2rlCrxv/view?usp=drive_link",
      3: "https://drive.google.com/file/d/1oZu5p1w0XchhNM3E8krtlkYcwFa4PT8p/view?usp=drive_link",
      4: "https://drive.google.com/file/d/12J_DqXp6eqUov93Y-YhTuckppn6zpdcP/view?usp=drive_link",
      5: "https://drive.google.com/file/d/1r2zuBgVSrFPekgK0hQTIAD0g7PVIerah/view?usp=drive_link",
      6: "https://drive.google.com/file/d/1jgxqFEXcit1GXewJsHEcdFOhR2gPBUjK/view?usp=drive_link",
      7: "https://drive.google.com/file/d/17QKLbd0sDAd927vTxtIShUE05ryjy3cO/view?usp=drive_link",
      8: "https://drive.google.com/file/d/1ATGTZdpGtDeVlLJ2mrNYiAygpES0-0HU/view?usp=drive_link",
      9: "https://drive.google.com/file/d/1B5zuwngsE5nRdQg0C-dX5OmS8_zZY0nj/view?usp=drive_link",
      10: "https://drive.google.com/file/d/1oxe6Y08hMFDSG5XKX7FLpOFX3XVbJU6G/view?usp=drive_link",
      11: "https://drive.google.com/file/d/1M5Dq9yHZArqdWiUkXMHlZPaSvT6ft8Z6/view?usp=drive_link",
      12: "https://drive.google.com/file/d/1eXi82Wgb2a_FF_YA6KZ0XyiEtuJoo4ON/view?usp=drive_link",
    },
    2: {
      1: "https://drive.google.com/file/d/1Zy0lFV2c8VuDWM0kC7HBtT8L2fZsIkET/view?usp=drive_link",
      2: "https://drive.google.com/file/d/1XPCPXzzmIuno7RPtAW-UYDks13YAozpk/view?usp=drive_link",
      3: "https://drive.google.com/file/d/1-kOGgsTnKzvP59IEi6WQHRU4OiE593Ew/view?usp=drive_link",
      4: "https://drive.google.com/file/d/1IxTqnZ-4wK9tNCz3PEnvAqPiBF_hpQjv/view?usp=drive_link",
      5: "https://drive.google.com/file/d/1lZiP1pBJp_cLtb_Rxd6l5zYKjhqY-IWB/view?usp=drive_link",
      6: "https://drive.google.com/file/d/1V2SrpIaAMUhpa3Zw0M8YRqwGwpDoUilI/view?usp=drive_link",
      7: "https://drive.google.com/file/d/1O_TAteF7vmUxuAb0B19gX23qLOqlQcg1/view?usp=drive_link",
      8: "https://drive.google.com/file/d/1aHNtUM0OWxKFQsffuwippV5YDexN6zzu/view?usp=drive_link",
      9: "https://drive.google.com/file/d/1tK16ky4MyvVG1hA6KUhvNUKGaDaqu9te/view?usp=drive_link",
      10: "https://drive.google.com/file/d/1ZabervceJFLBPgvicclWgdzy4QoZQP6P/view?usp=drive_link",
      11: "https://drive.google.com/file/d/1yugDqiK-22OGOB3tKUWaaqgGiCXb_-nd/view?usp=drive_link",
      12: "https://drive.google.com/file/d/11-voB5GydvHkvNc29ILHZoYI0xh1QfxS/view?usp=drive_link",
    },
  },
  202: {
    // Otra serie
    1: {
      1: "https://drive.google.com/file/d/xyz987654/view?usp=sharing",
    },
  },
};
