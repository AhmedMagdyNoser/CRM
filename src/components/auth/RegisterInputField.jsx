function RegisterInputField({ label, id, value, isValid, instructions, ...rest }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} {...rest} />
      {value &&
        (isValid ? (
          <span>{String.fromCharCode(10003) /* Check Mark */}</span>
        ) : (
          <>
            <span>{String.fromCharCode(33) /* Exclamation Mark  */}</span>
            <div>{instructions}</div>
          </>
        ))}
    </div>
  );
}

export default RegisterInputField;
