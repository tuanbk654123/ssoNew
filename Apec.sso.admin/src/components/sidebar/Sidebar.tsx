import React, { useEffect } from 'react'
import { useState } from 'react'
import "./sidebar.scss"
import {
    UserOutlined, AppstoreOutlined, LogoutOutlined, HistoryOutlined, LockOutlined, LaptopOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
    // ,LinkOutlined    
} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
//import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Button, Image } from 'antd';
import background from './logo.png'

import { useAppDispatch } from '../../app/hooks';
import { authAction } from '../../features/auth/authSlice';


//===============================================================================================================================

import type { MenuProps } from 'antd';
import {  Menu } from 'antd';

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
    openKey: string;
    isActiveHoverUser: boolean;
    isActiveHoverRole: boolean;
    isActiveHoverHistory: boolean;
    isActiveHoverClient: boolean;
    isActiveHoverApiScopes:boolean;
    isActiveHoverTutorial: boolean;
    isActiveHoverLogout: boolean;
    isActiveHoverHome: boolean;
}
const Sidebar = (props: Props) => {
    const [current, setCurrent] = useState('1');
    const [openKeys, setOpenkey] = useState<string[]>([props.openKey]);
    const rootKeys = ["sub1", "sub2",'sub3'];
    //=====================================================================================================================================
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        if(props.isActiveHoverUser === true){
            setCurrent('5');
            setOpenkey(['sub1']);
        }
        if(props.isActiveHoverRole === true){
            setCurrent('6');
            setOpenkey(['sub1']);
        }
        if(props.isActiveHoverHistory === true){
            setCurrent('7');
            setOpenkey(['sub1']);
        }

        if(props.isActiveHoverClient === true){
            setCurrent('9');
            setOpenkey(['sub2']);
        }

        if(props.isActiveHoverApiScopes === true){
            setCurrent('10');
            setOpenkey(['sub2']);
        }
        
        if(props.isActiveHoverLogout === true){
            setCurrent('12');
            setOpenkey(['sub3']);
        }
    }, [])

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
        setCurrent(e.key);


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
        if(e.key === '10'){
            navigate.push('/apiScopes')
        }
        if(e.key === '12'){
            signOut();
        }
    };
    const onOpenChange = (items: any[]) => {
        if(!collapsed){
            const latestOpenKey = items.find(key => openKeys.indexOf(key) === -1);
            if (rootKeys.indexOf(latestOpenKey) === -1) {
                setOpenkey(items);
            } else {
                setOpenkey(latestOpenKey ? [latestOpenKey] : ['5']);
            }
        }
        else{
            setOpenkey(items);
        }
       
      };
    return (
        <div style={{
            position:'relative',
            background:'#001529',
            width:collapsed ?"4vw":"13vw" 
        }} >

           <Image
                width={collapsed ?"4vw":"13vw" }
                height={collapsed ?"28px":"90px"}
                src={ background}
                preview= {false}
                style={{ paddingRight:collapsed?'':'1.5vw',paddingLeft:collapsed?'':'1.5vw',marginTop:collapsed?'31px':'',marginBottom:collapsed?'60px':''}}
            />
            {/* <Button type="text" onClick={toggleCollapsed} style={{  height: '70px',  width :'30px', position:'absolute', top:'0px', right:'-32px' }}>
                {collapsed ? <MenuUnfoldOutlined  /> : <MenuFoldOutlined />}
            </Button> */}
            <Menu
                onClick={onClick}
        
                onOpenChange={onOpenChange}
                style={{ height: "123vh" , width:collapsed ?"4vw":"13vw"  }}
                //defaultSelectedKeys={[]}
                //defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                selectedKeys={[current]}
                openKeys={openKeys}
                inlineCollapsed={collapsed}
                items={items}
            />
         
        </div>

    )
}

export default Sidebar