import "./datatable.scss";
//import { userColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import { userAction} from '../../../features/user/userSlice';
import { roleAction} from '../../../features/role/roleSlice';
//import { getAllRoles} from './../../actions/roleActions';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
//import { useSelector, useDispatch } from "react-redux";
import 'antd/dist/antd.min.css'
import { SearchOutlined,PlusOutlined,ExclamationCircleOutlined  } from '@ant-design/icons';
import { LoadingOutlined,
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined    } from '@ant-design/icons';
import { message, Upload,Transfer ,Pagination,Table,Button, Col, Drawer, Input, Row, Select, Space,Tag, Dropdown, Menu,Modal } from 'antd';
//import { openNotification } from "../../notice/notification";

//import { color } from "@mui/system";

const { Option } = Select;



const Datatable = () => {
  //Innit state
  const [SearchUserName, setSearchUserName] = useState("");
  const [SearchEmail, setSearchEmail] = useState("");
  const [SearchPhoneNumber, setSearchPhoneNumber] = useState("");
  const [SearchIsActive, setSearchIsActive] = useState(null);
  const [PageNumber, setPageNumber] = useState(1);
  const [PageSize, setPageSize] = useState(10);
  const [Total, setTotal] = useState(0);
  const [Title, setTitle] = useState("");
  const [CheckRefresh, setCheckRefresh] = useState(false);


  const [Id, setId] = useState("");
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Isactive, setIsactive] = useState(null);
  const [RolesAdd, setRolesAdd] = useState([]);
  //state role element
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  //state open adduser
  const [open, setOpen] = useState(false);

  // upload File image
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  // add or Update
  const [addOrUpdate, setaddOrUpdate] = useState(0);// 1 is add , 2 is update

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
  
    const isLt2M = file.size / 1024 / 1024 < 2;
  
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
  
    return isJpgOrPng && isLt2M;
  };
  //================================================================
  // transfer role 


  

  const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

  const handleChangeRole = (newTargetKeys) => {
    //setTargetKeys(newTargetKeys);
    setTargetKeys(newTargetKeys);
    setRolesAdd(newTargetKeys);
  };

  const handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };
  //================================================================

  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchIsActive(null);


    dispatch(userAction.searchUser({
      username : SearchUserName,
      email : SearchEmail,
      phonenumber :SearchPhoneNumber,
      isActive : SearchIsActive,
      PageNumber:PageNumber,
      PageSize:PageSize
    }));
    dispatch(roleAction.getAllRole());;// init Role select
    setCheckRefresh(false);

  }, [dispatch,PageNumber,PageSize,SearchUserName,SearchEmail,SearchPhoneNumber,SearchIsActive,Total,CheckRefresh])

  // lấy data từ reducer 
  const users = useAppSelector((state) => state.user.lstRespone)  ;
  const roles = useAppSelector((state) => state.role.roles)  ;
  //const respone = useAppSelector((state) => state.user.respone)  ;
  //console.log("Datatable users = "+ JSON.stringify(users.content));

  //Thay đổi Size chage
  const onShowSizeChange = (current, pageSize) => {
    setPageNumber(current);
    setPageSize(pageSize);
    //dispatch(searchUser(SearchUserName,SearchEmail,SearchPhoneNumber,SearchIsActive,PageNumber, PageSize ));
    dispatch(userAction.searchUser({
      username : SearchUserName,
      email : SearchEmail,
      phonenumber :SearchPhoneNumber,
      isActive : SearchIsActive,
      PageNumber:PageNumber,
      PageSize:PageSize
    }));
    //console.log("Datatable onShowSizeChange = " , current, pageSize);
  };  


  //Add
  const onChangeAddUserName = (e) => {
    setUserName(e.target.value)
  }
  const onChangeAddEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangeAddPassword = (e) => {
    setPassword(e.target.value)
  }
  const onChangeAddPhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }
  const handleChangeAddIsActice = (e) => {
    //setPhoneNumber(e.target.value)
    if(e === 'Active'){
      setIsactive(true);
    }
    else if (e === 'InActive'){
      setIsactive(false);
    }
    else{
      setIsactive(null);
    }
  }
  
  //==========================================
  //search
  const onChangeUserName = (e) => {
    setSearchUserName(e.target.value)
  }
  const onChangeEmail = (e) => {
    setSearchEmail(e.target.value)
  }
  const onChangePhoneNumber = (e) => {
    setSearchPhoneNumber(e.target.value)
  }
  const Search = ()  => {
    //dispatch(searchUser(SearchUserName,SearchEmail,SearchPhoneNumber,SearchIsActive,PageNumber, PageSize ));
    dispatch(userAction.searchUser({
      username : SearchUserName,
      email : SearchEmail,
      phonenumber :SearchPhoneNumber,
      isActive : SearchIsActive,
      PageNumber:PageNumber,
      PageSize:PageSize
    }));
  }
  //Refresh 
  
  const refresh =  () => {
    setCheckRefresh(true);
    setSearchUserName("");
    setSearchEmail("");
    setSearchPhoneNumber("");
    setSearchIsActive(null);
    setPageNumber(1);
    setPageSize(10);
    setTotal(users.totalItem); 

     dispatch(userAction.searchUser({
      username : SearchUserName,
      email : SearchEmail,
      phonenumber :SearchPhoneNumber,
      isActive : SearchIsActive,
      PageNumber:PageNumber,
      PageSize:PageSize
    }));
  }
// Show Add user 
  const showDrawer = () => {
    //init state 
    setUserName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setIsactive(null);
    setRolesAdd([]);
    setTitle("Thêm mới người dùng");

    const tempTargetKeys = [];
    const tempMockData = [];
    for (let i = 0; i < roles?.length; i++) {
      const data = {
        key: roles[i].id,
        title: roles[i].name,
      };
      //tempTargetKeys.push(data.key);
      tempMockData.push(data);
    }

    setMockData(tempMockData);
    //console.log("tempMockData: ",JSON.stringify(tempMockData));
    setTargetKeys(tempTargetKeys);
    // setState add or up date
    setaddOrUpdate(1);
    // open TAB
    setOpen(true);
  };
  // Show edit user 
   const showEditDrawer = (record) => {
    //init state 
      console.log("showEditDrawer: ", record );
      setId(record.id);
      setUserName(record.userName);
      setEmail(record.email);
      setPassword(record.password);
      setPhoneNumber(record.phoneNumber);
      setIsactive(record.isActive);
      setRolesAdd(record.roles);
      setTitle("Sửa người dùng");

      const tempTargetKeys = [];
      const tempMockData = [];
      for (let i = 0; i < roles?.length; i++) {
        const data = {
          key: roles[i].id,
          title: roles[i].name,
        };
        tempMockData.push(data);
      }
      for (let i = 0; i < record?.roles?.length; i++) {
    
        tempTargetKeys.push(roles[i].id);
      }
      setMockData(tempMockData);
      //console.log("tempMockData: ",JSON.stringify(tempMockData));
      setTargetKeys(tempTargetKeys);
      // setState add or up date
      setaddOrUpdate(2);
      // open TAB
      setOpen(true);
  };
// add user 

  const onAddOrUpdateUser = async () => {
    // add
    if(addOrUpdate === 1){
      const adduser = {
        isActive: Isactive,
        userName: UserName,
        email: Email,
        password: Password,
        phoneNumber: PhoneNumber,
        roles:RolesAdd
      }
      const lstUsers = [adduser];
      await dispatch( userAction.addUser(lstUsers));
      //console.log("respone: ", respone.data);
      //openNotification(respone);
    }
    // Update
    if(addOrUpdate === 2){
      const UpdateUser = {
        id:Id,
        isActive: Isactive,
        userName: UserName,
        email: Email,
        password: Password,
        phoneNumber: PhoneNumber,
        roleIds:RolesAdd
      }
      await dispatch(userAction.updateUser(UpdateUser));
      //console.log("respone: ", respone.data);
      //openNotification(respone);
    }
    await timeout(500);
     refresh();
    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };
// deleteUser==================================================================================
function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}
const { confirm } = Modal;
const [modal1Open, setModal1Open] = useState(false);
const handleDelete =  async (id) => {
  confirm({
    open: {modal1Open},
    icon: <ExclamationCircleOutlined />,
    title: 'Xóa người dùng',
    content: 'Bạn có muốn xóa người dùng này?',
    async onOk() {
      const lstId = [id];
      setCheckRefresh(true);
      await dispatch(userAction.deleteUser(lstId));
      await timeout(500);
      refresh();
      setModal1Open(false)
    },
    onCancel() {setModal1Open(false)}
  });
};

// const handleDelete = async (id) => {
//   //setData(data.filter((item) => item.id !== id));
//   const lstId = [id];
//   await dispatch(userAction.deleteUser(lstId));
//   await refresh();
//   console.log("respone: ", respone.data);
//   openNotification(respone);

// };
//==============================================================================================

  // cột của Bảng==================================================================================
  const userColumns =[
    {
      title: 'UserName',
      width: 100,
      dataIndex: 'userName',
      key: 'UserName',
      fixed: 'left',
    },
    {
      title: 'Email',
      width: 150,
      dataIndex: 'email',
      key: 'email',
      fixed: 'left',
    },
    {
      title: 'phoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 80,
    },
  
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 50,
      render: (_, record) => {
       
        return (
          (record.isActive)?
           <Tag color='success' key={record}>
                Active
            </Tag>
             :
            <Tag color='error' key={record}>
                InActive
          </Tag>
        );
      },
    },
  
    {
      title: 'Action',
      dataIndex: 'Action',
  
      key: 'operation',
      fixed: 'right',
      width: 100,
      //render: () => <a>action</a>,
      render: (_, record) => {
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

  // dropdown
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Import
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              Export
            </a>
          ),
        }
      ]}
    />
  );

  return (
    <div className="background">
      <div className="title">
        Quản lý người dùng
      </div>
      <div className="datatable">
        <div className="tool">
            <div className="btnAddHover"  style={{width:'120px', display:'flex', justifyContent:'center', alignItems:'center', cursor: 'pointer',fontWeight:'bold' }} onClick={() =>showDrawer()}>
              <PlusOutlined style= {{paddingInline:'5px', color:'#d32f2f' }}/> <div style= {{paddingInline:'5px', color:'#d32f2f',fontFamily:'Arial'  }}>Thêm mới</div>
            </div>
            {/* <div style={{width:'150px', display:'flex', justifyContent:'center', alignItems:'center', cursor: 'pointer',fontWeight:'bold'}}>
              <AppstoreAddOutlined style= {{paddingInline:'5px', color:'#d32f2f' }}/> <div style= {{paddingInline:'5px', color:'#d32f2f' ,fontFamily:'Arial' }}>Cấu hình hiển thị</div>
            </div> */}
            <div className="btnAddHover"  style={{width:'100px', display:'flex', justifyContent:'center', alignItems:'center', cursor: 'pointer',fontWeight:'bold'}}  onClick={() =>refresh()}>
              <ReloadOutlined  style= {{paddingInline:'5px', color:'#d32f2f' }}/> <div style= {{paddingInline:'5px', color:'#d32f2f',fontFamily:'Arial' , }}>Làm mới</div>
            </div>
            <div style={{width:'50px', display:'flex', justifyContent:'center', borderLeft:'0.5px solid lightgrey', alignItems:'center', cursor: 'pointer',fontWeight:'bold'}}>
            <Dropdown overlay={menu} placement="bottom" arrow>
              <BarsOutlined  style= {{ color:'#d32f2f' }}></BarsOutlined>
            </Dropdown>
             
            </div>
        </div>
        <div className="datatableTitle">
          <div className="total" >Tổng số :<b>{users.totalItem}</b> </div>
     
          <div className="search">
          
          <div className="inputsearch">

            <Input className="inputsearch" placeholder="UserName" allowClear onChange={onChangeUserName} />
          </div>
          <div className="inputsearch">

            <Input className="inputsearch" placeholder="Email" allowClear onChange={onChangeEmail} />
          </div>
          <div className="inputsearch">

            <Input className="inputsearch" placeholder="PhoneNumber" allowClear onChange={onChangePhoneNumber} />
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
        columns={userColumns}
        dataSource={users.content}
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
          total={users.totalItem}
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
        {/* <Form layout="vertical" hideRequiredMark
        initialValues = {{ name: UserName , password:Password , email:Email , phone:PhoneNumber , address:'',type: Isactive?'Active':'InActive'}}
        > */}
          <Row>
                <p>Ảnh đại diện:</p>
            
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: '100%',
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
    
         
          </Row>
          <Row className="row" gutter={16}>
            <Col marginTop="15px" span={12}>
                <label >Tên đăng nhập:</label>
                <Input placeholder="Nhập tên đăng nhập"  value={UserName}   onChange={onChangeAddUserName} />
            </Col>
            <Col span={12}>
                <label>Mật khẩu:</label>
                <Input.Password placeholder="Nhập mật khẩu" value={Password}  onChange={onChangeAddPassword}  />
            </Col>
          </Row>
          <Row className="row"  gutter={16}>
            <Col span={12}>
                <label>Email:</label>
                <Input placeholder="Nhập Email" value={Email}  onChange={onChangeAddEmail} />
           
            </Col>
            <Col span={12}>
                    <label>Địa chỉ:</label>
                    <Input placeholder="Nhập địa chỉ"   />
            </Col>
          </Row>
          <Row className="row"  gutter={16}>
            <Col span={12}>
                 <label>Số điên thoại:</label>
                  <Input placeholder="Nhập số điện thoại" value={PhoneNumber}  onChange={onChangeAddPhoneNumber} />
            </Col>
            <Col span={12}>
                    <label>Loại:</label> <br/>
                    <Select placeholder="Chọn loại người dùng" defaultValue={Isactive} onChange={handleChangeAddIsActice}>
                      <Option value="Active">Active</Option>
                      <Option value="InActive">InActive</Option>
                    </Select>
            </Col>
          </Row>
          <Row className="row"  gutter={16}>
            <Col span={24}>
                <label>Quyền:</label>
                 <Transfer
                    dataSource={mockData}
                    showSearch
                    filterOption={filterOption}
                    targetKeys={targetKeys}
                    onChange={handleChangeRole}
                    onSearch={handleSearch}
                    render={(item) => item.title}
                  />
            </Col>
          </Row>
        {/* </Form> */}
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
  );
};


export default Datatable ;