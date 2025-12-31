const clamp = (val) => Math.min(100, Math.max(0, val ?? 0));

const ScoreRing = ({ value, label = 'ATS score', compact = false }) => {
  const safeValue = typeof value === 'number' ? Math.round(clamp(value)) : null;
  const radius = 36;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = clamp(value || 0);
  const offset = circumference - (progress / 100) * circumference;
  const color = progress >= 80 ? 'var(--success)' : progress >= 60 ? 'var(--warning)' : 'var(--danger)';

  return (
    <div className={`score-ring ${compact ? 'compact' : ''}`} aria-label="ATS score">
      <svg width={90} height={90} viewBox="0 0 90 90">
        <circle
          cx="45"
          cy="45"
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
        />
        <circle
          cx="45"
          cy="45"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fontWeight="700"
          fill="#0f172a"
        >
          {safeValue !== null ? `${safeValue}%` : 'N/A'}
        </text>
      </svg>
      {compact ? (
        <p className="score-label">{label}</p>
      ) : (
        <div>
          <div className="score-value">{safeValue !== null ? `${safeValue}%` : 'N/A'}</div>
          <p className="score-label">{label}</p>
        </div>
      )}
    </div>
  );
};

export default ScoreRing;
