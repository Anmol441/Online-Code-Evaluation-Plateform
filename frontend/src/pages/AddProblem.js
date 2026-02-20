import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { problemsAPI } from '../services/api';
import { toast } from 'react-toastify';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import './AddProblem.css';

const AddProblem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Easy',
    tags: '',
    constraints: '',
    inputFormat: '',
    outputFormat: '',
    timeLimit: 2000,
    memoryLimit: 256,
    hints: [''],
    companies: [''],
    testCases: [
      { input: '', output: '', isSample: true, explanation: '' },
      { input: '', output: '', isSample: true, explanation: '' }
    ],
    starterCode: {
      cpp: '',
      java: '',
      python: '',
      javascript: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStarterCodeChange = (language, value) => {
    setFormData({
      ...formData,
      starterCode: {
        ...formData.starterCode,
        [language]: value
      }
    });
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...formData.testCases];
    newTestCases[index][field] = field === 'isSample' ? value === 'true' : value;
    setFormData({ ...formData, testCases: newTestCases });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: '', output: '', isSample: false, explanation: '' }]
    });
  };

  const removeTestCase = (index) => {
    if (formData.testCases.length > 1) {
      const newTestCases = formData.testCases.filter((_, i) => i !== index);
      setFormData({ ...formData, testCases: newTestCases });
    }
  };

  const handleHintChange = (index, value) => {
    const newHints = [...formData.hints];
    newHints[index] = value;
    setFormData({ ...formData, hints: newHints });
  };

  const addHint = () => {
    setFormData({ ...formData, hints: [...formData.hints, ''] });
  };

  const removeHint = (index) => {
    if (formData.hints.length > 1) {
      const newHints = formData.hints.filter((_, i) => i !== index);
      setFormData({ ...formData, hints: newHints });
    }
  };

  const handleCompanyChange = (index, value) => {
    const newCompanies = [...formData.companies];
    newCompanies[index] = value;
    setFormData({ ...formData, companies: newCompanies });
  };

  const addCompany = () => {
    setFormData({ ...formData, companies: [...formData.companies, ''] });
  };

  const removeCompany = (index) => {
    if (formData.companies.length > 1) {
      const newCompanies = formData.companies.filter((_, i) => i !== index);
      setFormData({ ...formData, companies: newCompanies });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description) {
      toast.error('Please fill in required fields');
      return;
    }

    if (formData.testCases.length === 0) {
      toast.error('Please add at least one test case');
      return;
    }

    // Check if at least one test case has input and output
    const validTestCases = formData.testCases.filter(tc => tc.input && tc.output);
    if (validTestCases.length === 0) {
      toast.error('Please add at least one complete test case');
      return;
    }

    setLoading(true);

    try {
      // Prepare data
      const problemData = {
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        constraints: formData.constraints,
        inputFormat: formData.inputFormat,
        outputFormat: formData.outputFormat,
        timeLimit: parseInt(formData.timeLimit),
        memoryLimit: parseInt(formData.memoryLimit),
        testCases: formData.testCases.filter(tc => tc.input && tc.output),
        hints: formData.hints.filter(h => h.trim()),
        companies: formData.companies.filter(c => c.trim()),
        starterCode: formData.starterCode
      };

      const response = await problemsAPI.create(problemData);

      if (response.data.success) {
        toast.success('Problem created successfully!');
        navigate('/admin/problems');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create problem';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-problem-page">
      <div className="container">
        <div className="page-header">
          <button onClick={() => navigate('/admin')} className="btn btn-secondary">
            <ArrowLeft size={20} />
            Back to Admin
          </button>
          <h1 className="page-title">Add New Problem</h1>
        </div>

        <form onSubmit={handleSubmit} className="problem-form">
          {/* Basic Information */}
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-group">
              <label>Problem Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Two Sum"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Difficulty *</label>
                <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label>Time Limit (ms)</label>
                <input
                  type="number"
                  name="timeLimit"
                  value={formData.timeLimit}
                  onChange={handleChange}
                  min="1000"
                  max="10000"
                  step="1000"
                />
              </div>

              <div className="form-group">
                <label>Memory Limit (MB)</label>
                <input
                  type="number"
                  name="memoryLimit"
                  value={formData.memoryLimit}
                  onChange={handleChange}
                  min="128"
                  max="512"
                  step="64"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., Array, Hash Table, Two Pointers"
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={8}
                placeholder="Detailed problem description..."
                required
              />
            </div>

            <div className="form-group">
              <label>Constraints *</label>
              <textarea
                name="constraints"
                value={formData.constraints}
                onChange={handleChange}
                rows={4}
                placeholder="e.g., 1 <= nums.length <= 10^4"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Input Format *</label>
                <textarea
                  name="inputFormat"
                  value={formData.inputFormat}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the input format..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Output Format *</label>
                <textarea
                  name="outputFormat"
                  value={formData.outputFormat}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the output format..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Test Cases */}
          <div className="form-section">
            <div className="section-header">
              <h2>Test Cases</h2>
              <button type="button" onClick={addTestCase} className="btn btn-primary btn-sm">
                <Plus size={16} />
                Add Test Case
              </button>
            </div>

            {formData.testCases.map((testCase, index) => (
              <div key={index} className="test-case-item">
                <div className="test-case-header">
                  <h3>Test Case {index + 1}</h3>
                  {formData.testCases.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Input</label>
                    <textarea
                      value={testCase.input}
                      onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                      rows={3}
                      placeholder="Test case input..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Expected Output</label>
                    <textarea
                      value={testCase.output}
                      onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                      rows={3}
                      placeholder="Expected output..."
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Sample Test Case?</label>
                    <select
                      value={testCase.isSample.toString()}
                      onChange={(e) => handleTestCaseChange(index, 'isSample', e.target.value)}
                    >
                      <option value="true">Yes (Visible to users)</option>
                      <option value="false">No (Hidden)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Explanation (Optional)</label>
                    <input
                      type="text"
                      value={testCase.explanation}
                      onChange={(e) => handleTestCaseChange(index, 'explanation', e.target.value)}
                      placeholder="Explain the test case..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hints */}
          <div className="form-section">
            <div className="section-header">
              <h2>Hints (Optional)</h2>
              <button type="button" onClick={addHint} className="btn btn-primary btn-sm">
                <Plus size={16} />
                Add Hint
              </button>
            </div>

            {formData.hints.map((hint, index) => (
              <div key={index} className="hint-item">
                <input
                  type="text"
                  value={hint}
                  onChange={(e) => handleHintChange(index, e.target.value)}
                  placeholder={`Hint ${index + 1}...`}
                />
                {formData.hints.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHint(index)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Companies */}
          <div className="form-section">
            <div className="section-header">
              <h2>Companies (Optional)</h2>
              <button type="button" onClick={addCompany} className="btn btn-primary btn-sm">
                <Plus size={16} />
                Add Company
              </button>
            </div>

            {formData.companies.map((company, index) => (
              <div key={index} className="company-item">
                <input
                  type="text"
                  value={company}
                  onChange={(e) => handleCompanyChange(index, e.target.value)}
                  placeholder="Company name..."
                />
                {formData.companies.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCompany(index)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Starter Code */}
          <div className="form-section">
            <h2>Starter Code (Optional)</h2>

            <div className="starter-code-grid">
              <div className="form-group">
                <label>C++</label>
                <textarea
                  value={formData.starterCode.cpp}
                  onChange={(e) => handleStarterCodeChange('cpp', e.target.value)}
                  rows={6}
                  placeholder="C++ starter code..."
                  style={{ fontFamily: 'monospace' }}
                />
              </div>

              <div className="form-group">
                <label>Java</label>
                <textarea
                  value={formData.starterCode.java}
                  onChange={(e) => handleStarterCodeChange('java', e.target.value)}
                  rows={6}
                  placeholder="Java starter code..."
                  style={{ fontFamily: 'monospace' }}
                />
              </div>

              <div className="form-group">
                <label>Python</label>
                <textarea
                  value={formData.starterCode.python}
                  onChange={(e) => handleStarterCodeChange('python', e.target.value)}
                  rows={6}
                  placeholder="Python starter code..."
                  style={{ fontFamily: 'monospace' }}
                />
              </div>

              <div className="form-group">
                <label>JavaScript</label>
                <textarea
                  value={formData.starterCode.javascript}
                  onChange={(e) => handleStarterCodeChange('javascript', e.target.value)}
                  rows={6}
                  placeholder="JavaScript starter code..."
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin')} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-success" disabled={loading}>
              <Save size={20} />
              {loading ? 'Creating Problem...' : 'Create Problem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProblem;
