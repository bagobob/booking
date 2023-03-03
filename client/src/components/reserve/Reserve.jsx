import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import "./reserve.css";

export const Reserve = ({ setOpen, hotelId }) => {

    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading } = useFetch(`/hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);
    const navigate = useNavigate()

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate);
        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return dates;
    };

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        );

        return !isFound;
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );
    };

    const handleClick = async (e) => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`/rooms/availability/${roomId}`, {
                        dates: allDates
                    });
                    return res.data;
                })
            );
            setOpen(false);
            navigate("/")
        } catch (error) { }
    }

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={() => setOpen(false)}
                />
                <span>Select your rooms:</span>
                {loading ? "loading" : data.map((item, index) => (
                    <div className="rItem" key={index}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                            <div className="rPrice">${item.price}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item.roomNumbers.map((roomNumber, index) => (
                                <div className="room" key={index}>
                                    <label>{roomNumber.number}</label>
                                    <input
                                        type="checkbox"
                                        value={roomNumber._id}
                                        disabled={!isAvailable(roomNumber)}
                                        onChange={handleSelect} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">Reserve Now</button>
            </div>
        </div>
    )
}
