import React from 'react'
import { useEffect, useState } from 'react'
import "./sidebar.scss"
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PersonIcon from '@mui/icons-material/Person';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from "react-router-dom";
import {
    UserOutlined, AppstoreOutlined, LogoutOutlined, HistoryOutlined, LockOutlined, LaptopOutlined, ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined, SaveOutlined
    // ,LinkOutlined    
} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
//import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Image } from 'antd';
import background from './SingleSignOn.png'

import { useAppDispatch } from '../../app/hooks';
import { authAction } from '../../features/auth/authSlice';


//===============================================================================================================================

import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    // getItem('Option 1', '1', <PieChartOutlined />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    // getItem('Option 3', '3', <ContainerOutlined />),

    getItem('Trang chủ', 'sub1', <MailOutlined />, [
        getItem('Người Dùng', '5',<UserOutlined/>),
        getItem('Quyền', '6',<LockOutlined/>),
        getItem('Lịch sử', '7',<HistoryOutlined/>),

    ]),

    getItem('Cấu hình', 'sub2', <AppstoreOutlined />, [
        getItem('Client', '9',<LaptopOutlined/>),
        getItem('ApiScope', '10',<DesktopOutlined/>),
        getItem('ApiResource', '11',<DesktopOutlined/>),
        //getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
    getItem('Hành động', 'sub3', <LogoutOutlined />, [
        getItem('LogOut', '12')
        //getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
];

//=====================================================================================================================================
type Props = {

    isActiveHoverUser: boolean;
    isActiveHoverRole: boolean;
    isActiveHoverHistory: boolean;
    isActiveHoverClient: boolean;
    isActiveHoverTutorial: boolean;
    isActiveHoverLogout: boolean;
    isActiveHoverHome: boolean;
}
const Sidebar = (props: Props) => {

    //=====================================================================================================================================
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    //=====================================================================================================================================
    const [isActiveHoverUser, setIsActiveHoverUser] = useState(props.isActiveHoverUser);
    const [isActiveHoverRole, setIsActiveHoverRole] = useState(props.isActiveHoverRole);
    const [isActiveHoverHistory, setIsActiveHoverHistory] = useState(props.isActiveHoverHistory);
    const [isActiveHoverClient, setIsActiveHoverClient] = useState(props.isActiveHoverClient);
    const [isActiveHoverTutorial, setIsActiveHoverTutorial] = useState(props.isActiveHoverTutorial);
    const [isActiveHoverLogout, setIsActiveHoverLogout] = useState(props.isActiveHoverLogout);
    const [isActiveHoverHome, setIsActiveHoverHome] = useState(props.isActiveHoverHome);

    const resetAll = () => {

        setIsActiveHoverUser(false);
        setIsActiveHoverRole(false);
        setIsActiveHoverHistory(false);
        setIsActiveHoverClient(false);
        setIsActiveHoverTutorial(false);
        setIsActiveHoverLogout(false);
        setIsActiveHoverHome(false);

    };

    const handleClickUser = () => {
        // 👇️ toggle
        if (isActiveHoverUser) return;
        resetAll();
        setIsActiveHoverUser(true);
    };
    const handleClickRole = () => {
        // 👇️ toggle
        if (isActiveHoverRole) return;
        resetAll();
        setIsActiveHoverRole(true);
    };
    const handleClickHistory = () => {
        // 👇️ toggle
        if (isActiveHoverHistory) return;
        resetAll();
        setIsActiveHoverHistory(true);
    };
    const handleClickClient = () => {
        // 👇️ toggle
        if (isActiveHoverClient) return;
        resetAll();
        setIsActiveHoverClient(true);
    };
    const handleClickTutorial = () => {
        // 👇️ toggle
        if (isActiveHoverTutorial) return;
        resetAll();
        setIsActiveHoverTutorial(true);
    };
    const handleClickLogout = () => {
        // 👇️ toggle
        if (isActiveHoverLogout) return;
        resetAll();
        setIsActiveHoverLogout(true);
        signOut();
    };
    const handleClickHome = () => {
        // 👇️ toggle
        if (isActiveHoverHome) return;
        resetAll();
        setIsActiveHoverHome(true);
    };
    useEffect(() => {

    }, [isActiveHoverHome, isActiveHoverLogout,
        isActiveHoverTutorial, isActiveHoverClient,
        isActiveHoverHistory, isActiveHoverRole,
        isActiveHoverUser])
    const dispatch = useAppDispatch();

    const handleLoginout = () => {
        dispatch(
            authAction.logout()

        )
    }
    let navigate = useHistory();
    const routeChange = () => {
        let path = `/login`;
        navigate.push(path);
    };
    function signOut() {
        handleLoginout();
        routeChange();
    };

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e)
        if(e.key === '5'){
            navigate.push('/users')
        }
        if(e.key === '6'){
            navigate.push('/role')
        }
        if(e.key === '7'){
            navigate.push('/loginhistory')
        }
        if(e.key === '9'){
            navigate.push('/client')
        }
        if(e.key === '12'){
            signOut();
        }
    };
    return (
        <div style={{display:'flex', position:'relative'}} >
            
            <Menu
                onClick={onClick}
                style={{ height: "123vh" }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
              
                inlineCollapsed={collapsed}
                items={items}
            />
            <Button type="primary" onClick={toggleCollapsed} style={{  height: '30px',  width :'30px', position:'absolute', right:'-32px' }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
        </div>

    )
}

export default Sidebar