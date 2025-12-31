import { useRef, useState } from 'react';
import { FiFile, FiUploadCloud } from 'react-icons/fi';

const formatBytes = size => {
  if (!size) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  const value = size / 1024 ** exponent;
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[exponent]}`;
};

const FileDropzone = ({ file, onFileSelect, accept = '.pdf,.doc,.docx', uploading = false, error }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = files => {
    if (!files?.length || uploading) return;
    const picked = files[0];
    onFileSelect?.(picked);
  };

  const handleDrop = event => {
    event.preventDefault();
    setDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div
      className={`dropzone ${dragging ? 'dragging' : ''}`}
      onDragOver={event => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      aria-label="Upload resume"
    >
      <div className="drop-icon">
        <FiUploadCloud size={20} />
      </div>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Drag & drop your resume</div>
      <div className="muted" style={{ marginBottom: 8 }}>
        or click to browse — PDF, DOC, DOCX (max 5MB)
      </div>
      {file ? (
        <div className="chip" style={{ justifyContent: 'center' }}>
          <FiFile size={16} />
          <span>{file.name}</span>
          <span className="muted">• {formatBytes(file.size)}</span>
        </div>
      ) : null}
      {error ? <div className="error-text" style={{ marginTop: 8 }}>{error}</div> : null}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={event => handleFiles(event.target.files)}
        disabled={uploading}
      />
    </div>
  );
};

export default FileDropzone;
