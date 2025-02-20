import React, { useState } from 'react';
import './Upload.css';
import Img from './G1.png';

function Upload() {
  const [age, setAge] = useState('');
  const [mriImage, setMriImage] = useState(null);
  const [fmriImage, setFmriImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [predictionColor, setPredictionColor] = useState('');
  const [advisoryMessage, setAdvisoryMessage] = useState('');

  const handleAgeChange = (e) => setAge(e.target.value);

  const handleMriImageChange = (e) => setMriImage(e.target.files[0]);

  const handleFmriImageChange = (e) => setFmriImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!age || !mriImage || !fmriImage) {
      alert('Please provide all inputs.');
      return;
    }

    const formData = new FormData();
    formData.append('age', age);
    formData.append('mri_image', mriImage);
    formData.append('fmri_image', fmriImage);

    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Failed to get prediction:', response.status);
        return;
      }

      const data = await response.json();

      console.log('Prediction Response:', data);

      if (data.final_prediction) {
        setResponse(data.final_prediction);

        setPredictionColor(data.final_prediction === 'Autism' ? 'red' : 'green');

        if (data.final_prediction === 'Autism') {
          if (parseInt(age) < 5) {
            setAdvisoryMessage(
              'As your child is below 5 years old, it\'s important to work with developmental specialists, provide early interventions, and engage in activities that promote social and emotional growth.'
            );
          } else {
            setAdvisoryMessage(
              'For children above 5, ensure that teachers, friends, and family are aware of the diagnosis to provide the necessary support and accommodations.'
            );
          }
        } else {
          setAdvisoryMessage(''); 
        }
      } else {
        console.error('No prediction result in the response.');
      }
    } catch (error) {
      console.error('Error during prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="Left">
        <div className="upload-form">
          {!response ? (
              <form onSubmit={handleSubmit}>
                <h1>Upload</h1>
              <div>
                <label htmlFor="age">Age: </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={handleAgeChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="mri">Upload MRI Image (PNG): </label>
                <input
                  type="file"
                  id="mri"
                  accept="image/png"
                  onChange={handleMriImageChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="fmri">Upload fMRI Image (PNG): </label>
                <input
                  type="file"
                  id="fmri"
                  accept="image/png"
                  onChange={handleFmriImageChange}
                  required
                />
              </div>

              <div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Uploading...' : 'Submit'}
                </button>
              </div>
            </form>
          ) : (
            <div className="prediction-result">
              <h1>
                Prediction Result: 
              </h1><h1 style={{ color: predictionColor }}>{response}</h1>

              {response === 'Autism' && (
                <>
                  <h1>Advisory:</h1>
                  <h2>{advisoryMessage}</h2>
                </>
              )}
            </div>
        )}
        </div>
      </div>

      <div className="Right">
        <img src={Img} alt="Smiley face" className="background-image" />
      </div>
    </div>
  );
}

export default Upload;
