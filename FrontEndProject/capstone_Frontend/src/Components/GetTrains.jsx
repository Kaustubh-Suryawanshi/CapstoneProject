import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { TrainContext } from '../Context/TrainContext';
import TrainList from './TrainList';
const GetTrains = () => {
    const {setTrains,sortedTrains}=useContext(TrainContext)
    useEffect(() => {
        const fetchTrains = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8081/trains/search/alltrains`
            );
            setTrains(response.data);
            sortedTrains('available_seats');
          } catch (err) {
            console.log(err.message);
          }
        };
        fetchTrains();
      }, []);
  return (
    <div>
      <TrainList/>
    </div>
  )
}

export default GetTrains
