import React from "react";
import './WineDataTable.css';
const FlavanoidsData = ({wineData}) => {

    //Find unique alcohol classess from the wineData
    const alcoholClasses = [...new Set(wineData.map((wine) => wine.Alcohol))];

    // Calculate Mean
const calculateMean = (property, alcoholClass) => {
    const filteredData = wineData.filter((wine) => wine.Alcohol === alcoholClass);
    const values = filteredData.map((wine) => parseFloat(wine[property])); // Parse values as numbers
    const sum = values.reduce((acc, value) => acc + value, 0);
    return (sum / values.length).toFixed(3);
  };
  
  // Calculate Median
  const calculateMedian = (property, alcoholClass) => {
    const filteredData = wineData.filter((wine) => wine.Alcohol === alcoholClass);
    const values = filteredData.map((wine) => parseFloat(wine[property])); // Parse values as numbers
    const sortedValues = values.sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);
    if (sortedValues.length % 2 === 0) {
      return ((sortedValues[mid - 1] + sortedValues[mid]) / 2).toFixed(3);
    } else {
      return sortedValues[mid].toFixed(3);
    }
  };
  
  // Calculate Mode
  const calculateMode = (property, alcoholClass) => {
    const filteredData = wineData.filter((wine) => wine.Alcohol === alcoholClass);
    const values = filteredData.map((wine) => parseFloat(wine[property])); // Parse values as numbers
    const occurrences = new Map();
  
    values.forEach((value) => {
      occurrences.set(value, (occurrences.get(value) || 0) + 1);
    });
  
    let maxCount = 0;
    let mode;
  
    occurrences.forEach((count, value) => {
      if (count > maxCount) {
        maxCount = count;
        mode = value;
      }
    });
  
    return mode !== undefined ? mode.toFixed(3) : 'N/A';
  };

    return (
        <div>
            <table className="wine-table">
                <thead>
                    <tr>
                        <th>Measure</th>
                        {alcoholClasses.map((alcoholClass, index) => (
                            <th key={index}>Class {alcoholClass}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> Flavanoids Mean</td>
                        {alcoholClasses.map((alcoholClass, index)=>(
                            <td key={index}>{calculateMean('Flavanoids', alcoholClass)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td> Flavanoids Median</td>
                        {alcoholClasses.map((alcoholClass, index) => (
                            <td key={index}>{calculateMedian('Flavanoids', alcoholClass)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Flavanoids Mode</td>
                        {alcoholClasses.map((alcoholClass, index) => (
                            <td key={index}>{calculateMode('Flavanoids', alcoholClass)}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )

}

export default FlavanoidsData