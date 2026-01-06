import { FiBarChart2, FiClock, FiRefreshCcw, FiTrash2, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import useReportsStore from '../store/useReportsStore';
import './ReportCard.css';

// Format createdAt to a readable short date
const formatDate = value => {
  if (!value) return 'Unknown date';
  const dt = new Date(value);
  return dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

// Map numeric ATS score to a label/tone for styling
const scoreState = score => {
  if (typeof score !== 'number') return { label: 'N/A', tone: 'muted' };
  if (score >= 80) return { label: 'Excellent', tone: 'success' };
  if (score >= 60) return { label: 'Good', tone: 'warning' };
  return { label: 'Needs work', tone: 'danger' };
};

// Render the full list of chips (no truncation)
const chipList = items => {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="chip-row">
      {items.map(item => (
        <span className="chip" key={item}>{item}</span>
      ))}
    </div>
  );
};

export default function ReportCard({
  report,
  loadingAction,
}) {
  const { analyzeReport, deleteReport } = useReportsStore();
  const score = report?.atsScore;
  const { label, tone } = scoreState(score);
  const summary = report?.summary || 'No summary available yet.';
  const suggestions = report?.suggestions?.trim();
const cleanText = report?.cleanText?.trim();

  // Track per-card loading states so analyze/delete buttons show spinners independently
  const isBusy = loadingAction?.id === report?.resumeId;
  const isAnalyzing = isBusy && loadingAction?.type === 'analyze';
  const isDeleting = isBusy && loadingAction?.type === 'delete';

  return (
    <div className="card report-card">
      <div className="report-head">
        <div className="score-block">
          <div className={`score-circle ${tone}`}>
            <FiBarChart2 aria-hidden="true" />
            <span>{typeof score === 'number' ? `${score}%` : 'N/A'}</span>
          </div>
          <div>
            <div className="score-label">ATS Score</div>
            <div className={`score-state ${tone}`}>{label}</div>
          </div>
        </div>

        <div className="report-meta">
          {/* Quick facts about when it was generated and skill counts */}
          <span className="meta-item">
            <FiClock aria-hidden="true" />
            {formatDate(report?.createdAt)}
          </span>
          <span className="meta-item">
            <FiCheckCircle aria-hidden="true" />
            {report?.skillsFound?.length || 0} skills matched
          </span>
          <span className="meta-item">
            <FiAlertTriangle aria-hidden="true" />
            {report?.skillsMissing?.length || 0} gaps
          </span>
        </div>
      </div>

      <div className="report-body">
        <div className="report-summary">{summary}</div>

        <div className="report-divider" />

        <div className="report-skills">
          <div className="skills-col">
            <div className="skills-title">Skills Found</div>
            {chipList(report?.skillsFound)}
          </div>
          <div className="skills-col">
            <div className="skills-title">Skills Missing</div>
            {chipList(report?.skillsMissing)}
          </div>
        </div>

        {suggestions || cleanText ? <div className="report-divider" /> : null}

        {suggestions ? (
          <div className="report-section">
            <div className="skills-title">Suggestions</div>
            <div className="report-text">{suggestions}</div>
          </div>
        ) : null}

        {suggestions && cleanText ? <div className="report-divider" /> : null}

        {cleanText ? (
          <div className="report-section">
            <div className="skills-title">Resume Text</div>
            <div className="report-text">{cleanText}</div>
          </div>
        ) : null}
      </div>

      <div className="report-actions">
        {/* Per-card actions; disabled when a request is in flight for this card */}
        <button
          type="button"
          className="button secondary"
          onClick={() => analyzeReport(report.resumeId)}
          disabled={isAnalyzing || isDeleting}
        >
          {isAnalyzing ? <span className="spinner" aria-hidden="true" /> : <FiRefreshCcw size={18} aria-hidden="true" />}
          <span>{isAnalyzing ? 'Analyzing...' : 'Re-run analysis'}</span>
        </button>
        <button
          type="button"
          className="button danger"
          onClick={() => deleteReport(report.resumeId)}
          disabled={isAnalyzing || isDeleting}
        >
          {isDeleting ? <span className="spinner" aria-hidden="true" /> : <FiTrash2 size={18} aria-hidden="true" />}
          <span>{isDeleting ? 'Removing...' : 'Delete'}</span>
        </button>
      </div>
    </div>
  );
}
