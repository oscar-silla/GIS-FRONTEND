import React, { useState } from 'react';
import { PageHeader } from 'antd';
import { Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';


const NavbarComponent = ({callBackShow}) => {
    const [state, setState] = useState({
        collapsed: false
    });
    const { collapsed } = state;

    const toggleCollapsed = () => {
        if (!collapsed) {
            setState({
                collapsed: true
            });
            callBackShow(collapsed)
        } else {
            setState({
                collapsed: false
            });
            callBackShow(collapsed)
        }
    }
    return (
        <div>
            <PageHeader
                className="site-page-header"
                style={{backgroundColor: 'white'}}
                title={
                    <div className='flex'>
                        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16, marginRight:10 }}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
                        <img alt='LOGO' className='logo' src='https://i.imgur.com/XxtwMes.png'></img>
                        <h3>Sistema de gestión clínica</h3>
                    </div>
                }
            />
        </div>
    );
}

export default NavbarComponent;