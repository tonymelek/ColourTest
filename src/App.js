import './App.css';
import Home from './Pages/Home';
import colours from './json_data/colours.json'
import { useState } from 'react';
import ColourTest from './Pages/ColourTest';




const randomiseArray = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
const formRandomChoices = (color, colors) => {
  const colorNames = colors.map(color => color.colourName)
  randomiseArray(colorNames)
  const colorIndex = colorNames.indexOf(color);
  colorNames.slice(colorIndex, 1)
  let choices = colorNames.slice(0, 3)
  choices.push(color)
  randomiseArray(choices)
  return choices
}
const colors = colours.map(color => { return { ...color, selected: false, choices: formRandomChoices(color.colourName, colours) } })

function App() {
  const [selectedColors, setSelectedColors] = useState(colors)
  const [results, setResults] = useState([])
  const [showHome, setShowHome] = useState(true)
  return (
    <div className="App">
      {showHome &&
        <Home {...{ colors, selectedColors, setSelectedColors, setShowHome }} />}
      {!showHome &&
        <ColourTest {...{ selectedColors, results, setResults, randomiseArray }} />}
    </div>
  );
}

export default App;
