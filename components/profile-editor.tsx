"use client"

import type React from "react"

import { useState } from "react"
import { useProfile } from "@/lib/profile-context"

interface ProfileEditorProps {
  onClose: () => void
}

export default function ProfileEditor({ onClose }: ProfileEditorProps) {
  const { profile, updateProfile } = useProfile()
  const [name, setName] = useState(profile.name)
  const [bio, setBio] = useState(profile.bio)
  const [image, setImage] = useState<string | null>(profile.image)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    updateProfile({
      name,
      bio,
      image,
    })
    onClose()
  }

  return (
    <div className="profile-form">
      <h3 style={{ marginBottom: "24px", fontSize: "20px", fontWeight: "700" }}>Edit Profile</h3>

      <div className="form-group">
        <label className="form-label">Profile Picture</label>
        <label className="image-upload-area">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <div>
            {image ? (
              <img
                src={image || "/placeholder.svg"}
                alt="Preview"
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
            ) : (
              <>
                <div className="image-upload-text">Click to upload image</div>
                <div className="image-upload-subtext">or drag and drop</div>
              </>
            )}
          </div>
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">Name</label>
        <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="form-group">
        <label className="form-label">Bio</label>
        <textarea
          className="form-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          style={{ resize: "vertical" }}
        />
      </div>

      <div className="form-actions">
        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
