import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddTutorial.css';

const AddTutorial = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    language: '',
    category: '',
    content: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:5000/api/tutorials',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Tutorial Added!');

      setForm({
        title: '',
        description: '',
        language: '',
        category: '',
        content: ''
      });

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error adding tutorial');
    }
  };

  return (
    <div className="add-tutorial-page">
      <div className="add-tutorial-card">
        <h2 className="form-title">📚 Add New Tutorial</h2>

        <form onSubmit={handleSubmit} className="tutorial-form">

          <div className="form-row">
            <input
              name="title"
              value={form.title}
              placeholder="Title"
              onChange={handleChange}
            />

            <input
              name="language"
              value={form.language}
              placeholder="Language"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              name="category"
              value={form.category}
              placeholder="Category"
              onChange={handleChange}
            />

            <input
              name="description"
              value={form.description}
              placeholder="Description"
              onChange={handleChange}
            />
          </div>

          <textarea
            name="content"
            value={form.content}
            rows="10"
            placeholder="Content"
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            Add Tutorial
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddTutorial;