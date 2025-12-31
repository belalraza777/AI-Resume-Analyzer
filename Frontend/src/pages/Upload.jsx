import { useState } from 'react';
import { FiCheckCircle, FiUploadCloud } from 'react-icons/fi';
import api from '../api/api';
import Card from '../components/Card';
import Button from '../components/Button';
import FileDropzone from '../components/FileDropzone';
import ReportCard from '../components/ReportCard';
import useReportsStore from '../store/useReportsStore';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previewReport, setPreviewReport] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const { reports, fetchReports, analyzeReport } = useReportsStore();

  const handleSubmit = async event => {
    event.preventDefault();
    if (!file) return setError('Please select a PDF or DOCX file.');
    setError('');
    setMessage('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const response = await api.post('/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data?.data) {
        // Kick off analysis and hydrate store so we can show the report right away
        setMessage('Upload successful. Running analysis now...');
        setFile(null);
        // Get the new report ID from the response
        const newReportId = response.data.data;
        // Analyze the report
        const reportResponse = await analyzeReport(newReportId);
        // Refresh reports to get the latest data
        await fetchReports();
        // Show the latest report in preview
        const latest = reports[0];
        if (reportResponse?.success && latest) {
          setPreviewReport(latest);
          setShowPreview(true);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Upload resume</h1>
          <p className="page-subtitle">Drop your PDF or DOCX file to run ATS analysis.</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="section">
          <FileDropzone
            file={file}
            onFileSelect={selected => {
              setFile(selected);
              setError('');
              setMessage('');
            }}
            uploading={uploading}
            error={error}
          />
          <div className="card-actions" style={{ justifyContent: 'flex-start' }}>
            <Button type="submit" icon={FiUploadCloud} loading={uploading} disabled={!file}>
              Upload & analyze
            </Button>
            <Button type="button" variant="secondary" onClick={() => setFile(null)} disabled={!file || uploading}>
              Clear file
            </Button>
          </div>
          {message ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--success)' }}>
              <FiCheckCircle />
              <span>{message}</span>
            </div>
          ) : null}
        </form>
      </Card>
      {showPreview && previewReport ? (
        <div className="overlay-backdrop" role="dialog" aria-modal="true">
          <div className="overlay-card">
            <div className="overlay-header">
              <div>
                <h3 className="card-title" style={{ margin: 0 }}>Analysis ready</h3>
                <p className="muted" style={{ margin: '4px 0 0' }}>Here is your latest report.</p>
              </div>
              <Button variant="secondary" onClick={() => setShowPreview(false)}>
                Close
              </Button>
            </div>
            <ReportCard
              report={previewReport}
              onDelete={() => setShowPreview(false)}
              isAnalyzing={false}
              isDeleting={false}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Upload;
