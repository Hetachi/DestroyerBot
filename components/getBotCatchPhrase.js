module.exports = () => {
  const catchPhraseArray = [
    'Gotcha! ',
    'On it! ',
    'Get rekt! ',
    'Another one! ',
    'Timbeeer! ',
    'Okilly-dokilly! ',
    'Hi-diddly-ho! ',
    'Bite my shiny metal ass! ',
    'Fun on the bun! ',
    "I'm back, baby! ",
    "I'm Destroyer baby! ",
    'Oy, this guy. ',
    'Good news, everyone! ',
    'Whaa? ',
    'Quiet you! ',
    'Woop-woop-woop-woop! ',
    'What an honor! ',
  ]
  return catchPhraseArray[Math.floor(Math.random() * catchPhraseArray.length) + 1]
}
