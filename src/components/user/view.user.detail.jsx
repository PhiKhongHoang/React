import { Button, Drawer } from "antd";
import { useEffect, useState } from "react";

const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, } = props;


    return (
        <>

            <Drawer
                width={"40vw"}
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
                        <br />
                        <p>FullName: {dataDetail.fullName}</p>
                        <br />
                        <p>Email: {dataDetail.email}</p>
                        <br />
                        <p>Phone: {dataDetail.phone}</p>
                        <br />
                        <p>Avatar: </p>
                        <div>
                            <img
                                height={100} width={150}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                        </div>
                        <div>
                            <label
                                htmlFor="btnUpload"
                                style={{
                                    display: "block",
                                    width: "fit-content",
                                    marginTop: "15px",
                                    padding: "5px 10px ",
                                    background: "orange",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Upload avatar
                            </label>
                            <input type="file" hidden id="btnUpload" />
                        </div>
                        {/* <Button type="primary">Upload avatar</Button> */}
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