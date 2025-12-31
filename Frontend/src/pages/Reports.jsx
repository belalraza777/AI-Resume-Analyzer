import { useEffect } from 'react';
import Card from '../components/Card';
import ReportCard from '../components/ReportCard';
import useReportsStore from '../store/useReportsStore';

const Reports = () => {
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
        // Initial load; store keeps state shared with other views
        fetchReports();
    }, [fetchReports]);

    const hasReports = reports.length > 0;
    // Flag helpers used to show loading state on per-row actions
    const isAnalyzing = id => actionId === id && actionType === 'analyze';
    const isDeleting = id => actionId === id && actionType === 'delete';

    // Decide what to render based on loading/data presence
    const renderBody = () => {
        if (loading) {
            return (
                <Card>
                    <p className="muted">Loading reports...</p>
                </Card>
            );
        }

        if (!hasReports) {
            return (
                <Card>
                    <div className="empty-state">No reports yet. Upload a resume to see insights.</div>
                </Card>
            );
        }

        return (
            <div className="section">
                {reports.map(report => (
                    <ReportCard
                        key={report._id}
                        report={report}
                        // onAnalyze={analyzeReport}
                        onDelete={deleteReport}
                        isAnalyzing={isAnalyzing(report.resumeId)}
                        isDeleting={isDeleting(report.resumeId)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Analysis reports</h1>
                    <p className="page-subtitle">Review ATS scores, skills coverage, and insights.</p>
                </div>
            </div>

            {error ? <Card className="error-text">{error}</Card> : null}
            {renderBody()}
        </div>
    );
};

export default Reports;
