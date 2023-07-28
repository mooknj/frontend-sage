import React from "react"
import Card from "./Card"

interface PropTypes {
  isOpen: boolean
  onClose: () => void
  userData: userDataTypes
  photo: string
  onSaveData?: (data: any) => void
}

type userDataTypes = {
  name: string
  email: string
  phone: string
  company: { name: string }
}

const CardPopup = ({ isOpen, onClose, userData, photo, onSaveData }: PropTypes) => {
  return (
    <div className={`popup${isOpen ? " popup__opened" : ""}`}>
      <div className="popup-bg" onClick={onClose}></div>

      <Card data={userData} photo={photo} onSaveData={onSaveData} />
    </div>
  )
}

export default CardPopup
