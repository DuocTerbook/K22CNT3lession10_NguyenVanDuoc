import React, { useState } from 'react'
import axios from '../api/NvdApi'

export default function NvdCategoryForm({onCloseForm,onCategorySubmit}) {
    const [nvdCategoryName, setCategoryName] = useState("")
    const [nvdCategoryStatus, setCategoryStatus] = useState(true)
    const nvdHandleClose = ()=>{
        onCloseForm(false);
    }
    const nvdHandleSubmit = async (event)=>{
        event.preventDefault();
        let nvdCategory = {
            nvdId:0,
            nvdCategoryName:nvdCategoryName,
            nvdCategoryStatus:nvdCategoryStatus,
        }
        console.log("nvdCategory",nvdCategory);
        await axios.post("NvdCategory",nvdCategory);
        onCategorySubmit(nvdCategory);
    }
    return (
        <div>
            <form>
                <div class="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Category Name</span>
                    <input type="text" className="form-control"
                        name='nvdCategoryName'
                        value={nvdCategoryName}
                        onChange={(ev)=>setCategoryName(ev.target.value)}
                        placeholder="Username" aria-label="Username"
                        aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                    <span className="input-group-text" id="basic-addon2">Category Status</span>
                    <select className='form-control'
                        name='nvdCategoryStatus'
                        value={nvdCategoryStatus}
                        onChange={(ev)=>setCategoryStatus(ev.target.value)}
                        >
                        <option value={true}>Hiển thị</option>
                        <option value={true}>Tạm khóa</option>
                    </select>
                </div>
                <button className='btn btn-success'onClick={nvdHandleSubmit}>Ghi lại</button>
                <button className='btn btn-danger'onClick={nvdHandleClose}>Đóng</button>
            </form>
        </div>
    )
}
