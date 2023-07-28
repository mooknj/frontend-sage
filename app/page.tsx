"use client"

import { useEffect, useState } from "react"
import api from "@/utils/api"
import Card from "./components/Card"
import CardPopup from "./components/CardPopup"

export default function Home() {
  const [users, setUsers] = useState([])
  const [userPhotos, setUserPhotos] = useState([])
  const [popupData, setPopupData] = useState({
    show: false,
    user: { name: "", email: "", phone: "", company: { name: "" } },
    photo: "",
  })

  useEffect(() => {
    let usersLS = localStorage.getItem("users") || ""
    let userPhotosLS = localStorage.getItem("userPhotos") || ""

    !usersLS?.length ? fetchUser() : setUsers(JSON.parse(usersLS))
    !userPhotosLS?.length ? fetchUserPhoto() : setUserPhotos(JSON.parse(userPhotosLS))
  }, [])

  const fetchUser = async () => {
    try {
      const res = await api.getUser()
      setUsers(res.data)
      localStorage.setItem("users", JSON.stringify(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUserPhoto = async () => {
    try {
      const res = await api.getUsersPhoto()
      setUserPhotos(res.data)
      localStorage.setItem("userPhotos", JSON.stringify(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  const onUpdateData = (data: any) => {
    let tmp = localStorage.getItem("users") || ""
    const newData = JSON.parse(tmp)
    console.log("newData", newData)

    let dataIndex = newData?.findIndex((item: any) => item.id == data.id)
    newData[dataIndex] = data

    setUsers(newData)
    if (popupData.show) {
      setPopupData({
        show: false,
        user: { name: "", email: "", phone: "", company: { name: "" } },
        photo: "",
      })
    }
    localStorage.setItem("users", JSON.stringify(newData))
  }

  // const userRows = [...Array(Math.ceil(users.length / 3))].map((row, index) => users.slice(index * 3, index * 3 + 3))

  return (
    <div className="content-area">
      <div className="row-wrapper">
        {/* {userRows.map((row: any, index) => ( */}
        <div className="card-row">
          {users.map((user: any) => {
            const photo = userPhotos.find((photo: any) => user.id == photo.id) || { download_url: "" }

            return (
              <Card
                key={user.id}
                data={user}
                photo={photo.download_url}
                onCardClick={() => setPopupData({ show: true, user: user, photo: photo.download_url })}
                onSaveData={onUpdateData}
              />
            )
          })}
        </div>
        {/* ))} */}
      </div>

      <CardPopup
        isOpen={popupData.show}
        onClose={() =>
          setPopupData({
            show: false,
            user: { name: "", email: "", phone: "", company: { name: "" } },
            photo: "",
          })
        }
        userData={popupData.user}
        photo={popupData.photo}
        onSaveData={onUpdateData}
      />
    </div>
  )
}
