const Input = ({ label, error, icon: Icon, className = '', ...props }) => {
  const shellClasses = ['input-shell', error ? 'error' : '', className].filter(Boolean).join(' ');

  return (
    <div className="form-group">
      {label ? <div className="label-row">{label}</div> : null}
      <div className={shellClasses}>
        {Icon ? <Icon size={18} className="input-icon" aria-hidden="true" /> : null}
        <input className="input" {...props} />
      </div>
      {error ? <span className="error-text">{error}</span> : null}
    </div>
  );
};

export default Input;
