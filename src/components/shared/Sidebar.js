import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import {
    Link
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUserMd,
    faUserInjured,
    faCalendarAlt,
    faUserFriends,
    faClinicMedical,
    faPills,
    faFlask
} from '@fortawesome/free-solid-svg-icons'


const { SubMenu } = Menu;
const SidebarComponent = ({ visible }) => {

    const [state, setState] = useState({
        collapsed: false
    });

    useEffect(() => {
        setState({
            collapsed: visible
        })
    }, [visible]);

    const { collapsed } = state;

    return (
        <div>
            <div style={{ width: 256 }}>
                {
                    (collapsed) ?
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            inlineCollapsed={collapsed}
                        >
                            <SubMenu key="sub1" icon={<FontAwesomeIcon icon={faUserMd} className='icon' />}>
                                <Menu.Item key="1"><Link to='/doctor_list'></Link>Lista de Doctores</Menu.Item>
                                {/* <Menu.Item key="2">Historia del tratamiento</Menu.Item> */}
                            </SubMenu>
                            <SubMenu key="sub2" icon={<FontAwesomeIcon icon={faUserInjured} className='icon' />}>
                                <Menu.Item key="3"><Link to='/patient_list'></Link>Lista de Pacientes</Menu.Item>
                                {/*  <Menu.Item key="4">Pagos</Menu.Item> */}
                                <Menu.Item key="5"><Link to='/cases'></Link>Caso del Paciente</Menu.Item>
                                <Menu.Item key="6"><Link to='/documents'></Link>Documentos del Paciente</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<FontAwesomeIcon icon={faCalendarAlt} className='icon' />}>
                                <Menu.Item key="7"><Link to='/cites'></Link>Citas</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" icon={<FontAwesomeIcon icon={faUserFriends} className='icon' />}>
                                <Menu.Item key="8"><Link to='/rrhh/nurses'></Link>Enfermeras</Menu.Item>
                                <Menu.Item key="9"><Link to='/rrhh/pharmacists'></Link>Farmac??uticos</Menu.Item>
                                <Menu.Item key="10"><Link to='/rrhh/lab_worker'></Link>Laboratoristas</Menu.Item>
                                <Menu.Item key="11"><Link to='/rrhh/technician'></Link>Mantenimiento</Menu.Item>
                                <Menu.Item key="12"><Link to='/rrhh/recepcionist'></Link>Recepcionistas</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub5" icon={<FontAwesomeIcon icon={faClinicMedical} className='icon' />}>
                                <Menu.Item key="13"><Link to='/farmacy'></Link>Farmac??uticas</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub6" icon={<FontAwesomeIcon icon={faPills} className='icon' />}>
                                <Menu.Item key="14"><Link to='/medicine'></Link>Medicamentos</Menu.Item>
                                <Menu.Item key="15"><Link to='/medicine/categories'></Link>Categorias</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub7" icon={<FontAwesomeIcon icon={faFlask} className='icon' />}>
                                <Menu.Item key="16"><Link to='/laboratory'></Link>Informes de Laboratorio</Menu.Item>
                            </SubMenu>
                        </Menu>
                        :
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            inlineCollapsed={collapsed}
                        >
                            <SubMenu key="sub1" icon={<FontAwesomeIcon icon={faUserMd} className='icon' />} title={<span className='p-sidebar'>M??dicos</span>}>
                                <Menu.Item key="1"><Link to='/doctor_list'></Link>Lista de Doctores</Menu.Item>
                                {/* <Menu.Item key="2">Historia del tratamiento</Menu.Item> */}
                            </SubMenu>
                            <SubMenu key="sub2" icon={<FontAwesomeIcon icon={faUserInjured} className='icon' />} title={<span className='p-sidebar'>Pacientes</span>}>
                                <Menu.Item key="3"><Link to='/patient_list'></Link>Lista de Pacientes</Menu.Item>
                                {/* <Menu.Item key="4">Pagos</Menu.Item> */}
                                <Menu.Item key="5"><Link to='/cases'></Link>Caso del Paciente</Menu.Item>
                                <Menu.Item key="6"><Link to='/documents'></Link>Documentos del Paciente</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<FontAwesomeIcon icon={faCalendarAlt} className='icon' />} title={<span className='p-sidebar'>Citas</span>}>
                                <Menu.Item key="7"><Link to='/cites'></Link>Citas</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" icon={<FontAwesomeIcon icon={faUserFriends} className='icon' />} title={<span className='p-sidebar'>Recursos Humanos</span>}>
                                <Menu.Item key="8"><Link to='/rrhh/nurses'></Link>Enfermeras</Menu.Item>
                                <Menu.Item key="9"><Link to='/rrhh/pharmacists'></Link>Farmac??uticos</Menu.Item>
                                <Menu.Item key="10"><Link to='/rrhh/lab_worker'></Link>Laboratoristas</Menu.Item>
                                <Menu.Item key="11"><Link to='/rrhh/technician'></Link>Mantenimiento</Menu.Item>
                                <Menu.Item key="12"><Link to='/rrhh/recepcionist'></Link>Recepcionistas</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub5" icon={<FontAwesomeIcon icon={faClinicMedical} className='icon' />} title={<span className='p-sidebar'>Farmacia</span>}>
                                <Menu.Item key="13"><Link to='/farmacy'></Link>Farmac??uticas</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub6" icon={<FontAwesomeIcon icon={faPills} className='icon' />} title={<span className='p-sidebar'>Medicinas</span>}>
                                <Menu.Item key="14"><Link to='/medicine'></Link>Medicamentos</Menu.Item>
                                <Menu.Item key="15"><Link to='/medicine/categories'></Link>Categorias</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub7" icon={<FontAwesomeIcon icon={faFlask} className='icon' />} title={<span className='p-sidebar'>Laboratorio</span>}>
                                <Menu.Item key="16"><Link to='/laboratory'></Link>Informes de Laboratorio</Menu.Item>
                            </SubMenu>
                        </Menu>
                }

            </div>
        </div>
    );
}

export default SidebarComponent;