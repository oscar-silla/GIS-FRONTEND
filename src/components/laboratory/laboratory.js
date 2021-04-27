import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CreateLabReportsComponent from './lab_reports/create-lab-reports'
import LabReportsTableComponent from './lab_reports/lab-reports-table';

const LaboratoryComponent = () => {

    const [created, setCreated] = useState(false);
    const [patients, setPatients] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/patients')
            .then(result => {
                const { data } = result.data;
                setPatients(data);
            });
    }, []);

    const onCreate = (value) => {
        if (value) {
            setCreated(true);
        }
    }

    return (
        <div>
            <div className='flex-space'>
                <CreateLabReportsComponent onCreate={onCreate} />
                <LabReportsTableComponent
                    created={created}
                    setCreated={setCreated}
                    patients={patients} />
            </div>
        </div>
    );
}

export default LaboratoryComponent;
