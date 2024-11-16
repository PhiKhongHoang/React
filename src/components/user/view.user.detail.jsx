import { Drawer } from "antd";
import { useEffect, useState } from "react";

const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, } = props;


    return (
        <>

            <Drawer
                title="User Detail"
                onClose={() => {
                    setDataDetail(null)
                    setIsDetailOpen(false)
                }}
                open={isDetailOpen}>
                {dataDetail
                    ?
                    <>
                        <p>Id: {dataDetail._id}</p>
                        <p>FullName: {dataDetail.fullName}</p>
                        <p>Email: {dataDetail.email}</p>
                        <p>Phone: {dataDetail.phone}</p>
                    </>
                    :
                    <>
                        <p>Không có dữ liệu</p>
                    </>
                }
            </Drawer>
        </>
    )
}

export default ViewUserDetail;