import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MedicineTableComponent from './medicine-table'

const MedicineComponent = () => {

    const [farmacies, setFarmacies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/farmacies')
            .then(result => {
                const { data } = result.data;
                setFarmacies(data);
            });
    }, []);

    return (
        <div>
            <MedicineTableComponent farmacies={farmacies} />
        </div>
    );
}

export default MedicineComponent;
