import React, { useState } from 'react';
import Header from './Header';
import SliderInput from './SliderInput';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GenericCalculatorPage = ({ title, description, inputs, calculate, chartOptions }) => {
  const [inputValues, setInputValues] = useState({});
  const [result, setResult] = useState(null);

  const handleInputChange = (name, value) => {
    setInputValues(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    const calculatedResult = calculate(inputValues);
    setResult(calculatedResult);
  };

  return (
    <div>
      <Header title={title} description={description} />
      <main className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Paramètres</h2>
            {inputs.map(input => (
              <SliderInput
                key={input.name}
                label={input.label}
                min={input.min}
                max={input.max}
                step={input.step}
                value={inputValues[input.name] || input.defaultValue}
                onChange={value => handleInputChange(input.name, value)}
              />
            ))}
            <button
              onClick={handleCalculate}
              className="mt-4 bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary transition-colors"
            >
              Calculer
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Résultats</h2>
            {result && (
              <>
                <p className="text-lg mb-4">{result.text}</p>
                <Line data={result.chartData} options={chartOptions} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenericCalculatorPage;