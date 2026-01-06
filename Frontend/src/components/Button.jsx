/**
 * Reusable Button Component
 * Supports variants (primary/secondary/danger), loading states, and icons
 */
const Button = ({ 
  variant = 'primary', 
  loading = false, 
  fullWidth = false, 
  icon: Icon, 
  children, 
  className = '', 
  type = 'button', 
  ...props 
}) => {
  const classes = ['button', variant, fullWidth ? 'full-width' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button 
      type={type} 
      className={classes} 
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className="spinner" aria-hidden="true" />}
      {Icon && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
