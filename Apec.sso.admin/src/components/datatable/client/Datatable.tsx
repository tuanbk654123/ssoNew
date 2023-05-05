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
import { Pagination,Table,Button, Col, Drawer, Form, Input, Row, Space ,Modal, Select} from 'antd';
import { Client, SearchClientDto} from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';
import type { SelectProps } from 'antd';
const { Option } = Select;
type Props = {}
const options: SelectProps['options'] = [];
const { TextArea } = Input;

const Datatable = (props: Props) => {

//Innit state
const [SearchParam, setSearchParam] = useState<SearchClientDto>({ 
  PageNumber:1,
  PageSize:10,
  ClientId: "",
  description: "",
  clientName: "",
  ClientUri: ""
} );
const [ClientAddOrEdit, setClientAddOrEdit] = useState<Client>({
  id:"",
  clientId: "",
  description: "",
  clientName: "",
  clientUri: "",
  allowedScopes: [],
  redirectUris: [],

  allowedGrantTypes: [],
  requireClientSecret: true,
  postLogoutRedirectUris: [],
  allowedCorsOrigins:  [],
  allowAccessTokensViaBrowser: true,
} 
 );
//state open adduser
const [open, setOpen] = useState(false);
const [Title, setTitle] = useState("");

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
  const onChangeAddClientName = (e : any) => {
    
    setClientAddOrEdit({
      ...ClientAddOrEdit,
      clientName:e.target.value
    } )
  }
  const onChangeAddClientId = (e : any) => {
    
    setClientAddOrEdit({
      ...ClientAddOrEdit,
      clientId:e.target.value
    } )
  }
  
  const onChangeRequireClientSecret = (e : any) => {
    
    setClientAddOrEdit({
      ...ClientAddOrEdit,
      requireClientSecret:e.target.value
    } )
  }
  const onChangeAllowAccessTokensViaBrowser = (e : any) => {
    
    setClientAddOrEdit({
      ...ClientAddOrEdit,
      allowAccessTokensViaBrowser:e.target.value
    } )
  }
  const onChangeAddClientUri = (e : any) => {
    
    setClientAddOrEdit({
      ...ClientAddOrEdit,
      clientUri:e.target.value
    } )
  }
  const onChangeAddClientDescriptiopn= (e: any) => {
    setClientAddOrEdit(  {
      ...ClientAddOrEdit,
      description:e.target.value
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
      clientId: "",
      clientUri: "",
      description: "",
      clientName:""
    })
    // setState add or up date
    setaddOrUpdate(1);
    // open TAB
    setOpen(true);
    setTitle("Thêm client");
  };
  // Show edit client 
   const showEditDrawer = (record: Client) => {
    //init state 
      setClientAddOrEdit({
        ...ClientAddOrEdit,
        clientId: record.clientId,
        clientName: record.clientName,
        description: record.description,
        clientUri: record.clientUri,
        id: record.id,
      })

      for (let i = 0; i < record.allowedGrantTypes.length; i++) {
        options.push({
          value: record.allowedGrantTypes[i],
          label: record.allowedGrantTypes[i],
        });
      }
      // setState add or up date
      setaddOrUpdate(2);
      // open TAB
      setOpen(true);
      setTitle("Sửa client");
  };
// add client 
  const onAddOrUpdateUser = async () => {
    // add
    if(addOrUpdate === 1){
      const addclient = {
        id:'',
        clientId: ClientAddOrEdit?.clientId,
        clientName :  ClientAddOrEdit?.clientName,
        description: ClientAddOrEdit?.description,
        clientUri:  ClientAddOrEdit?.clientUri,
        allowedScopes:  ClientAddOrEdit?.allowedScopes,
        redirectUris:  ClientAddOrEdit?.redirectUris,
        allowedGrantTypes:  ClientAddOrEdit?.allowedGrantTypes,
        requireClientSecret:  ClientAddOrEdit?.requireClientSecret,
        postLogoutRedirectUris:  ClientAddOrEdit?.postLogoutRedirectUris,
        allowedCorsOrigins:   ClientAddOrEdit?.allowedCorsOrigins,
        allowAccessTokensViaBrowser:  ClientAddOrEdit?.allowAccessTokensViaBrowser,
      }
      const lstClients = [addclient];
      await dispatch( clientAction.addClient(lstClients));

    }
    // Update
    if(addOrUpdate === 2){
      const UpdateClient = {
        id:ClientAddOrEdit?.id,
        clientId: ClientAddOrEdit?.clientId,
        clientName :  ClientAddOrEdit?.clientName,
        description: ClientAddOrEdit?.description,
        clientUri:  ClientAddOrEdit?.clientUri,
        allowedScopes:  ClientAddOrEdit?.allowedScopes,
        redirectUris:  ClientAddOrEdit?.redirectUris,
        allowedGrantTypes:  ClientAddOrEdit?.allowedGrantTypes,
        requireClientSecret:  ClientAddOrEdit?.requireClientSecret,
        postLogoutRedirectUris:  ClientAddOrEdit?.postLogoutRedirectUris,
        allowedCorsOrigins:   ClientAddOrEdit?.allowedCorsOrigins,
        allowAccessTokensViaBrowser:  ClientAddOrEdit?.allowAccessTokensViaBrowser,

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
      title: 'Tên',
      width: 100,
      dataIndex: 'clientName',
      key: 'clientName',
      fixed: 'left',
    },
      {
      title: 'Mô tả',
      width: 100,
      dataIndex: 'description',
      key: 'description',
      fixed: 'left',
    },
    {
      title: 'ClientId',
      width: 100,
      dataIndex: 'clientId',
      key: 'clientId',
      fixed: 'left',
    },
    {
      title: 'ClientUri',
      width: 100,
      dataIndex: 'clientUri',
      key: 'clientUri',
      fixed: 'left',
    },
    {
      title: 'allowedGrantTypes',
      width: 100,
      dataIndex: 'allowedGrantTypes',
      key: 'allowedGrantTypes',
      fixed: 'left',
    },
    {
      title: 'postLogoutRedirectUris',
      width: 100,
      dataIndex: 'postLogoutRedirectUris',
      key: 'postLogoutRedirectUris',
      fixed: 'left',
    },
    // {
    //   title: 'allowedCorsOrigins',
    //   width: 100,
    //   dataIndex: 'allowedCorsOrigins',
    //   key: 'allowedCorsOrigins',
    //   fixed: 'left',
    // },
    {
      title: 'Hành động',
      dataIndex: 'Action',
  
      key: 'operation',
      fixed: 'right',
      width: 50,
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
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
      title={Title}
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >

        <Row className="row"  gutter={16}>
          <Col span={24}>
            <label>Tên client:</label>
            <Input placeholder="Nhập tên client"  value={ClientAddOrEdit.clientName} onChange={onChangeAddClientName} />    
          </Col>
        </Row>
        <Row className="row"  gutter={16}>
          <Col span={24}>
            <label>ClientId:</label>
            <Input placeholder="clientId"  value={ClientAddOrEdit.clientId} onChange={onChangeAddClientId} />    
          </Col>
        </Row>
        <Row className="row"  gutter={16}>
          <Col span={24}>
            <label>Uri:</label>
            <Input placeholder="clientUri"  value={ClientAddOrEdit.clientUri} onChange={onChangeAddClientUri} />    
          </Col>
        </Row>
        <Row className="row"  gutter={16}>
          <Col span={24}>
            <label>AllowedGrantTypes:</label>
            {/* <Input placeholder="allowedGrantTypes"  value={ClientAddOrEdit.allowedGrantTypes} onChange={onChangeAddClientUri} />     */}
            <Select
              mode="tags"
              style={{ width: '100%' }}
              onChange={handleChange}
              tokenSeparators={[',']}
              //defaultValue={ClientAddOrEdit.allowedGrantTypes}
              //value={"dfdf"}
              //defaultValue={ClientAddOrEdit.allowedGrantTypes}
              options={options}
            />
          </Col>
        </Row>
        <Row className="row"  gutter={16}>
          <Col span={24}>
            <label>PostLogoutRedirectUris:</label>
            <Input placeholder="postLogoutRedirectUris"  value={ClientAddOrEdit.postLogoutRedirectUris} onChange={onChangeAddClientUri} />    
          </Col>
        </Row>
        <Row className="row"  gutter={16}>
          <Col span={12}>
            <label>RequireClientSecret:</label><br></br>
            <Select style={{width:"100%"}} placeholder="Chọn " defaultValue={ClientAddOrEdit.requireClientSecret} onChange={onChangeRequireClientSecret}>
              <Option value={true}>True</Option>
              <Option value={false}>False</Option>
            </Select>    
          </Col>
          <Col span={12}>
            <label>AllowAccessTokensViaBrowser:</label><br></br>
            <Select style={{width:"100%"}} placeholder="Chọn " defaultValue={ClientAddOrEdit.allowAccessTokensViaBrowser} onChange={onChangeAllowAccessTokensViaBrowser}>
              <Option value={true}>True</Option>
              <Option value={false}>False</Option>
            </Select>
          </Col>
        </Row>

        <Row className="row"  gutter={16}>
          <Col span={24}>
            <label>AllowedCorsOrigins:</label>
            <Input placeholder="allowedCorsOrigins"  value={ClientAddOrEdit.allowedCorsOrigins} onChange={onChangeAddClientUri} />    
          </Col>
        </Row>
        <Row className="row"  gutter={16}>
          <Col span={24}>
            <label>AllowedScopes:</label>
            <Input placeholder="allowedScopes"  value={ClientAddOrEdit.allowedScopes} onChange={onChangeAddClientUri} />    
          </Col>
        </Row>
        <Row
         className="row"  gutter={16}>
          <Col span={24}>
            <label>Mô tả:</label>
            <TextArea rows={4} placeholder="Nhập mô tả" maxLength={150} value={ClientAddOrEdit.description} onChange={onChangeAddClientDescriptiopn}/>
          </Col>
        </Row>
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