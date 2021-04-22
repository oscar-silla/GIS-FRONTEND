import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TableDocumentsComponent from './table-documents';

const PatientDocumentsComponent = () => {

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/patients')
                .then(result => {
                    const {data} = result.data;
                    setPatients(data);
                });
    }, []);

    return (
        <div>
            <TableDocumentsComponent patients={patients} />
        </div>
    )
}

export default PatientDocumentsComponent;