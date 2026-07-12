export const exercices = [
  {
    id: 1,
    matiere: "algebre",
    difficulte: 1,
    enonce: "Développer et réduire : (2x - 3)(x + 4)",
    solution_attendue: "2x² + 5x - 12",
  },
  {
    id: 2,
    matiere: "algebre",
    difficulte: 2,
    enonce: "Résoudre dans ℝ l'équation : x² - 5x + 6 = 0",
    solution_attendue: "x = 2 ou x = 3",
  },
  {
    id: 3,
    matiere: "algebre",
    difficulte: 2,
    enonce: "Résoudre dans ℝ le système : x + y = 5 et 2x - y = 1",
    solution_attendue: "x = 2 et y = 3",
  },
  {
    id: 4,
    matiere: "algebre",
    difficulte: 3,
    enonce: "Résoudre dans ℝ l'inéquation : (x - 2)(x + 3) > 0",
    solution_attendue: "x < -3 ou x > 2",
  },
  {
    id: 5,
    matiere: "algebre",
    difficulte: 3,
    enonce: "Résoudre dans ℝ l'équation : (x + 1)/2 - (x - 3)/3 = 1",
    solution_attendue: "x = -3",
  },
  {
    id: 6,
    matiere: "algebre",
    difficulte: 4,
    enonce: "Résoudre dans ℝ l'équation : |2x - 5| = 7",
    solution_attendue: "x = 6 ou x = -1",
  },
  {
    id: 7,
    matiere: "algebre",
    difficulte: 4,
    enonce: "Résoudre dans ℝ l'inéquation : |x - 1| < 3",
    solution_attendue: "-2 < x < 4",
  },
  {
    id: 8,
    matiere: "algebre",
    difficulte: 5,
    enonce:
      "Résoudre dans ℝ³ le système : x + y + z = 6, x - y + z = 2, x + y - z = 0",
    solution_attendue: "x = 1, y = 2, z = 3",
  },
]

export function getExerciceById(id) {
  return exercices.find((exercice) => exercice.id === Number(id))
}
