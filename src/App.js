import wineData from './Assets/Wine-Data.json';
import FlavanoidsData from './Component/FlavanoidsData';
import DisplayGammaData from './Component/DisplayGammaData';
import './App.css';
function App() {
  return (
    <div className="App">
      <h1>Wine Data</h1>
      <FlavanoidsData wineData={wineData}/>
      <h1>Wine Data - Gamma</h1>
      <DisplayGammaData wineData = {wineData} />
    </div>
  );
}

export default App;
