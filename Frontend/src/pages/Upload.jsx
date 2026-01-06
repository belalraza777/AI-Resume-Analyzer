import { useRef, useState } from 'react';
import api from '../api/api';
import ReportCard from '../components/ReportCard';
import useReportsStore from '../store/useReportsStore';

// Simple upload + analyze flow with a preview of the latest report
export default function Upload() {
  const { fetchReports, deleteReport } = useReportsStore();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [preview, setPreview] = useState(null); // Preview of the latest analyzed report

  // Handle file input change
  const handleFile = e => {
    const selected = e.target.files?.[0];
    setFile(selected || null);
    setError('');
    setMessage(selected ? `${selected.name} ready to upload` : '');
  };

  // Analyze a resume by its ID
  const analyzeResume = async resumeId => {
    // Call analyze endpoint for a given resume id and refresh store
    setLoading(true);
    try {
      setMessage('Analyzing resume...');
      const { data } = await api.post(`/analyze/report/${resumeId}`);
      setPreview(data?.data || null);
      setMessage('Analysis complete');
      await fetchReports();
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Analyze failed';
      setError(msg);
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  // Delete the current preview report
  const handleDelete = async () => {
    if (!preview?.resumeId) return;
    setLoading(true);
    try {
      setMessage('Deleting report...');
      await deleteReport(preview.resumeId);
      setPreview(null);
      setMessage('Report deleted successfully');
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Delete failed';
      setError(msg);
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to upload and analyze resume
  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) {
      setError('Pick a PDF or DOCX file');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('Uploading resume...');

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const { data } = await api.post('/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const resumeId = data?.data;
      if (!resumeId) throw new Error('No resume id returned');

      setFile(null);
      // After upload finishes, immediately analyze the same resume
      await analyzeResume(resumeId);
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Upload failed';
      setError(msg);
      setMessage('');
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {/* Full Screen Loading Overlay */}
      {loading && (
        <div className="upload-loading-overlay">
          <div className="upload-loading-content">
            <span className="spinner large" aria-hidden="true" />
            <h2 className="loading-title">
              {message || 'Processing...'}
            </h2>
            <p className="loading-subtitle">
              {message.includes('Uploading') ? 'Please wait while we upload your resume' : 
               message.includes('Analyzing') ? 'Our AI is analyzing your resume for ATS compatibility' :
               'Almost done...'}
            </p>
          </div>
        </div>
      )}

      <div className="page-header">
        <div>
          <h1 className="page-title">Upload Resume</h1>
          <p className="page-subtitle">Upload a PDF or DOCX to get an ATS report.</p>
        </div>
      </div>

      {error ? <div className="error-text" style={{ marginBottom: 12 }}>{error}</div> : null}
      {!loading && message ? <div className="muted" style={{ marginBottom: 12 }}>{message}</div> : null}

      <form className="card" onSubmit={handleSubmit}>
        <div
          className="dropzone"
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="drop-icon" aria-hidden="true">⬆</div>
          <p style={{ margin: '8px 0 4px', fontWeight: 600 }}>Select or drop your resume</p>
          <p className="muted" style={{ margin: 0 }}>PDF or DOCX · up to 5MB</p>
          {file ? <p style={{ marginTop: 8 }}>{file.name}</p> : null}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFile}
          disabled={loading}
          style={{ display: 'none' }}
        />

        <div className="quick-actions" style={{ marginTop: 14 }}>
          <button type="submit" className="button" disabled={loading || !file}>
            {loading ? <span className="spinner" aria-hidden="true" /> : null}
            <span>{loading ? 'Working...' : 'Upload & analyze'}</span>
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={() => { setFile(null); setError(''); setMessage(''); setPreview(null); }}
            disabled={loading || !file}
          >
            <span>Reset</span>
          </button>
        </div>

        <div className="tag-row" style={{ marginTop: 10 }}>
          <span className="chip">Fast analysis</span>
          <span className="chip">Secure upload</span>
          <span className="chip">Keeps skills list</span>
        </div>
      </form>

      {preview && !loading ? (
        <div
          className="overlay-backdrop"
          aria-modal="true"
          role="dialog"
        >
          <div className="overlay-card" style={{ maxWidth: 960 }}>
            <div className="overlay-header">
              <div>
                <h2 className="page-title" style={{ margin: 0, fontSize: 22 }}>Analysis Complete ✓</h2>
                <p className="muted" style={{ margin: '4px 0 0' }}>Your resume has been analyzed successfully</p>
              </div>
              <button
                type="button"
                className="button secondary"
                onClick={() => setPreview(null)}
              >
                Close
              </button>
            </div>

            <ReportCard
              report={preview}
              loadingAction={null}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
