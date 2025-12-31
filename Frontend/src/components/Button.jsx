const Button = ({ variant = 'primary', loading = false, fullWidth = false, icon: Icon, children, className = '', type = 'button', ...props }) => {
  const classes = ['button', variant, fullWidth ? 'full-width' : '', className].filter(Boolean).join(' ');
  const disabled = loading || props.disabled;

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {loading && <span className="spinner" aria-hidden="true" />}
      {Icon ? <Icon size={18} aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
