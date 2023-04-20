import React from 'react'
import "./datatable.scss";
import { useEffect, useState } from "react";
import { clientAction} from '../../../features/client/clientSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import { SearchOutlined,PlusOutlined,ExclamationCircleOutlined  } from '@ant-design/icons';
import { 
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined    } from '@ant-design/icons';
import { Pagination,Table,Button, Col, Drawer, Form, Input, Row, Space ,Modal} from 'antd';
import { Client, SearchClientDto} from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';

type Props = {}

const { TextArea } = Input;

const Datatable = (props: Props) => {

//Innit state
const [SearchParam, setSearchParam] = useState<SearchClientDto>({ 
  PageNumber:1,
  PageSize:10,
  ClientId: "",
  ClientName: "",
  ClientUri: ""
} );
const [ClientAddOrEdit, setClientAddOrEdit] = useState<Client>({
  id:"",
  ClientId: "",
  ClientName: "",
  ClientUri: "",
  AllowedScopes: [],
  RedirectUris: [],

} 
 );
//state open adduser
const [open, setOpen] = useState(false);


// add or Update
const [addOrUpdate, setaddOrUpdate] = useState(0);// 1 is add , 2 is update

//================================================================

const dispatch = useAppDispatch();

useEffect(() => {

  dispatch(clientAction.searchclient(SearchParam));// init Client select
}, [dispatch,SearchParam])

  // lấy data từ reducer 
  const clients = useAppSelector((state) => state.client.lstRespone)  ;
  console.log("Datatable clients = "+ JSON.stringify(clients) );

  //Thay đổi Size chage
  const onShowSizeChange = (current : number, pageSize: number) => {

    setSearchParam({
      ...SearchParam,
      PageNumber:current,
      PageSize:pageSize,
    } )


  };  


  //Add
  const onChangeAddClientId = (e : any) => {
    
    setClientAddOrEdit({
      ...ClientAddOrEdit,
      ClientId:e.target.value
    } )
  }
  const onChangeAddClientName= (e: any) => {
    setClientAddOrEdit(  {
      ...ClientAddOrEdit,
      ClientName:e.target.value
    } )
  }

  //==========================================
  //search
  const onChangeUserName = (e : any) => {

    setSearchParam(  {
      ...SearchParam,
      ClientId : e.target.value
    } )

    //dispatch(clientAction.searchclient(SearchParam));
  }
  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }
  const Search = ()  => {
    dispatch(clientAction.searchclient(SearchParam));
  }
  //Refresh 
  
  const refresh = async () => {
    const SearchParamChange = {...SearchParam }
    setSearchParam( SearchParamChange)

  }
// Show Add user 
  const showDrawer = () => {
    //init state 
    setClientAddOrEdit({
      ...ClientAddOrEdit,
      ClientId: "",
      ClientUri: "",
      ClientName:""
    })
    // setState add or up date
    setaddOrUpdate(1);
    // open TAB
    setOpen(true);
  };
  // Show edit client 
   const showEditDrawer = (record: Client) => {
    //init state 
      setClientAddOrEdit({
        ...ClientAddOrEdit,
        ClientId: record.ClientId,
        ClientName: record.ClientName,
        id: record.id,
      })
      // setState add or up date
      setaddOrUpdate(2);
      // open TAB
      setOpen(true);
  };
// add client 
  const onAddOrUpdateUser = async () => {
    // add
    if(addOrUpdate === 1){
      const addclient = {
        id:'',
        ClientId: ClientAddOrEdit?.ClientId,
        ClientName :  ClientAddOrEdit?.ClientName,
        ClientUri:  ClientAddOrEdit?.ClientUri,
        AllowedScopes:  ClientAddOrEdit?.AllowedScopes,
        RedirectUris:  ClientAddOrEdit?.RedirectUris,
      }
      const lstClients = [addclient];
      await dispatch( clientAction.addClient(lstClients));

    }
    // Update
    if(addOrUpdate === 2){
      const UpdateClient = {
        id:ClientAddOrEdit?.id,
        ClientId: ClientAddOrEdit?.ClientId,
        ClientName :  ClientAddOrEdit?.ClientName,
        ClientUri:  ClientAddOrEdit?.ClientUri,
        AllowedScopes:  ClientAddOrEdit?.AllowedScopes,
        RedirectUris:  ClientAddOrEdit?.RedirectUris,

      } 
      await dispatch(clientAction.updateClient(UpdateClient));

    }
    await timeout(500);
    await refresh();

    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };
// delete Client==================================================================================
const { confirm } = Modal;
const [modal1Open, setModal1Open] = useState<boolean>(false);
const handleDelete =  async (id: string) => {
  confirm({
    open: modal1Open,
    icon: <ExclamationCircleOutlined />,
    title: 'Xóa client',
    content: 'Bạn có muốn xóa client này?',
    async onOk() {
      const lstId = [id];
      await dispatch(clientAction.deleteClient(lstId));
      await timeout(500);
      refresh();
      setModal1Open(false)
    },
    onCancel() {setModal1Open(false)}
  });
};

  // cột của Bảng==================================================================================
  const clientColumns: ColumnsType<Client> =[
    {
      title: 'clientId',
      width: 100,
      dataIndex: 'clientId',
      key: 'clientId',
      fixed: 'left',
    },
    {
      title: 'Tên',
      width: 450,
      dataIndex: 'clientName',
      key: 'clientName',
      fixed: 'left',
    },
  
    {
      title: 'Hành động',
      dataIndex: 'Action',
  
      key: 'operation',
      fixed: 'right',
      width: 100,
      //render: () => <a>action</a>,
      render: (_ : any, record : Client) => {
              return (
                <div className="cellAction">
          
                    <div className="viewButton"
                     onClick={() => showEditDrawer(record)}
                    >Edit</div>
             
                  <div
                    className="deleteButton"
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </div>
                </div>
              );
            },
    },
    
  ];


  return (
    <div className="background">
    <div className="title">
      Quản lý client
    </div>
    <div className="datatable">
      <div className="tool">
          <div className="btnAddHover"  style={{width:'120px', display:'flex', justifyContent:'center', alignItems:'center', cursor: 'pointer',fontWeight:'bold' }} onClick={() =>showDrawer()}>
            <PlusOutlined  style= {{paddingInline:'5px', color:'#d32f2f' }}/> <div style= {{paddingInline:'5px', color:'#d32f2f',fontFamily:'Arial'  }}>Thêm mới</div>
          </div>
          <div className="btnAddHover"  style={{width:'100px', display:'flex', justifyContent:'center', alignItems:'center', cursor: 'pointer',fontWeight:'bold'}}  onClick={() =>refresh()}>
            <ReloadOutlined  style= {{paddingInline:'5px', color:'#d32f2f' }}/> <div style= {{paddingInline:'5px', color:'#d32f2f',fontFamily:'Arial' , }}>Làm mới</div>
          </div>
          <div style={{width:'50px', display:'flex', justifyContent:'center', borderLeft:'0.5px solid lightgrey', alignItems:'center', cursor: 'pointer',fontWeight:'bold'}}>
            <BarsOutlined  style= {{ color:'#d32f2f' }}></BarsOutlined>
          </div>
      </div>
      <div className="datatableTitle">
        <div className="total" >Tổng số :<b>{clients.totalItem}</b> </div>
   
        <div className="search">
        
        <div className="inputsearch">

          <Input className="inputsearch" placeholder="Tên" allowClear onChange={onChangeUserName} />
        </div>

        <div className="inputsearch">
          <Button style={{background : '#d32f2f', borderColor : '#d32f2f' }} type="primary" icon={<SearchOutlined />} onClick={() => Search()}>
            Search
          </Button>
        </div>
      </div>

      
      </div>

    <Table
      style={{padding:'10px'}}
      columns ={clientColumns}
      dataSource={clients.content}
      pagination = {false}
      rowKey={record => record.id}
      scroll={{
        x: 1500,
        y: 700,
      }
    
    }

    />
    <div className="datatablePagging">
      <Pagination
        showSizeChanger
        //onShowSizeChange={onShowSizeChange}
        onChange={onShowSizeChange}
        defaultCurrent={1}
        total={clients.totalItem}
      />
     
    </div>

     
  </div>
  <Drawer
      title="Tạo mới client"
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form layout="vertical" hideRequiredMark
      initialValues={{ clientId:ClientAddOrEdit.ClientId , clientName :ClientAddOrEdit.ClientName }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="clientId"
              label="Id client"
              rules={[
                {
                  required: true,
                  message: 'Nhập tên client',
                },
              ]}
            >
              <Input placeholder="Nhập tên client"   onChange={onChangeAddClientId} />
            </Form.Item>
          </Col>
          <Col span={24}>
          <Form.Item
              name="clientName "
              label="tên client"
              rules={[
                {
                  required: true,
                  message: 'Nhập mô tả',
                },
              ]}
            >
              {/* <Input placeholder="Nhập mô tả" onChange={onChangeAddClientDescrip}/> */}
              <TextArea rows={4} placeholder="Nhập mô tả" maxLength={150} onChange={onChangeAddClientName}/>
            </Form.Item>
          </Col>
        </Row>

      </Form>
      <div className="Submit">
        <Space style={{display:'flex'  }}>
            <Button  onClick={onClose}>Cancel</Button>
            <Button style={{background : '#d32f2f', borderColor : '#d32f2f' }} onClick={onAddOrUpdateUser} type="primary">
              Submit
            </Button>
        </Space>
      </div>
   
    </Drawer>
  </div>
  )
}

export default Datatable