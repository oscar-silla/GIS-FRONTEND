import React, { useState } from 'react';
import SidebarComponent from './components/shared/Sidebar';
import NavbarComponent from './components/shared/Navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import DoctorListComponent from './components/doctor/doctor-table';
import CreateDoctorComponent from './components/doctor/create-doctor';
import PatientTableComponent from './components/patient/patient_list/patient-table';
import CreatePatientComponent from './components/patient/patient_list/create-patient';
import PatientDetailComponent from './components/patient/patient_detail/patient_detail';
import CasesComponent from './components/patient/cases/cases';
import PatientDocumentsComponent from './components/patient/documents/documents';
import AllCitesComponent from './components/cites/all_cites/cites';
import NurseComponent from './components/rrhh/nurse/nurse';
import PharmacistComponent from './components/rrhh/pharmacist/pharmacist';
import LabWorkerComponent from './components/rrhh/lab_worker/lab-worker';



const App = () => {
    const [state, setState] = useState({
        visible: true
    });

    const { visible } = state;

    const callBackShow = (show) => {
        setState({
            visible: show
        });
    }

    return (
        <div>
            <Router>
                <div className='fixed-top'>
                    <NavbarComponent callBackShow={callBackShow}></NavbarComponent>
                </div>
                <div className='flex-content mt-5'>
                    <div className='fixed-navbar'>
                        <SidebarComponent visible={visible}></SidebarComponent>
                    </div>
                    <div className='center'>
                        <div className='width-content'>
                            <div className='p-5'>

                                <Switch>
                                    <Route exact path="/doctor_list" component={DoctorListComponent} />
                                    <Route exact path="/create_doctor" component={CreateDoctorComponent} />
                                    <Route exact path="/patient_list" component={PatientTableComponent} />
                                    <Route exact path="/create_patient" component={CreatePatientComponent} />
                                    <Route exact path="/patient_detail/:id" component={PatientDetailComponent} />
                                    <Route exact path="/cases" component={CasesComponent} />
                                    <Route exact path="/documents" component={PatientDocumentsComponent} />
                                    <Route exact path="/cites" component={AllCitesComponent} />
                                    <Route exact path="/rrhh/nurses" component={NurseComponent} />
                                    <Route exact path="/rrhh/pharmacists" component={PharmacistComponent} />
                                    <Route exact path="/rrhh/lab_worker" component={LabWorkerComponent} />
                                </Switch>

                            </div>
                        </div>
                    </div>
                </div>


            </Router>
        </div>
    );
}

export default App;