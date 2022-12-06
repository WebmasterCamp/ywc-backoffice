import { ActionFunctionArgs } from 'react-router-dom'
import { legacy_fetchWithToken } from '../../utils/fetch'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const what = formData.get('action') as string
  switch (what) {
    case 'pass':
      return await pass(formData)
    case 'reserve':
      return await reserve(formData)
    case 'changeVerificationAmount':
      return await changeVerificationAmount(formData)
  }
  throw new Error(`unknown action: ${what}`)
}

async function pass(formData: FormData) {
  const id = formData.get('id') as string
  const candidatePassFinalist = await legacy_fetchWithToken(
    `users/finalist/pass`,
    { id },
    'POST'
  )

  if (candidatePassFinalist.status !== 'success') {
    throw new Error(`Post users/finalist/pass failed: ${candidatePassFinalist}`)
  }
  return null
}

async function reserve(formData: FormData) {
  const id = formData.get('id') as string
  const reserveNo = Number(formData.get('reserveNo') as string)
  const candidateReserveFinalist = await legacy_fetchWithToken(
    `users/finalist/reserve`,
    { id, reserveNo },
    'POST'
  )

  if (candidateReserveFinalist.status !== 'success') {
    throw new Error(
      `Post users/finalist/reserve failed: ${candidateReserveFinalist}`
    )
  }
  return null
}

async function changeVerificationAmount(formData: FormData) {
  const id = formData.get('id') as string
  const verificationAmount = Number(
    formData.get('verificationAmount') as string
  )
  const changeVerificationAmount = await legacy_fetchWithToken(
    `users/finalist/verification`,
    { id, verificationAmount },
    'POST'
  )

  if (changeVerificationAmount.status !== 'success') {
    throw new Error(
      `Post users/finalist/verification failed: ${changeVerificationAmount}`
    )
  }
  return null
}
