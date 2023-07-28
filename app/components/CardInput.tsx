import React from "react"

interface PropTypes {
  id?: string
  name?: string
  value?: any
  defaultValue?: any
  editable: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CardInput = ({ id, name, value, defaultValue, editable, onChange }: PropTypes) => {
  return (
    <input
      id={id}
      name={name}
      className={`card-input${editable ? " card-input-editable" : " card-input-hide"}`}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  )
}

export default CardInput
