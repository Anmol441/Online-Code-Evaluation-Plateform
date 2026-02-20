import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { problemsAPI, submissionsAPI } from '../services/api';
import { toast } from 'react-toastify';
import Editor from '@monaco-editor/react';
import { Play, CheckCircle, XCircle, Clock, AlertCircle, Loader } from 'lucide-react';
import './ProblemDetail.css';

const languageExtensions = {
  cpp: 'cpp',
  java: 'java',
  python: 'python',
  javascript: 'javascript'
};

const defaultCode = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
  java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`,
  python: `# Your code here
def solution():
    pass

if __name__ == "__main__":
    solution()`,
  javascript: `// Your code here
function solution() {
    
}

solution();`
};

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  const fetchProblem = useCallback(async () => {
    try {
      const response = await problemsAPI.getById(id);
      setProblem(response.data.data);
      setCode(response.data.data.starterCode?.[language] || defaultCode[language]);
    } catch (error) {
      toast.error('Failed to fetch problem');
      navigate('/problems');
    } finally {
      setLoading(false);
    }
  }, [id, language, navigate]);

  useEffect(() => {
    fetchProblem();
  }, [fetchProblem]);

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error('Please write some code first');
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const response = await submissionsAPI.submit({
        problemId: id,
        language,
        code
      });

      setResult(response.data.data);
      setActiveTab('result');
      
      if (response.data.data.verdict === 'Accepted') {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Submission failed';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const getVerdictIcon = (verdict) => {
    switch (verdict) {
      case 'Accepted':
        return <CheckCircle className="verdict-icon success" />;
      case 'Wrong Answer':
        return <XCircle className="verdict-icon error" />;
      case 'Time Limit Exceeded':
        return <Clock className="verdict-icon warning" />;
      default:
        return <AlertCircle className="verdict-icon error" />;
    }
  };

  const getVerdictClass = (verdict) => {
    switch (verdict) {
      case 'Accepted': return 'success';
      case 'Wrong Answer': return 'error';
      case 'Time Limit Exceeded': return 'warning';
      default: return 'error';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading problem...</div>
      </div>
    );
  }

  if (!problem) {
    return null;
  }

  return (
    <div className="problem-detail">
      {/* Left Panel - Problem Description */}
      <div className="problem-panel">
        <div className="problem-panel-header">
          <h1>{problem.title}</h1>
          <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          {result && (
            <button
              className={`tab ${activeTab === 'result' ? 'active' : ''}`}
              onClick={() => setActiveTab('result')}
            >
              Result
            </button>
          )}
        </div>

        <div className="tab-content">
          {activeTab === 'description' ? (
            <>
              <div className="section">
                <h3>Problem Statement</h3>
                <p className="problem-text">{problem.description}</p>
              </div>

              <div className="section">
                <h3>Constraints</h3>
                <pre className="constraints">{problem.constraints}</pre>
              </div>

              <div className="section">
                <h3>Input Format</h3>
                <p>{problem.inputFormat}</p>
              </div>

              <div className="section">
                <h3>Output Format</h3>
                <p>{problem.outputFormat}</p>
              </div>

              {problem.testCases && problem.testCases.length > 0 && (
                <div className="section">
                  <h3>Sample Test Cases</h3>
                  {problem.testCases.map((tc, index) => (
                    <div key={index} className="test-case">
                      <div className="test-case-header">Example {index + 1}</div>
                      <div className="test-case-content">
                        <div>
                          <strong>Input:</strong>
                          <pre>{tc.input}</pre>
                        </div>
                        <div>
                          <strong>Output:</strong>
                          <pre>{tc.output}</pre>
                        </div>
                        {tc.explanation && (
                          <div>
                            <strong>Explanation:</strong>
                            <p>{tc.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {problem.hints && problem.hints.length > 0 && (
                <div className="section">
                  <h3>Hints</h3>
                  {problem.hints.map((hint, index) => (
                    <div key={index} className="hint">
                      💡 {hint}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="result-panel">
              <div className={`verdict-header ${getVerdictClass(result.verdict)}`}>
                {getVerdictIcon(result.verdict)}
                <h2>{result.verdict}</h2>
              </div>

              <div className="result-stats">
                <div className="stat">
                  <span className="stat-label">Test Cases Passed:</span>
                  <span className="stat-value">
                    {result.testCasesPassed} / {result.totalTestCases}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Execution Time:</span>
                  <span className="stat-value">{result.executionTime} ms</span>
                </div>
                {result.score > 0 && (
                  <div className="stat">
                    <span className="stat-label">Score:</span>
                    <span className="stat-value">+{result.score} points</span>
                  </div>
                )}
              </div>

              {result.errorMessage && (
                <div className="error-message">
                  <strong>Error:</strong> {result.errorMessage}
                </div>
              )}

              {result.testCaseResults && result.testCaseResults.length > 0 && (
                <div className="test-results">
                  <h3>Test Case Results</h3>
                  {result.testCaseResults.map((tc, index) => (
                    <div key={index} className={`test-result ${tc.passed ? 'passed' : 'failed'}`}>
                      <div className="test-result-header">
                        {tc.passed ? <CheckCircle size={16} /> : <XCircle size={16} />}
                        Test Case {index + 1}
                      </div>
                      {!tc.passed && (
                        <div className="test-result-details">
                          <div>
                            <strong>Input:</strong> <code>{tc.input}</code>
                          </div>
                          <div>
                            <strong>Expected:</strong> <code>{tc.expectedOutput}</code>
                          </div>
                          <div>
                            <strong>Your Output:</strong> <code>{tc.actualOutput}</code>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <div className="editor-panel">
        <div className="editor-header">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn btn-success"
          >
            {submitting ? (
              <>
                <Loader className="spin" size={18} />
                Running...
              </>
            ) : (
              <>
                <Play size={18} />
                Submit Code
              </>
            )}
          </button>
        </div>

        <div className="editor-container">
          <Editor
            height="100%"
            language={languageExtensions[language]}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
