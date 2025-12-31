import { FiClock, FiRefreshCcw, FiTrash2 } from 'react-icons/fi';
import Card from './Card';
import ScoreRing from './ScoreRing';
import Button from './Button';

// Presentational card for a single report row
const ReportCard = ({ report, onDelete, isAnalyzing, isDeleting }) => (
  <Card className="report-card">
    <ScoreRing value={report.atsScore} label="ATS score" compact />
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 700 }}>{report.originalName || 'Resume'}</div>
        <div className="report-meta">
          <FiClock />
          {new Date(report.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="tag-row">
        {(report.skillsFound || []).slice(0, 6).map(skill => (
          <span key={skill} className="chip">
            {skill}
          </span>
        ))}
        {(report.skillsMissing || []).slice(0, 3).map(skill => (
          <span
            key={skill}
            className="chip"
            style={{ background: 'rgba(239, 68, 68, 0.12)', color: 'var(--danger)' }}
          >
            Missing: {skill}
          </span>
        ))}
      </div>

      <div className="divider" />
      <p className="muted" style={{ margin: '6px 0' }}>
        {report.summary || 'No summary provided.'}
      </p>
      <p className="muted" style={{ margin: '6px 0' }}>
        Suggestions: {report.suggestions || 'N/A'}
      </p>

      <div className="card-actions">
        <Button
          variant="secondary"
          icon={FiRefreshCcw}
          onClick={() => onAnalyze(report.resumeId)}
          loading={isAnalyzing}
        >
          Re-run analysis
        </Button>
        <Button variant="danger" icon={FiTrash2} onClick={() => onDelete(report.resumeId)} loading={isDeleting}>
          Delete
        </Button>
      </div>
    </div>
  </Card>
);

export default ReportCard;
