import React, { useState } from 'react';
import regions from '../data/regions.json';
import '../css/components/RegionModal.css';

const RegionModal = ({ onSelect, onClose }) => {
  const [selectedRegion, setSelectedRegion] = useState('서울');

  return (
    <div className="region-modal-overlay">
      <div className="region-modal">
        <div className="modal-header">
          <span>지역선택</span>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="region-sidebar">
            {Object.keys(regions).map((region) => (
              <button
                key={region}
                className={`region-tab ${selectedRegion === region ? 'active' : ''}`}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
          <div className="region-list">
            <div className="region-list-header">
              <strong>{selectedRegion}</strong>
              <button className="select-all">전체선택</button>
            </div>
            <ul>
              {regions[selectedRegion].map((item, idx) => (
                <li key={idx}>
                  <span>{item}</span>
                  <button onClick={() => onSelect(`${selectedRegion} ${item}`)}>선택</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionModal;
