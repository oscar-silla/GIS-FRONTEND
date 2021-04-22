import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CreateCasesComponent from './create-cases'
import TableCasesComponent from './table-cases'

const CasesComponent = () => {

    const [patients, setPatients] = useState([]);
    const [isCreated, setIsCreated] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/patients')
            .then(result => {
                const { data } = result.data;
                setPatients(data);
            });
    }, []);

    const createCaseCallback = (value) => {
        setIsCreated(value);
    }

    return (
        <div className='flex-space'>
            <CreateCasesComponent createCaseCallback={createCaseCallback} />
            <TableCasesComponent patients={patients} isCreated={isCreated} setIsCreated={setIsCreated} />
        </div>
    )
}

export default CasesComponent;