const Input = ({ required, name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {required && <span className="text-danger">*</span>}
        {label}
      </label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Input;
