
import "./datatable.scss";
import { useEffect, useState } from "react";
import { roleAction} from '../../../features/role/roleSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import { SearchOutlined,PlusOutlined,ExclamationCircleOutlined  } from '@ant-design/icons';
import { 
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined    } from '@ant-design/icons';
import { Pagination,Table,Button, Col, Drawer, Input, Row, Space ,Modal} from 'antd';
import { Role, SearchRoleDto} from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';

type Props = {}

const { TextArea } = Input;

const Datatable = (props: Props) => {

//Innit state
const [SearchParam, setSearchParam] = useState<SearchRoleDto>({ 
  PageNumber:1,
  PageSize:10,
  description:"",
  name:""
} );
const [RoleAddOrEdit, setRoleAddOrEdit] = useState<Role>({
  id:"",
  name:"",
  description: ""

} 
 );
//state open adduser
const [open, setOpen] = useState(false);


// add or Update
const [addOrUpdate, setaddOrUpdate] = useState(0);// 1 is add , 2 is update

//================================================================

const dispatch = useAppDispatch();

useEffect(() => {
  // setSearchParam(
  //   {
  //     PageNumber:1,
  //     PageSize:10,
  //     name:""
  //   }
  // )
  dispatch(roleAction.searchrole(SearchParam));// init Role select
}, [dispatch,SearchParam])

  // lấy data từ reducer 
  const roles = useAppSelector((state) => state.role.lstRespone)  ;
  console.log("Datatable roles = "+ JSON.stringify(roles) );

  //Thay đổi Size chage
  const onShowSizeChange = (current : number, pageSize: number) => {

    setSearchParam({
      ...SearchParam,
      PageNumber:current,
      PageSize:pageSize,
    } )

    // dispatch(userAction.searchUser({
    //   username : SearchUserName,
    //   email : SearchEmail,
    //   phonenumber :SearchPhoneNumber,
    //   isActive : SearchIsActive,
    //   PageNumber:PageNumber,
    //   PageSize:PageSize
    // }));

  };  


  //Add
  const onChangeAddRoleName = (e : any) => {
    
    setRoleAddOrEdit({
      ...RoleAddOrEdit,
      name:e.target.value
    } )
  }
  const onChangeAddRoleDescrip = (e: any) => {
    setRoleAddOrEdit(  {
      ...RoleAddOrEdit,
      description:e.target.value
    } )
  }

  //==========================================
  //search
  const onChangeUserName = (e : any) => {

    setSearchParam(  {
      ...SearchParam,
      name : e.target.value
    } )

    //dispatch(roleAction.searchrole(SearchParam));
  }
  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }
  const Search = ()  => {
    dispatch(roleAction.searchrole(SearchParam));
  }
  //Refresh 
  
  const refresh = async () => {
    const SearchParamChange = {...SearchParam }
    setSearchParam( SearchParamChange)

  }
// Show Add user 
  const showDrawer = () => {
    //init state 
    setRoleAddOrEdit({
      ...RoleAddOrEdit,
      name: "",
      description: "",
    })
    // setState add or up date
    setaddOrUpdate(1);
    // open TAB
    setOpen(true);
  };
  // Show edit role 
   const showEditDrawer = (record: Role) => {
    //init state 
      setRoleAddOrEdit({
        ...RoleAddOrEdit,
        name: record.name,
        description: record.description,
        id: record.id,
      })
      // setState add or up date
      setaddOrUpdate(2);
      // open TAB
      setOpen(true);
  };
// add role 
  const onAddOrUpdateUser = async () => {
    // add
    if(addOrUpdate === 1){
      const addrole = {
        id:'',
        name: RoleAddOrEdit?.name,
        description :  RoleAddOrEdit?.description,
      }
      const lstRoles = [addrole];
      await dispatch( roleAction.addRole(lstRoles));

    }
    // Update
    if(addOrUpdate === 2){
      const UpdateRole = {
        id:RoleAddOrEdit?.id,
        name: RoleAddOrEdit?.name,
        description :  RoleAddOrEdit?.description,

      } 
      await dispatch(roleAction.updateRole(UpdateRole));

    }
    await timeout(500);
    await refresh();

    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };
// delete Role==================================================================================
const { confirm } = Modal;
const [modal1Open, setModal1Open] = useState<boolean>(false);
const handleDelete =  async (id: string) => {
  confirm({
    open: modal1Open,
    icon: <ExclamationCircleOutlined />,
    title: 'Xóa quyền',
    content: 'Bạn có muốn xóa quyền này?',
    async onOk() {
      const lstId = [id];
      await dispatch(roleAction.deleteRole(lstId));
      await timeout(500);
      refresh();
      setModal1Open(false)
    },
    onCancel() {setModal1Open(false)}
  });
};

// const handleDelete = async (id : string) => {
//   const lstId = [id];
//   await dispatch(roleAction.deleteRole(lstId));
//   await timeout(500);
//   await refresh();
// };
//==============================================================================================

  // cột của Bảng==================================================================================
  const roleColumns: ColumnsType<Role> =[
    {
      title: 'Tên',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Mô tả',
      width: 450,
      dataIndex: 'description',
      key: 'description',
      fixed: 'left',
    },
  
    {
      title: 'Hành động',
      dataIndex: 'Action',
  
      key: 'operation',
      fixed: 'right',
      width: 100,
      //render: () => <a>action</a>,
      render: (_ : any, record : Role) => {
              return (
                <div className="cellAction">
          
                    <div className="viewButton"
                     onClick={() => showEditDrawer(record)}
                    >Sửa</div>
             
                  <div
                    className="deleteButton"
                    onClick={() => handleDelete(record.id)}
                  >
                    Xóa
                  </div>
                </div>
              );
            },
    },
    
  ];


  return (
    <div className="background">
    <div className="title">
      Quản lý quyền
    </div>
    <div className="datatable">
      <div className="tool">
          <div className="btnAddHover"  style={{width:'120px', display:'flex', justifyContent:'center', alignItems:'center', cursor: 'pointer',fontWeight:'bold' }} onClick={() =>showDrawer()}>
            <PlusOutlined  style= {{paddingInline:'5px', color:'#d32f2f' }}/> <div style= {{paddingInline:'5px', color:'#d32f2f',fontFamily:'Arial'  }}>Thêm mới</div>
          </div>
          {/* <div style={{width:'150px', display:'flex', justifyContent:'center', alignItems:'center', cursor: 'pointer',fontWeight:'bold'}}>
            <AppstoreAddOutlined style= {{paddingInline:'5px', color:'#d32f2f' }}/> <div style= {{paddingInline:'5px', color:'#d32f2f' ,fontFamily:'Arial' }}>Cấu hình hiển thị</div>
          </div> */}
          <div className="btnAddHover"  style={{width:'100px', display:'flex', justifyContent:'center', alignItems:'center', cursor: 'pointer',fontWeight:'bold'}}  onClick={() =>refresh()}>
            <ReloadOutlined  style= {{paddingInline:'5px', color:'#d32f2f' }}/> <div style= {{paddingInline:'5px', color:'#d32f2f',fontFamily:'Arial' , }}>Làm mới</div>
          </div>
          <div style={{width:'50px', display:'flex', justifyContent:'center', borderLeft:'0.5px solid lightgrey', alignItems:'center', cursor: 'pointer',fontWeight:'bold'}}>
            <BarsOutlined  style= {{ color:'#d32f2f' }}></BarsOutlined>
          </div>
      </div>
      <div className="datatableTitle">
        <div className="total" >Tổng số :<b>{roles.totalItem}</b> </div>
   
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
      columns ={roleColumns}
      dataSource={roles.content}
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
        total={roles.totalItem}
      />
     
    </div>

     
  </div>
  <Drawer
      title="Tạo mới quyền"
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >

    <Row gutter={16}>
      <Col span={24}>
        <label>Tên:</label>
        <Input placeholder="Nhập tên quyền" value={RoleAddOrEdit.name}  onChange={onChangeAddRoleName} />
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={24}>
      <label>Mô tả:</label>
        <TextArea rows={4} placeholder="Nhập mô tả"  value={RoleAddOrEdit.description}  maxLength={150} onChange={onChangeAddRoleDescrip}/>
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