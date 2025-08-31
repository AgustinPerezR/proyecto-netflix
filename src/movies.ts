// movies.ts

import type { Movie } from "./types.ts";

export const movies: Movie[] = [
  {
    id: 1,
    type: "movie",
    group: "drama-movies",
    genre: ["drama"],
    title: "Memento",
    poster: "/movies/Memento (2000).png",
    background:
      "https://image.tmdb.org/t/p/original/qq5Y7Ad0KuayD3f28DcXx33cAau.jpg",
    color: "rgba(205, 210, 216, 0.8)",
    description:
      "Un hombre con amnesia anterógrada intenta encontrar al asesino de su esposa.",
    director: "Christopher Nolan",
    year: 2000,
    duration: "1h 53min",
  },
  {
    id: 2,
    type: "movie",
    group: "popular-movies",
    genre: ["biography", "drama"],
    title: "Oppenheimer",
    poster: "/movies/Oppenheimer (2023).jpg",
    background:
      // "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
      // "https://image.tmdb.org/t/p/original/yYHbquYWD3SRtgF7XsQxA19kmDC.jpg",
      "https://image.tmdb.org/t/p/original/fjg2gQTprfDpNH05RboXQzsZwez.jpg",
    color: "rgba(220, 105, 35, 0.8)",
    description:
      "La historia del físico J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.",
    director: "Christopher Nolan",
    year: 2023,
    duration: "3h 0min",
  },
  {
    id: 3,
    type: "movie",
    group: "popular-movies",
    genre: ["sci-fi", "fantasy"],
    title: "Dune Part 1",
    poster: "/movies/Dune Part 1 (2021).png",
    color: "rgba(200, 140, 132, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/iLrSIegbILXehiE4dOTJtWXFF8j.jpg",
    description:
      "En un futuro distante, el joven Paul Atreides debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo.",
    director: "Denis Villeneuve",
    year: 2021,
    duration: "2h 35min",
  },
  {
    id: 4,
    type: "movie",
    group: "popular-movies",
    genre: ["sci-fi", "fantasy"],
    title: "Dune Part 2",
    poster: "/movies/Dune- Part Two (2024).png",
    color: "rgba(120, 96, 102, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/6RgKyGnXPfVqbJQzX3AkvHhXFsq.jpg",
    // https://image.tmdb.org/t/p/original/15pEQfAZFrZwSwzsMhiumCsoFRs.jpg
    // https://image.tmdb.org/t/p/original/eZ239CUp1d6OryZEBPnO2n87gMG.jpg
    description:
      "Paul Atreides se une a los Fremen para vengarse de los conspiradores que destruyeron a su familia.",
    director: "Denis Villeneuve",
    year: 2024,
    duration: "2h 46min",
  },
  {
    id: 5,
    type: "movie",
    group: "popular-movies",
    genre: ["superheroes", "thriller", "mystery"],
    title: "The Batman",
    poster: "/movies/The Batman (2022).jpg",
    color: "rgba(237, 20, 20, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/lqGqvmqHr8T2Ll8w7mzAtNshUpb.jpg",
    description:
      "Batman investiga la corrupción en Gotham y enfrenta al asesino conocido como The Riddler.",
    director: "Matt Reeves",
    year: 2022,
    duration: "2h 56min",
  },
  {
    id: 6,
    type: "movie",
    group: "drama-movies",
    genre: ["drama", "thriller", "mystery"],
    title: "Prisoners",
    poster: "/movies/Prisoners (2013).jpeg",
    color: "rgba(80, 90, 100, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/pDwCcYEsigTb1N8YIiVkm9cqiMt.jpg",
    // https://image.tmdb.org/t/p/original/jifpB5HQ6svDJXEibDQPpXlcp6u.jpg
    description:
      "Cuando su hija desaparece, un padre desesperado toma medidas extremas mientras la policía investiga.",
    director: "Denis Villeneuve",
    year: 2013,
    duration: "2h 33min",
  },
  {
    id: 7,
    type: "movie",
    group: "drama-movies",
    genre: ["drama", "thriller", "suspense"],
    title: "Parasite",
    poster: "/movies/Parasite (2019).jpg",
    color: "rgba(199, 234, 202, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    description:
      "La familia Kim se infiltra poco a poco en la vida de los adinerados Park, hasta que todo se descontrola.",
    director: "Bong Joon-ho",
    year: 2019,
    duration: "2h 12min",
  },
  {
    id: 8,
    type: "movie",
    group: "popular-movies",
    genre: ["sci-fi"],
    title: "Godzilla Minus One",
    poster: "/movies/Godzilla Minus One (2023).png",
    color: "rgba(15, 200, 240, 0.8)",
    background:
      // "https://image.tmdb.org/t/p/original/pu6twJJq87vzYvtu0OftcN0AkNU.jpg",
      // https://image.tmdb.org/t/p/original/oHBhHoNe59VH6bUMazDtJmWOFSS.jpg
      "https://image.tmdb.org/t/p/original/q2kGIBHr2Lk4ghoNPMVzedyoyut.jpg",
    description:
      "Tras la Segunda Guerra Mundial, Japón debe enfrentar una amenaza aún mayor: Godzilla.",
    director: "Takashi Yamazaki",
    year: 2023,
    duration: "2h 5min",
  },
  {
    id: 9,
    type: "movie",
    group: "popular-movies",
    genre: ["action"],
    title: "John Wick 1",
    poster: "/movies/John Wick Chapter 1 (2014).jpg",
    color: "rgba(90, 200, 210, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/eD7FnB7LLrBV5ewjdGLYTAoV9Mv.jpg",
    // https://image.tmdb.org/t/p/original/cQ2U1altwmnRgIHD8cPhMpDmXIg.jpg
    // https://image.tmdb.org/t/p/original/xPPizf0YCCYB82AmjubPbqUhZKW.jpg
    description:
      "Un asesino retirado regresa para vengar la muerte de su perro, regalo de su esposa fallecida.",
    director: "Chad Stahelski",
    year: 2014,
    duration: "1h 41min",
  },
  {
    id: 10,
    type: "movie",
    group: "popular-movies",
    genre: ["action"],
    title: "John Wick 2",
    poster: "/movies/John Wick Chapter 2 (2017).jpg",
    color: "rgba(247, 17, 64, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/hcf9kEwVeZKxQrxSoCIl6hrB6bR.jpg",
    // https://image.tmdb.org/t/p/original/hlYHeJgfgGa77l7sP0ikhg0or6A.jpg
    // https://image.tmdb.org/t/p/original/6JI0YVO1KegsneCT7beS38hUYWU.jpg
    description:
      "John Wick es forzado a regresar al inframundo criminal para cumplir con una vieja promesa.",
    director: "Chad Stahelski",
    year: 2017,
    duration: "2h 2min",
  },
  {
    id: 11,
    type: "movie",
    group: "popular-movies",
    genre: ["action"],
    title: "John Wick 3",
    poster: "/movies/John Wick Chapter 3 (2019).jpg",
    color: "rgba(185, 73, 175, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/pC8uwKQ3ERAmCe7prOQ0BHmGePQ.jpg",
    description:
      "Con un precio sobre su cabeza, John Wick debe luchar por su vida mientras todos los asesinos lo persiguen.",
    director: "Chad Stahelski",
    year: 2019,
    duration: "2h 10min",
  },
  {
    id: 12,
    type: "movie",
    group: "popular-movies",
    genre: ["action"],
    title: "John Wick 4",
    poster: "/movies/John Wick Chapter 4 (2023).jpg",
    color: "rgba(247, 157, 17, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/bIGvhH7QhohjZ0es8RhopSGsreF.jpg",
    description:
      "John Wick descubre un camino para derrotar a la Alta Mesa, pero debe enfrentarse a nuevos enemigos.",
    director: "Chad Stahelski",
    year: 2023,
    duration: "2h 49min",
  },
  {
    id: 13,
    type: "movie",
    group: "recently-added popular-movies",
    genre: ["aventure"],
    title: "Piratas del Caribe 1: La maldición de la Perla Negra",
    poster:
      "/movies/Pirates of the Caribbean 1 - The Curse of the Black Pearl (2003).png",
    color: "rgba(227, 146, 21, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/zXMGAtDqJ58P8G3W4bwKyYffPhn.jpg",
    description:
      "El Capitán Jack Sparrow y Will Turner deben recuperar un tesoro maldito para salvar a Elizabeth Swann.",
    director: "Gore Verbinski",
    year: 2003,
    duration: "2h 23min",
  },
  {
    id: 14,
    type: "movie",
    group: "recently-added",
    genre: ["aventure"],
    title: "Piratas del Caribe 2: El cofre del hombre muerto",
    poster:
      "/movies/Pirates of the Caribbean 2 - Dead Man's Chest (2006).jpeg ",
    color: "rgba(147, 161, 110, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/p4mJyR8UoEhnjgU5cZNZrgkqPqV.jpg",
    description:
      "Para salvar su vida, Will tendrá que encontrar a Jack y conseguir su misteriosa brújula. Esta esconde un gran poder, además de la clave de una deuda de sangre del pirata con un temible y siniestro Davy Jones, el legendario capitán del barco fantasma Holandés Errante.",
    director: "Gore Verbinski",
    year: 2006,
    duration: "2h 31min",
  },
  {
    id: 15,
    type: "movie",
    group: "recently-added",
    genre: ["aventure"],
    title: "Piratas del Caribe 3: En el fin del mundo",
    poster: "/movies/Pirates of the Caribbean 3 - At World's End (2007).jpeg",
    color: "rgba(194, 94, 92, 0.8)",
    background:
      "https://www.praguereporter.com/wp-content/uploads/2007/05/pirates-of-the-caribbean-at-worlds-end-movie-review.jpg",
    description:
      "Después de que el Capitán Jack Sparrow es capturado por Davy Jones, Will y Elizabeth deben unirse a la tripulación de Barbossa para rescatarlo y enfrentarse a la Compañía de las Indias Orientales.",
    director: "Gore Verbinski",
    year: 2007,
    duration: "2h 49min",
  },
  {
    id: 16,
    type: "movie",
    group: "recently-added",
    genre: ["fantasy"],
    title: "Harry Potter 1: y la Piedra Filosofal",
    poster: "/movies/Harry Potter 1 and the Philosophers Stone (2001).jpeg", // puede ser una URL externa o local
    color: "rgba(203, 80, 70, 0.8)", // Color del poster (para efecto de sombreado)
    background:
      "https://image.tmdb.org/t/p/original/4GlSMUpzSd3cliYGFJVziSDX53S.jpg",
    description: ".",
    director: "Chris Columbus",
    year: 2001,
    duration: "2h 32min",
  },
  {
    id: 17,
    type: "movie",
    group: "recently-added",
    genre: ["fantasy"],
    title: "Harry Potter 2: y la Cámara de los Secretos",
    poster: "/movies/Harry Potter 2 and the Chamber of Secrets (2002).jpeg",
    color: "rgba(6, 121, 83, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/qSrq6ACzPDv4xerGJ78iS3N827K.jpg",
    description:
      "Harry Potter regresa a Hogwarts para su segundo año y descubre el misterio de la Cámara Secreta.",
    director: "Chris Columbus",
    year: 2002,
    duration: "2h 41min",
  },
  {
    id: 18,
    type: "movie",
    group: "recently-added",
    genre: ["fantasy"],
    title: "Harry Potter 3: y el Prisionero de Azkaban",
    poster: "/movies/Harry Potter 3 and the Prisoner of Azkaban (2004).jpeg",
    color: "rgba(32, 68, 166, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/rpjIOGLijh6ADnnfmvBDvIczsbA.jpg",
    description:
      "Harry descubre que un peligroso prisionero ha escapado y amenaza su seguridad.",
    director: "Alfonso Cuarón",
    year: 2004,
    duration: "2h 22min",
  },
  {
    id: 19,
    type: "movie",
    group: "recently-added",
    genre: ["fantasy"],
    title: "Harry Potter 4: y el Cáliz de Fuego",
    poster: "/movies/Harry Potter 4 and the Goblet of Fire (2005).jpeg",
    color: "rgba(181, 108, 40, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/eQthqp94QZX9asQ6kXGG2XIbiuR.jpg",
    description:
      "Harry participa en el Torneo de los Tres Magos enfrentando desafíos mortales.",
    director: "Mike Newell",
    year: 2005,
    duration: "2h 37min",
  },
  {
    id: 20,
    type: "movie",
    group: "",
    genre: ["fantasy"],
    title: "Harry Potter 5: y la Órden del Fénix",
    poster: "/movies/Harry Potter 5 and the Order of the Phoenix (2007).jpeg",
    color: "rgba(96, 96, 96, 0.8)",
    background: "",
    description:
      "Harry lucha contra la opresión del Ministerio y forma la Orden del Fénix.",
    director: "David Yates",
    year: 2007,
    duration: "2h 18min",
  },
  {
    id: 21,
    type: "movie",
    group: "recently-added",
    genre: ["fantasy"],
    title: "Harry Potter 6: y el Misterio del Príncipe",
    poster: "/movies/Harry Potter 6 and the Half-Blood Prince (2009).jpeg",
    color: "rgba(102, 36, 133, 0.8)",
    background: "",
    description:
      "Harry descubre secretos del pasado de Voldemort para prepararse para la batalla final.",
    director: "David Yates",
    year: 2009,
    duration: "2h 33min",
  },
  {
    id: 22,
    type: "movie",
    group: "recently-added",
    genre: ["fantasy"],
    title: "Harry Potter 7: y las Reliquias de la Muerte - Parte 1",
    poster: "/movies/Harry Potter 7 and the Deathly Hallows Part 1 (2010).jpeg",
    color: "rgba(50, 123, 165, 0.8)",
    background: "",
    description:
      "Harry, Ron y Hermione se enfrentan a peligros en la búsqueda de los Horrocruxes.",
    director: "David Yates",
    year: 2010,
    duration: "2h 26min",
  },
  {
    id: 23,
    type: "movie",
    group: "recently-added",
    genre: ["fantasy"],
    title: "Harry Potter 8: y las Reliquias de la Muerte - Parte 2",
    poster: "/movies/Harry Potter 8 and the Deathly Hallows Part 2 (2011).jpeg",
    color: "rgba(158, 52, 52, 0.8)",
    background: "",
    description:
      "La batalla final entre Harry y Voldemort decide el destino del mundo mágico.",
    director: "David Yates",
    year: 2011,
    duration: "2h 10min",
  },
  {
    id: 24,
    type: "movie",
    group: "popular-movies",
    genre: ["sci-fi"],
    title: "Al Filo del Mañana",
    poster: "/movies/Edge of Tomorrow (2014).jpg",
    color: "rgba(216, 188, 150, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/euSlsB9V5fMAeYUyxcYhiMmbs8B.jpg",
    description:
      "Durante una invasion extraterrestre, un soldado es atrapado en un bucle temporal y debe repetir su muerte una y otra vez hasta encontrar la manera de evitar el fin de la humanidad.",
    director: "Doug Liman",
    year: 2014,
    duration: "1h 53min",
  },
  {
    id: 25,
    type: "movie",
    group: "popular-movies",
    genre: ["superheroes"],
    title: "Batman Begins",
    poster: "/movies/Batman Begins (2005).jpeg",
    color: "rgba(241, 227, 199, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/D4CWAeqKW2MiXRxbL8GebOAFkZ.jpg",
    description:
      "Bruce Wayne regresa a Gotham City para luchar contra el crimen y convertirse en Batman.",
    director: "Christopher Nolan",
    year: 2005,
    duration: "2h 20min",
  },
  {
    id: 26,
    type: "movie",
    group: "popular-movies",
    genre: ["superheroes", "action"],
    title: "The Dark Knight",
    poster: "/movies/The Dark Knight (2008).jpeg",
    color: "rgba(227, 247, 255, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/cfT29Im5VDvjE0RpyKOSdCKZal7.jpg",
    description:
      "Batman enfrenta al Joker, un criminal que siembra el caos en Gotham City.",
    director: "Christopher Nolan",
    year: 2008,
    duration: "2h 32min",
  },
  {
    id: 27,
    type: "movie",
    group: "popular-movies",
    genre: ["superheroes", "action"],
    title: "The Dark Knight Rises",
    poster: "/movies/The Dark Knight Rises (2012).jpeg",
    color: "rgba(231, 121, 74, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/gJHvDZbK6GRIbO57GzLL0bcZEAJ.jpg",
    description:
      "Ocho años después de los eventos de The Dark Knight, Batman regresa para enfrentar una nueva amenaza.",
    director: "Christopher Nolan",
    year: 2012,
    duration: "2h 44min",
  },
  {
    id: 28,
    type: "movie",
    group: "popular-movies",
    genre: ["comedy"],
    title: "Golpe Bajo",
    poster:
      "https://image.tmdb.org/t/p/original/oqYpO88KYhRnJRHnZe1Xb2ehWRZ.jpg",
    color: "rgba(236, 195, 48, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/9GeuSS66C0xcX1En4uKYgxWCGrS.jpg",
    description:
      "Un exjugador de fútbol americano es enviado a prisión y forma un equipo de fútbol con los reclusos para enfrentarse a los guardias.",
    director: "Peter Segal",
    year: 2005,
    duration: "1h 53min",
  },
  {
    id: 29,
    type: "movie",
    group: "popular-movies",
    genre: ["horror"],
    title: "Get Out",
    poster:
      "https://image.tmdb.org/t/p/original/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    color: "rgba(255, 255, 255, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/bBQHALHRAaaORlPNXv7fNcRXYdx.jpg",
    description:
      "Un joven afroamericano visita la casa de los padres de su novia, donde descubre un oscuro secreto.",
    director: "Jordan Peele",
    year: 2017,
    duration: "1h 44min",
  },
  {
    id: 30,
    type: "movie",
    group: "popular-movies",
    genre: ["horror"],
    title: "Nope",
    poster:
      "https://image.tmdb.org/t/p/original/AcKVlWaNVVVFQwro3nLXqPljcYA.jpg",
    color: "rgba(48, 79, 159, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/qVKwsXpNy8Cy8CUEIqrHtpWryYq.jpg",
    description:
      "En un remoto rancho de California, dos hermanos descubren un fenómeno inexplicable y tratan de capturarlo en video.",
    director: "Jordan Peele",
    year: 2022,
    duration: "2h 10min",
  },
  {
    id: 31,
    type: "movie",
    group: "drama-movies",
    genre: ["drama"],
    title: "La Ballena",
    poster: "/movies/The Whale (2022).jpg",
    color: "rgba(222, 200, 207, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/6EEeEnzjI4FWTkaSAtHge5x9PW9.jpg",
    description:
      "Un hombre con obesidad severa intenta reconectar con su hija adolescente antes de que sea demasiado tarde.",
    director: "Darren Aronofsky",
    year: 2022,
    duration: "1h 57min",
  },
  {
    id: 32,
    type: "movie",
    group: "drama-movies",
    genre: ["drama"],
    title: "Escape de Pretoria",
    poster:
      "https://image.tmdb.org/t/p/original/8GGS0jkFFCnmdStvZED6NL6V7gd.jpg",
    color: "rgba(224, 225, 186, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/bkrgj45ZAomjs7Nt8Acs5QTjNww.jpg",
    description:
      "Basada en una historia real, dos prisioneros políticos sudafricanos planean una audaz fuga de la prisión de Pretoria.",
    director: "Francis Annan",
    year: 2020,
    duration: "1h 46min",
  },
  {
    id: 33,
    type: "movie",
    group: "popular-movies",
    genre: ["adventure"],
    title: "La Momia",
    poster: "/movies/The Mummy (1999).jpg",
    color: "rgba(250, 223, 150, 0.8)",
    background:
      "https://image.tmdb.org/t/p/original/wyIhlSbqBS7ZsDbCQwGhuNIDYyq.jpg",
    description:
      "Un arqueólogo y su equipo despiertan accidentalmente a una antigua momia egipcia que busca venganza.",
    director: "Stephen Sommers",
    year: 1999,
    duration: "2h 4min",
  },
];
