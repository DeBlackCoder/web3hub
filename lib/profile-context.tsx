"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

interface UserProfile {
  name: string
  bio: string
  image: string | null
}

interface ProfileContextType {
  profile: UserProfile
  updateProfile: (profile: UserProfile) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Anonymous User",
    bio: "Web3 enthusiast",
    image: null,
  })

  useEffect(() => {
    const saved = localStorage.getItem("userProfile")
    if (saved) {
      setProfile(JSON.parse(saved))
    }
  }, [])

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile)
    localStorage.setItem("userProfile", JSON.stringify(newProfile))
  }

  return <ProfileContext.Provider value={{ profile, updateProfile }}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider")
  }
  return context
}
