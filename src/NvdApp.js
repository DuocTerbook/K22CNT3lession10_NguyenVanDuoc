import './App.css';
import NvdCategoryList from './components/NvdCategoryList';
import { useEffect, useState } from 'react';
import axios from './api/NvdApi'; // Chắc chắn rằng đường dẫn import đúng
import NvdCategoryForm from './components/NvdCategoryForm';
function NvdApp() {
  const [nvdCategories, setNvdCategories] = useState([]);
  const [nvdCategoryIsForm, setNvdCategoryIsForm] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const nvdCateResponse = await axios.get("NvdCategory");
        setNvdCategories(nvdCateResponse.data);
      } catch (error) {
        console.log("Lỗi:", error);
      }
    };

    getCategories();
  }, []); // useEffect sẽ chỉ gọi một lần sau khi component được mount

  const nvdHandleAddNew = (param) => {
    setNvdCategoryIsForm(param);
  };

  const nvdHandleCategoryCloseForm = (param) => {
    setNvdCategoryIsForm(param);
  };

  const nvdHandleCategorySubmit = (param) => {
    // Lưu ý rằng bạn nên sử dụng cách thức bảo đảm tính nhất quán trong việc cập nhật state của React
    // Thay vì sử dụng push để cập nhật nvdCategories, hãy sử dụng setNvdCategories để đảm bảo tính bất biến của state
    // Ví dụ: setNvdCategories([...nvdCategories, param]);

    let id = parseInt(nvdCategories[nvdCategories.length - 1].nvdId,10);
    param.nvdId = id + 1;
    setNvdCategories([...nvdCategories, param]);

    setNvdCategoryIsForm(false); // Đặt lại trạng thái form sau khi submit thành công
  };

  return (
    <div className="container border my-3">
      <h1>Nguyễn Văn Được - Call API</h1>
      <NvdCategoryList renderNvdCategories={nvdCategories} onAddNew={nvdHandleAddNew} />
      <hr />
      {nvdCategoryIsForm ? (
        <NvdCategoryForm
          onCloseForm={nvdHandleCategoryCloseForm}
          onCategorySubmit={nvdHandleCategorySubmit}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default NvdApp;
