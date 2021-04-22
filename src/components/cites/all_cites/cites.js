import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CitesTableComponent from './cites-table';

const AllCitesComponent = () => {

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/patients')
            .then(result => {
                const { data } = result.data;
                setPatients(data);
            });
        axios.get('http://localhost:4000/doctors')
            .then(result => {
                const { data } = result.data;
                setDoctors(data);
            });
    }, [])

    return (
        <div>
            <CitesTableComponent patients={patients} doctors={doctors} />
        </div>
    )
}

export default AllCitesComponent;