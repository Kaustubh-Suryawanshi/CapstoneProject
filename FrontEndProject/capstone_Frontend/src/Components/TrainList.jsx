import React, { useContext, useEffect, useState } from 'react';
import TrainTile from './Traintile'; // Import the TrainTile component
import { TrainContext } from '../Context/TrainContext';
import { toast, ToastContainer } from 'react-toastify';
import '../styles/SearchBar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const TrainList = () => {
    const { trains, setTrains,sortedTrains } = useContext(TrainContext);
    const { userID, role } = useContext(UserContext);
    // const [src, setSrc]=useState(trains[0].from_source)
    // const [des, setDes]=useState(trains[0].to_destination)
    // const [date, setDate]=useState(trains[0].departure_date)
    const [sortby, setSortby] = useState('available_seats');
    const nav = useNavigate();

    const addButtonStyle = {
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1rem",
        transition: "background-color 0.2s ease-in-out",
    };
    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     axios
    //         .get(
    //             `http://localhost:8081/trains/search?src=${src}&des=${des}&date=${date}`
    //         )
    //         .then((response) => {
    //             setTrains(response.data);
    //             if (!response.data) {
    //                 toast.error('No trains available')
    //                 return;
    //             }
    //             nav("/trains")
    //         })
    //         .catch(console.error());

    // }

    useEffect(() => {
        setTrains(trains);
    }, [trains]);

    //either do it here or in getTrains..... just remeber to change the navbar link path
    
    // if(role==='admin'){
    // useEffect(() => {
    //     const fetchUser = async () => {
    //       try {
    //         const response = await axios.get(
    //           `http://localhost:8081/trains/search/alltrains`
    //         );
    //         console.log(response.data)
    //         setTrains(response.data);
    //         sortedTrains('available_seats');
    //       } catch (err) {
    //         console.log(err.message);
    //       }
    //     };
    
    //     fetchUser();
    //   }, []);
    // }

    useEffect(() => {
        sortedTrains(sortby);
    }, [sortby]);
    return (
        <>
            <div className='traindiv' style={{ display: "flex", flexDirection: "column" }}>
                {userID != 0 && role === 'admin' && (
                    <div
                        className="addbook-button"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <button
                            onClick={() => {
                                if (role === "admin") nav("/admin/addtrain");
                                else nav("/login");
                            }}
                            style={addButtonStyle}
                        >
                            Add new Train
                        </button>
                    </div>
                )}

                {/* <div className="searchbar">
                    <input type="text" name="src" value={src} placeholder="Source" onChange={(e)=>{setSrc(e.target.value)}} className="search-input" />
                    <p className="to-text">to</p>
                    <input type="text" name="des" value={des} placeholder="Destination" className="search-input" onChange={(e)=>{setDes(e.target.value)}}/>
                    <input type="date" name="date" value={date} className="date-input" onChange={(e)=>{setDate(e.target.value)}}/>
                    <button className="modify-button" onClick={handleSearch}>Modify Search</button>
                </div>  */}
                <div className="filterandlist" style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div className="filters" style={{ flex: "1", border: "2px solid black", height: "500px" }}>
                        <p>filters will be here</p>
                    </div>
                    <div className='list' style={{ flex: "2" }}>
                        <div className="form-group" style={{ maxWidth: "150px", marginLeft: "8px" }}>
                            <label>sort by:</label>
                            <select
                                onChange={(e) => setSortby(e.target.value)}
                                required
                            >
                                {/* <option value="select">Select</option> */}
                                <option value="available_seats">Seat availability</option>
                                <option value="amount_per_seat">Price</option>
                                <option value="train_name">Name</option>
                                <option value="departure_date">Departure date</option>
                            </select>
                        </div>
                        {trains.length > 0 ? (
                            trains.map((train) => (
                                <TrainTile key={train.train_id} train={train} updateTrains={setTrains} />
                            ))
                        ) : (
                            <h4>No trains found for the selected criteria.</h4>
                        )}
                    </div>
                </div>

            </div>

        </>

    );


};

export default TrainList;
