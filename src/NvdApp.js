import './App.css';
import NvdCategoryList from './components/NvdCategoryList';
import { useEffect, useState } from 'react';
import axios from './api/NvdApi';
import NvdCategoryForm from './components/NvdCategoryForm';

function NvdApp() {
  const [nvdCategories, setNvdCategories] = useState([]);
  const [nvdCategoryIsForm, setNvdCategoryIsForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

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
  }, []);

  const nvdHandleAddNew = () => {
    setEditingCategory(null);
    setNvdCategoryIsForm(true);
  };

  const nvdHandleCategoryCloseForm = () => {
    setNvdCategoryIsForm(false);
  };

  const nvdHandleCategorySubmit = async (category) => {
    if (editingCategory) {
      try {
        const updatedCategory = await axios.put(`NvdCategory/${category.nvdId}`, category);
        setNvdCategories(
          nvdCategories.map((cat) =>
            cat.nvdId === updatedCategory.data.nvdId ? updatedCategory.data : cat
          )
        );
      } catch (error) {
        console.log("Lỗi:", error);
      }
    } else {
      try {
        const newCategory = await axios.post("NvdCategory", category);
        setNvdCategories([...nvdCategories, newCategory.data]);
      } catch (error) {
        console.log("Lỗi:", error);
      }
    }
    setNvdCategoryIsForm(false);
  };

  const nvdHandleDelete = async (nvdId) => {
    try {
      await axios.delete(`NvdCategory/${nvdId}`);
      setNvdCategories(nvdCategories.filter((cat) => cat.nvdId !== nvdId));
    } catch (error) {
      console.log("Lỗi:", error);
    }
  };

  const nvdHandleEdit = (category) => {
    setEditingCategory(category);
    setNvdCategoryIsForm(true);
  };

  return (
    <div className="container border my-3">
      <h1>Nguyễn Văn Được - Call API</h1>
      <NvdCategoryList
        renderNvdCategories={nvdCategories}
        onAddNew={nvdHandleAddNew}
        onDelete={nvdHandleDelete}
        onEdit={nvdHandleEdit}
      />
      <hr />
      {nvdCategoryIsForm && (
        <NvdCategoryForm
          onCloseForm={nvdHandleCategoryCloseForm}
          onCategorySubmit={nvdHandleCategorySubmit}
          editingCategory={editingCategory}
        />
      )}
    </div>
  );
}

export default NvdApp;
