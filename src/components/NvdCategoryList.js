import React from 'react';

export default function NvdCategoryList({ renderNvdCategories, onAddNew, onDelete, onEdit }) {
  console.log("renderNvdCategories: ", renderNvdCategories);
  let nvdCategoryElement = renderNvdCategories.map((nvdCategory, index) => {
    return (
      <tr key={index}>
        <th>{index + 1}</th>
        <td>{nvdCategory.nvdId}</td>
        <td>{nvdCategory.nvdCategoryName}</td>
        <td>{nvdCategory.nvdCategoryStatus === true ? "Hiển thị" : "Tạm khóa"}</td>
        <td>
          <button className='btn btn-success' onClick={() => nvdHandleDelete(nvdCategory.nvdId)}>Delete</button>
          <button className='btn btn-danger' onClick={() => nvdHandleEdit(nvdCategory)}>Edit</button>
        </td>
      </tr>
    )
  })

  const NvdHandleAdd = () => {
    onAddNew();
  }

  const nvdHandleDelete = (nvdId) => {
    if (window.confirm(`Bạn có thực sự muốn xóa Category có mã ${nvdId} không?`)){
      console.log("Delete", nvdId);
      onDelete(nvdId);
    }
  }

  const nvdHandleEdit = (nvdCategory) => {
    onEdit(nvdCategory);
  }

  return (
    <div className='container m-2'>
      <h2>Danh sách loại sản phẩm</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã loại</th>
            <th>Tên loại</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {nvdCategoryElement}
        </tbody>
      </table>
      <button className='btn btn-primary' onClick={NvdHandleAdd}>Thêm mới</button>
    </div>
  )
}
