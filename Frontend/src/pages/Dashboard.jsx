import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiBarChart2, FiClock, FiFileText, FiUploadCloud } from 'react-icons/fi';
import Card from '../components/Card';
import Button from '../components/Button';
import ScoreRing from '../components/ScoreRing';
import useReportsStore from '../store/useReportsStore';
import { useAuth } from '../context/AuthContext';

// Sort reports newest-first to drive recent/latest views
const sortByNewest = reports =>
  [...reports].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

const computeStats = reports => {
  const scored = reports.filter(report => typeof report.atsScore === 'number');
  const average = scored.length
    ? Math.round(scored.reduce((total, report) => total + report.atsScore, 0) / scored.length)
    : null;
  const best = scored.length ? Math.max(...scored.map(report => report.atsScore)) : null;
  const latest = reports[0]?.atsScore ?? null;
  return { total: reports.length, average, best, latest };
};

const StatGrid = ({ stats }) => (
  <div className="grid three" style={{ marginBottom: 20 }}>
    <Card className="stat-card">
      <p className="stat-label">Reports</p>
      <p className="stat-value">{stats.total}</p>
      <span className="muted">Analyses completed</span>
    </Card>
    <Card className="stat-card">
      <p className="stat-label">Average score</p>
      <p className="stat-value">{stats.average !== null ? `${stats.average}%` : 'N/A'}</p>
      <span className="muted">Across scored reports</span>
    </Card>
    <Card className="stat-card">
      <p className="stat-label">Best score</p>
      <p className="stat-value">{stats.best !== null ? `${stats.best}%` : 'N/A'}</p>
      <span className="muted">Most ATS-friendly resume</span>
    </Card>
  </div>
);

const RecentReport = ({ report }) => (
  <div className="report-card">
    <ScoreRing value={report.atsScore} label="ATS" />
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <FiFileText />
          <strong>{report.originalName || 'Resume'}</strong>
        </div>
        <span className="report-meta">
          <FiClock />
          {new Date(report.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="tag-row">
        {(report.skillsFound || []).slice(0, 3).map(skill => (
          <span key={skill} className="chip">
            {skill}
          </span>
        ))}
      </div>
      <p className="muted" style={{ margin: 0 }}>
        {report.summary || 'No summary available yet.'}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const reports = useReportsStore(state => state.reports);
  const loading = useReportsStore(state => state.loading);
  const error = useReportsStore(state => state.error);
  const fetchReports = useReportsStore(state => state.fetchReports);

  useEffect(() => {
    // Load reports on entry; store keeps them synced for other pages
    fetchReports();
  }, [fetchReports]);

  const sortedReports = useMemo(() => sortByNewest(reports), [reports]);
  const stats = useMemo(() => computeStats(sortedReports), [sortedReports]);
  const recent = useMemo(() => sortedReports.slice(0, 3), [sortedReports]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, {user?.username || user?.email || 'there'} 👋</h1>
          <p className="page-subtitle">Track ATS performance, upload new resumes, and review your latest reports.</p>
        </div>
        <div className="quick-actions">
          <Link to="/upload">
            <Button icon={FiUploadCloud}>Upload resume</Button>
          </Link>
          <Link to="/reports">
            <Button variant="secondary" icon={FiBarChart2}>
              View reports
            </Button>
          </Link>
        </div>
      </div>

      {error ? <Card className="error-text">{error}</Card> : null}

      <StatGrid stats={stats} />

      <div className="grid two">
        <Card title="Quick actions">
          <div className="quick-actions">
            <Link to="/upload">
              <Button icon={FiUploadCloud}>Upload and analyze</Button>
            </Link>
            <Link to="/reports">
              <Button variant="secondary" icon={FiClock}>
                View history
              </Button>
            </Link>
          </div>
        </Card>

        <Card title="Latest score">
          {loading ? (
            <p className="muted">Loading...</p>
          ) : stats.latest !== null ? (
            <ScoreRing value={stats.latest} label="Most recent" />
          ) : (
            <p className="muted">Run your first analysis to see ATS scores.</p>
          )}
        </Card>
      </div>

      <Card title="Recent reports" style={{ marginTop: 18 }}>
        {loading ? (
          <p className="muted">Loading reports...</p>
        ) : recent.length === 0 ? (
          <div className="empty-state">No reports yet. Upload a resume to get started.</div>
        ) : (
          <div className="section">
            {recent.map(report => (
              <RecentReport key={report._id} report={report} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
