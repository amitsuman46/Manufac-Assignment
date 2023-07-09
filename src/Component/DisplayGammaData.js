import React from 'react';
import './WineDataTable.css';
const calculateGamma = (wineData) => {
    const newData = wineData.map((wine) => {
    const ash = parseFloat(wine.Ash);
    const hue = parseFloat(wine.Hue);
    const magnesium = parseFloat(wine.Magnesium);
        const gamma = ((ash * hue) / magnesium) // Round off to 3 decimal places
        return { ...wine, Gamma: gamma };
      });
    
      const uniqueClasses = [...new Set(newData.map((wine) => wine.Alcohol))];
    
      const calculateMean = (property, alcoholClass) => {
        const filteredData = newData.filter((wine) => wine.Alcohol === alcoholClass);
        const values = filteredData.map((wine) => wine[property]);
        const sum = values.reduce((acc, value) => acc + value, 0);
        return (sum / values.length).toFixed(3); // Round off to 3 decimal places
      };
    
      const calculateMedian = (property, alcoholClass) => {
        const filteredData = newData.filter((wine) => wine.Alcohol === alcoholClass);
        const values = filteredData.map((wine) => Number(wine[property])); // Parse values as numbers
        const sortedValues = values.sort((a, b) => a - b);
        const mid = Math.floor(sortedValues.length / 2);
        let median;
      
        if (sortedValues.length % 2 === 0) {
          const lowerValue = sortedValues[mid - 1];
          const upperValue = sortedValues[mid];
          median = ((lowerValue + upperValue) / 2).toFixed(3); // Round off to 3 decimal places
        } else {
          median = sortedValues[mid].toFixed(3); // Round off to 3 decimal places
        }
      
        return median;
      };
      
    
      const calculateMode = (property, alcoholClass) => {
        const filteredData = newData.filter((wine) => wine.Alcohol === alcoholClass);
        const values = filteredData.map((wine) => wine[property]);
        const occurrences = {};
        values.forEach((value) => {
          occurrences[value] = (occurrences[value] || 0) + 1;
        });
        let maxCount = 0;
        let mode;
        for (const value in occurrences) {
          if (occurrences[value] > maxCount) {
            maxCount = occurrences[value];
            mode = value;
          }
        }
        return mode !== undefined ? Number(mode).toFixed(3) : 'N/A'; // Round off to 3 decimal places
      };
      
    
    const result = {};

    uniqueClasses.forEach((alcoholClass) => {
      result[alcoholClass] = {
        Mean: calculateMean('Gamma', alcoholClass),
        Median: calculateMedian('Gamma', alcoholClass),
        Mode: calculateMode('Gamma', alcoholClass),
      };
    });
  
    return result;
}


const DisplayGammaData = ({ wineData }) => {
    const gammaData = calculateGamma(wineData);
  
    return (
      <div>
        <table className="wine-table">
          <thead>
            <tr>
              <th>Measure</th>
              {Object.keys(gammaData).map((alcoholClass, index) => (
                <th key={index}>Class {alcoholClass}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gamma Mean</td>
              {Object.keys(gammaData).map((alcoholClass, index) => (
                <td key={index}>{gammaData[alcoholClass].Mean}</td>
              ))}
            </tr>
            <tr>
              <td>Gamma Median</td>
              {Object.keys(gammaData).map((alcoholClass, index) => (
                <td key={index}>{gammaData[alcoholClass].Median}</td>
              ))}
            </tr>
            <tr>
              <td>Gamma Mode</td>
              {Object.keys(gammaData).map((alcoholClass, index) => (
                <td key={index}>{gammaData[alcoholClass].Mode}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

export default DisplayGammaData;