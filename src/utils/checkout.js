export async function startCheckout() {
  const response = await fetch("/.netlify/functions/create-checkout-session", {
    method: "POST",
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || "Impossible de démarrer le paiement.")
  }

  const { url } = await response.json()
  window.location.href = url
}
