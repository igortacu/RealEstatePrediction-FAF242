// src/api/mortgage.ts
import type { ApiInput, ApiOutput } from '../../types/api'

const BASE_URL = 'http://localhost:5000'    // ← your friend’s URL

export async function calculateMortgageApi(input: ApiInput): Promise<ApiOutput> {
  const res = await fetch(`${BASE_URL}/`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(input),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API ${res.status}: ${text}`)
  }
  return res.json()
}
