"use client"

import React, { useEffect, useState } from "react"
import Toggle from "./Toggle"
import CardInput from "./CardInput"

interface PropTypes {
  data: DataTypes
  photo: string
  onCardClick?: () => void
  onSaveData?: (data: any) => void
}

type DataTypes = {
  name: string
  email: string
  phone: string
  company: { name: string }
}

const Card = ({ data, photo, onCardClick, onSaveData }: PropTypes) => {
  const [cardDisabled, setCardDisabled] = useState(false)
  const [tmpData, setTmpData] = useState({ name: "", email: "", phone: "", company: { name: "" } })
  const [editDetail, setEditDetail] = useState(false)

  useEffect(() => {
    setTmpData(data)
  }, [data])

  const onClickEdit = (event: React.MouseEvent) => {
    if (event.stopPropagation) event.stopPropagation()
    setEditDetail(true)
  }

  const onSave = (event: React.MouseEvent) => {
    if (event.stopPropagation) event.stopPropagation()

    if (!validate("name", tmpData["name"])) {
      alert("Name must have a space.")
      return
    } else if (!validate("email", tmpData["email"])) {
      alert("Email format is incorrect.")
      return
    } else if (!validate("phone", tmpData["phone"])) {
      alert("Phone number must be XXX-XXXXXXX.")
      return
    }
    setEditDetail(false)
    onSaveData?.(tmpData)
  }

  const onEditing = (key: string, value: any) => {
    let tmp = { ...tmpData }
    tmp[key as keyof DataTypes] = value

    setTmpData(tmp)
  }

  const validate = (key: string, value: any) => {
    let pass = true

    if (key === "name") {
      pass = value.includes(" ")
    } else if (key === "email") {
      let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      pass = value.match(regex)
    } else if (key === "phone") {
      let regex = /^\(?([0-9]{3})\)?[-]?([0-9]{7})$/
      pass = value.match(regex)
    }
    return pass
  }

  return (
    <div className={`card${cardDisabled ? " card__disabled" : ""}`} onClick={cardDisabled || editDetail ? () => null : onCardClick}>
      <div className="card-actions">
        <button className="card-action-icon" disabled={cardDisabled} onClick={!editDetail ? onClickEdit : onSave}>
          <img className="btn-icon" src={!editDetail ? "/icon/editing.png" : "/icon/save.png"} />
        </button>

        <Toggle checked={!cardDisabled} onClick={() => setCardDisabled(!cardDisabled)} />
      </div>

      <div className="card-image">
        <img src={photo} />
      </div>

      <div className={`card-user-details${editDetail ? " card-user-details-edit" : ""}`}>
        <h5 className="card-user-detail">
          <span>{data.name}</span>
          <CardInput name="name" defaultValue={data.name} editable={editDetail} onChange={(e) => onEditing("name", e.target.value)} />
        </h5>
        <p className="card-user-detail">
          <span>{data.email}</span>
          <CardInput name="email" defaultValue={data.email} editable={editDetail} onChange={(e) => onEditing("email", e.target.value)} />
        </p>
        <p className="card-user-detail">
          <span>{data.phone}</span>
          <CardInput name="phone" defaultValue={data.phone} editable={editDetail} onChange={(e) => onEditing("phone", e.target.value)} />
        </p>
      </div>

      <div className="card-company-details">
        <p className="card-company-detail">
          <span>{data.company.name}</span>
        </p>
      </div>
    </div>
  )
}

export default Card
