import React, { useState, useEffect } from 'react';
import axios from '../api/NvdApi';

export default function NvdCategoryForm({ onCloseForm, onCategorySubmit, editingCategory }) {
    const [nvdCategoryName, setCategoryName] = useState("");
    const [nvdCategoryStatus, setCategoryStatus] = useState(true);

    useEffect(() => {
        if (editingCategory) {
            setCategoryName(editingCategory.nvdCategoryName);
            setCategoryStatus(editingCategory.nvdCategoryStatus);
        } else {
            setCategoryName("");
            setCategoryStatus(true);
        }
    }, [editingCategory]);

    const nvdHandleClose = () => {
        onCloseForm(false);
    }

    const nvdHandleSubmit = async (event) => {
        event.preventDefault();
        let nvdCategory = {
            nvdId: editingCategory ? editingCategory.nvdId : 0,
            nvdCategoryName: nvdCategoryName,
            nvdCategoryStatus: nvdCategoryStatus,
        }
        console.log("nvdCategory", nvdCategory);

        if (editingCategory) {
            await axios.put(`NvdCategory/${nvdCategory.nvdId}`, nvdCategory);
        } else {
            await axios.post("NvdCategory", nvdCategory);
        }
        onCategorySubmit(nvdCategory);
    }

    return (
        <div>
            <form>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Category Name</span>
                    <input type="text" className="form-control"
                        name='nvdCategoryName'
                        value={nvdCategoryName}
                        onChange={(ev) => setCategoryName(ev.target.value)}
                        placeholder="Category Name" aria-label="Category Name"
                        aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon2">Category Status</span>
                    <select className='form-control'
                        name='nvdCategoryStatus'
                        value={nvdCategoryStatus}
                        onChange={(ev) => setCategoryStatus(ev.target.value === "true")}
                    >
                        <option value={true}>Hiển thị</option>
                        <option value={false}>Tạm khóa</option>
                    </select>
                </div>
                <button className='btn btn-success' onClick={nvdHandleSubmit}>Ghi lại</button>
                <button className='btn btn-danger' onClick={nvdHandleClose}>Đóng</button>
            </form>
        </div>
    )
}
