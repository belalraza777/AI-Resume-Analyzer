import { useEffect } from 'react';
import useReportsStore from '../store/useReportsStore';
import ReportCard from '../components/ReportCard';

export default function Report() {
  const {
    reports,
    loading,
    error,
    actionId,
    actionType,
    fetchReports,
    analyzeReport,
    deleteReport,
  } = useReportsStore();

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const loadingAction = actionId ? { id: actionId, type: actionType } : null;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">Review ATS scores and skill gaps.</p>
        </div>
        <button type="button" className="button secondary" onClick={fetchReports} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error ? <div className="error-text" style={{ marginBottom: 12 }}>{error}</div> : null}

      {loading && reports.length === 0 ? (
        <div className="card">Loading reports...</div>
      ) : null}

      {!loading && reports.length === 0 ? (
        <div className="card">No reports yet. Upload a resume to generate analysis.</div>
      ) : null}

      <div className="report-grid">
        {reports.map(report => (
          <ReportCard
            key={report._id}
            report={report}
            loadingAction={loadingAction}
          />
        ))}
      </div>
    </div>
  );
}
