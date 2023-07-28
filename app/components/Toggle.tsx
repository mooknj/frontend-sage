import React from "react"

interface PropTypes {
  checked: boolean
  onClick: () => void
}

const Toggle = ({ checked, onClick }: PropTypes) => {
  const onToggleClick = (event: React.MouseEvent) => {
    if (event.stopPropagation) event.stopPropagation()
    onClick()
  }

  return <div className={`toggle ${checked ? "toggle__on" : "toggle__off"}`} onClick={(event) => onToggleClick(event)}></div>
}

export default Toggle
