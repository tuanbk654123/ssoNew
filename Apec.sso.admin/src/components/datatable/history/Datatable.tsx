import React from 'react'
import "./datatable.scss";
import { useEffect, useState } from "react";
import { UserHistoryAction} from '../../../features/history/historySlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import 'antd/dist/antd.min.css'
import { SearchOutlined  } from '@ant-design/icons';
import { 
  // AppstoreAddOutlined,
  BarsOutlined, ReloadOutlined    } from '@ant-design/icons';
import { Pagination,Table,Button, Input,DatePicker} from 'antd';

import { userHistory, searchUserHistoryDto} from '../../../models/index'
import type { ColumnsType } from 'antd/es/table';


type Props = {}
const Datatable = (props: Props) => {

//Innit state
const [SearchParam, setSearchParam] = useState<searchUserHistoryDto>({ 
  pageNumber:1,
  pageSize:10,

  userName : "",
  ip: "",
  fromDate:"" ,
  toDate: ""
} );

//================================================================

const dispatch = useAppDispatch();

useEffect(() => {

  dispatch(UserHistoryAction.searchUserHistory(SearchParam));// init Role select
}, [dispatch,SearchParam])

  // lấy data từ reducer 
  const userHistorys = useAppSelector((state) => state.history.lstRespone)  ;

  console.log("Datatable history = "+ JSON.stringify(userHistorys) );

  //Thay đổi Size chage
  const onShowSizeChange = (current : number, pageSize: number) => {

    setSearchParam({
      ...SearchParam,
      pageNumber:current,
      pageSize:pageSize,
    } )

  };  


  //==========================================
  //search
  const onChangeUserName = (e : any) => {

    setSearchParam(  {
      ...SearchParam,
      userName:e.target.value
    } )
  }


  const Search = ()  => {
    dispatch(UserHistoryAction.searchUserHistory(SearchParam));
  }
  //Refresh 
  
  const refresh = async () => {
    const SearchParamChange = {...SearchParam }
    setSearchParam( SearchParamChange)

  }

  // cột của Bảng==================================================================================
  const roleColumns: ColumnsType<userHistory> =[
    {
      title: 'Tên',
      width: 100,
      dataIndex: 'userName',
      key: 'userName',
      fixed: 'left',
    },
    {
      title: 'Ip',
      width: 450,
      dataIndex: 'ip',
      key: 'ip',
      fixed: 'left',
    },
    {
      title: 'thời gian',
      width: 450,
      dataIndex: 'loginTime',
      key: 'loginTime',
      fixed: 'left',
    },
  

  ];
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';
  const onChangeDate = (dates : any, dateStrings: any) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      setSearchParam(  {
        ...SearchParam,
        fromDate:dateStrings[0],
        toDate: dateStrings[1]
      } )
    } else {
      console.log('Clear' , dateStrings[0]);
      setSearchParam(  {
        ...SearchParam,
        fromDate:"",
        toDate: ""
      } )
    }
  };

  return (
    <div className="background">
    <div className="title">
      Quản lý lịch sử đăng nhập
    </div>
    <div className="datatable">
      <div className="tool">

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
        <div className="total" >Tổng số :<b>{userHistorys.totalItem}</b> </div>
   
        <div className="search">
        <div className="inputsearch">

          <RangePicker
            format={dateFormat}
            onChange={onChangeDate}
          />
        </div>
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
      dataSource={userHistorys.content}
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
        total={userHistorys.totalItem}
      />
     
    </div>

     
  </div>
  
  </div>
  )
}

export default Datatable