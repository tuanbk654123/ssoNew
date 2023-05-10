import React from 'react'
import "./datatable.scss";
import { useEffect, useState } from "react";
import { apiResourcesAction} from '../../../features/apiResources/apiResourcesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import { SearchOutlined,PlusOutlined,ExclamationCircleOutlined  } from '@ant-design/icons';
import { 
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined    } from '@ant-design/icons';
import { Pagination,Table,Button, Col, Drawer, Form, Input, Row, Space ,Modal, Select} from 'antd';
import { ApiResources, SearchApiResourcesDto} from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';
import type { SelectProps } from 'antd';
const { Option } = Select;
type Props = {}
const options: SelectProps['options'] = [];
const { TextArea } = Input;

const Datatable = (props: Props) => {

//Innit state
const [SearchParam, setSearchParam] = useState<SearchApiResourcesDto>({ 
  PageNumber:1,
  PageSize:10,

  Name:"",
} );
const [ApiResourcesAddOrEdit, setApiResourcesAddOrEdit] = useState<ApiResources>({

  name:"",
  id:""
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

  dispatch(apiResourcesAction.searchapiResources(SearchParam));// init ApiResources select
}, [dispatch,SearchParam])

  // lấy data từ reducer 
  const apiResourcess = useAppSelector((state) => state.apiResources.lstRespone)  ;
  console.log("Datatable apiResourcess = "+ JSON.stringify(apiResourcess) );

  //Thay đổi Size chage
  const onShowSizeChange = (current : number, pageSize: number) => {

    setSearchParam({
      ...SearchParam,
      PageNumber:current,
      PageSize:pageSize,
    } )


  };  


  //Add
  const onChangeAddApiResourcesName = (e : any) => {
    
    setApiResourcesAddOrEdit({
      ...ApiResourcesAddOrEdit,
      name:e.target.value
    } )
  }

  //==========================================
  //search
  const onChangeUserName = (e : any) => {

    setSearchParam(  {
      ...SearchParam,
      Name : e.target.value
    } )

    //dispatch(apiResourcesAction.searchapiResources(SearchParam));
  }
  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }
  const Search = ()  => {
    dispatch(apiResourcesAction.searchapiResources(SearchParam));
  }
  //Refresh 
  
  const refresh = async () => {
    const SearchParamChange = {...SearchParam }
    setSearchParam( SearchParamChange)

  }
// Show Add user 
  const showDrawer = () => {
    //init state 
    setApiResourcesAddOrEdit({
      ...ApiResourcesAddOrEdit,

      name:""
    })
    // setState add or up date
    setaddOrUpdate(1);
    // open TAB
    setOpen(true);
    setTitle("Thêm apiResources");
  };
  // Show edit apiResources 
   const showEditDrawer = (record: ApiResources) => {
    //init state 
      setApiResourcesAddOrEdit({
        ...ApiResourcesAddOrEdit,

        name: record.name,
        id: record.id,
      })

      // setState add or up date
      setaddOrUpdate(2);
      // open TAB
      setOpen(true);
      setTitle("Sửa apiResources");
  };
// add apiResources 
  const onAddOrUpdateUser = async () => {
    // add
    if(addOrUpdate === 1){
      const addapiResources = {
        id:'',
        name:  ApiResourcesAddOrEdit?.name,
      }
      const lstApiResourcess = [addapiResources];
      await dispatch( apiResourcesAction.addApiResources(lstApiResourcess));

    }
    // Update
    if(addOrUpdate === 2){
      const UpdateApiResources = {
        id:ApiResourcesAddOrEdit?.id,
        name: ApiResourcesAddOrEdit?.name,

      } 
      await dispatch(apiResourcesAction.updateApiResources(UpdateApiResources));

    }
    await timeout(500);
    await refresh();

    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };
// delete ApiResources==================================================================================
const { confirm } = Modal;
const [modal1Open, setModal1Open] = useState<boolean>(false);
const handleDelete =  async (id: string) => {
  confirm({
    open: modal1Open,
    icon: <ExclamationCircleOutlined />,
    title: 'Xóa apiResources',
    content: 'Bạn có muốn xóa apiResources này?',
    async onOk() {
      const lstId = [id];
      await dispatch(apiResourcesAction.deleteApiResources(lstId));
      await timeout(500);
      refresh();
      setModal1Open(false)
    },
    onCancel() {setModal1Open(false)}
  });
};

  // cột của Bảng==================================================================================
  const apiResourcesColumns: ColumnsType<ApiResources> =[

    {
      title: 'Tên',
      width: 200,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },

    {
      title: 'Hành động',
      dataIndex: 'Action',
  
      key: 'operation',
      fixed: 'right',
      width: 50,
      //render: () => <a>action</a>,
      render: (_ : any, record : ApiResources) => {
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
      Quản lý apiResources
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
        <div className="total" >Tổng số :<b>{apiResourcess.totalItem}</b> </div>
   
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
      columns ={apiResourcesColumns}
      dataSource={apiResourcess.content}
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
        total={apiResourcess.totalItem}
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
            <label>Tên apiResources:</label>
            <Input placeholder="Nhập tên apiResources"  value={ApiResourcesAddOrEdit.name} onChange={onChangeAddApiResourcesName} />    
          </Col>
        </Row>
        {/* <Row className="row"  gutter={16}>
          <Col span={24}>
            <label>ApiResourcesId:</label>
            <Input placeholder="apiResourcesId"  value={ApiResourcesAddOrEdit.apiResourcesId} onChange={onChangeAddApiResourcesId} />    
          </Col>
        </Row> */}
       
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