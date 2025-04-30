const PersonForm = ({
  onSubmit,
  nameValue,
  onChangeName,
  phoneValue,
  onChangePhone,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={phoneValue} onChange={onChangePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
