import React, { createContext, useState } from 'react';

export const TrainContext = createContext();

export const TrainProvider = ({ children }) => {
    const [trains, setTrains] = useState([]);

    const sortedTrains = (property) => {

        if (property !== 'available_seats') {
            const sortedData = [...trains].sort((a, b) => {
                if (a[property] < b[property]) return -1;
                if (a[property] > b[property]) return 1;
                return 0;
            });
            setTrains(sortedData);
        }
        else{
            const sortedData = [...trains].sort((a, b) => {
                if (a[property] < b[property]) return 1;
                if (a[property] > b[property]) return -1;
                return 0;
            });
            setTrains(sortedData);
        }
        
    }
    return (
        <TrainContext.Provider value={{ trains, setTrains, sortedTrains }}>
            {children}
        </TrainContext.Provider>
    );
};
