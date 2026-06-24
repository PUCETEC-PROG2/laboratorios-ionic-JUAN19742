import React from 'react';
import './LoadingSpinner.css';
import { IonSpinner } from '@ionic/react';

const LoadingSpinner: React.FC = () => {
    return(
        <div className="spinner-overlay">
            <IonSpinner name="circular" color= "primary" className="loading-spinner"/>
        </div>
    )
}

export default LoadingSpinner;