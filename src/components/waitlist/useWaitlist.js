import { useState } from "react"

const STORAGE_KEY = "ingeprep_waitlist"

function encodeFormData(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&")
}

function saveLocally(entry) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  existing.push(entry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
}

export function useWaitlist() {
  const [status, setStatus] = useState("idle") // idle | submitting | success | error

  async function submit({ email, role }) {
    setStatus("submitting")
    const entry = { email, role, submittedAt: new Date().toISOString() }

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData({ "form-name": "waitlist", email, role }),
      })
      saveLocally(entry)
      setStatus("success")
    } catch (error) {
      saveLocally(entry)
      setStatus("success")
    }
  }

  return { status, submit }
}
