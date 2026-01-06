/**
 * Card Container Component
 * Wraps content with optional title and action buttons
 */
const Card = ({ title, actions, children, className = '', ...props }) => {
  const classes = ['card', className].filter(Boolean).join(' ');
  
  return (
    <div className={classes} {...props}>
      {title && <h3 className="card-title">{title}</h3>}
      {actions && <div className="card-actions">{actions}</div>}
      {children}
    </div>
  );
};

export default Card;
