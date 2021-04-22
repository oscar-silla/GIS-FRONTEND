import { Divider } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CasesTableComponent from './cases_patient_detail/cases-table';
import DocumentsTableComponent from './documents_patient_detail/documents_table';
import PrescriptionsTableComponent from './prescriptions_patient_detail/prescriptions-table-component';


const PatientDetailComponent = () => {

    const { id } = useParams();
    const [patient, setPatient] = useState({
        name: '',
        surnames: '',
        phone: ''
    });
    const { name, surnames, phone } = patient;

    const [doctors, setDoctors] = useState([]);
    const [updated, setUpdated] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:4000/patients/${id}`)
            .then(result => {
                const { data } = result.data;
                let firstPhone = data.phone.toString().slice(0, 3);
                let secondPhone = data.phone.toString().slice(3, 6);
                let thirdPhone = data.phone.toString().slice(6, 9);
                const phone = firstPhone + "-" + secondPhone + "-" + thirdPhone;
                setPatient({
                    name: data.name,
                    surnames: data.surnames,
                    phone: phone
                });
            });
        axios.get(`http://localhost:4000/doctors/`)
                .then(result => {
                    const {data} = result.data;
                    console.log(data)
                    setDoctors(data);
                });
    }, []);


    return (
        <div>
            <h1>Historial Médico | {patient.name + " " + patient.surnames} | +36#{patient.phone}</h1>
            <Divider />
            <div className='flex-space'>
                <CasesTableComponent idUser={id}></CasesTableComponent>
                <DocumentsTableComponent idUser={id}></DocumentsTableComponent>
                <PrescriptionsTableComponent idUser={id} setUpdated={setUpdated} doctors={doctors}></PrescriptionsTableComponent>
            </div>
        </div>
    );
}

export default PatientDetailComponent;