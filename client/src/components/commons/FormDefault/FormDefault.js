import React from 'react';

const FormDefault = ({ values, errors, handleChange, inputType, selectFrom }) => (
  <div>
    {Object.entries(values) &&
      Object.entries(values).map(([key, value], i) => (
        <div className="d-flex flex-column m-3">
          <label className="align-self-center">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          {inputType[i] === 'select' ? (
            <select
              name={key}
              value={value}
              onChange={handleChange}
              className={
                errors[key]
                  ? 'form-control is-invalid w-50 align-self-center'
                  : 'form-control w-50 align-self-center'
              }
            >
              <option value="-" selected>
                -
              </option>
              {selectFrom && selectFrom[i].map((el) => <option value={el.id}>{el.name}</option>)}
            </select>
          ) : (
            <input
              type={inputType[i]}
              name={key}
              value={value}
              onChange={handleChange}
              autoComplete="off"
              className={
                errors[key]
                  ? 'form-control is-invalid w-50 align-self-center'
                  : 'form-control w-50 align-self-center'
              }
            />
          )}
          {errors[key] ? <b className="text-danger text-center">{errors[key]}</b> : <br />}
        </div>
      ))}
  </div>
);

export default FormDefault;
