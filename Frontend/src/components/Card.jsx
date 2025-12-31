const Card = ({ title, actions, children, className = '', ...props }) => {
  const classes = ['card', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {title ? <h3 className="card-title">{title}</h3> : null}
      {actions ? <div className="card-actions">{actions}</div> : null}
      {children}
    </div>
  );
};

export default Card;
