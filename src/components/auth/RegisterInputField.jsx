function RegisterInputField({ label, id, value, isValid, ...rest }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} {...rest} />
      {value &&
        (isValid ? (
          <span>Valid {/* Check Mark */}</span>
        ) : (
          <span>Invalid {/* Exclamation Mark with the Instructions Component */}</span>
        ))}
    </div>
  );
}

export default RegisterInputField;
