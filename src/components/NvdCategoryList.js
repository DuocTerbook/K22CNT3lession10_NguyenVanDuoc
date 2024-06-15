import React from 'react'

export default function NvdCategoryList({renderNvdCategories,onAddNew}) {
    console.log("renderNvdCategories: ",renderNvdCategories);
    let nvdCategoryElement = renderNvdCategories.map((nvdCategory,index)=>{
        return(
            <tr key={index}>
                <th>{index+1}</th>
                <td>{nvdCategory.nvdId}</td>
                <td>{nvdCategory.nvdCategoryName}</td>
                <td>{nvdCategory.nvdCategoryStatus===true?"Hiển thị":"Tạm khóa"}</td>
            </tr>
        )
    })
    const NvdHandleAdd = ()=>{
        onAddNew(true);
    }
  return (
    <div className='contrainer m-2'>
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
