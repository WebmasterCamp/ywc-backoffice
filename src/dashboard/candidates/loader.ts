import Candidate from '../../interfaces/Candidate'
import { requireUser } from '../../stores/auth'
import { legacy_fetchWithToken } from '../../utils/fetch'

export type LoaderData = Awaited<ReturnType<typeof loader>>

export const loader = async () => {
  await requireUser()

  const candidates = await legacy_fetchWithToken('users/all', '', 'get')
  if (candidates.status !== 'success')
    throw new Error(`Fetch users/all failed: ${candidates}`)

  const payload = candidates.payload as Candidate[]
  const candidatesList = payload.map((candidate: Candidate) => {
    return {
      id: candidate.id,
      birthdate: candidate.birthdate,
      committeeScore: candidate.committeeScore,
      email: candidate.email,
      facebook: candidate.facebook,
      failed: candidate.failed,
      firstName: candidate.firstName,
      firstNameEN: candidate.firstNameEN,
      isAnswerGeneral: candidate.isAnswerGeneral,
      isAnswerMajor: candidate.isAnswerMajor,
      isPassStaff: candidate.isPassStaff,
      lastName: candidate.lastName,
      lastNameEN: candidate.lastNameEN,
      major: candidate.major,
      nickname: candidate.nickname,
      phone: candidate.phone,
      sex: candidate.sex,
      status: candidate.status,
      step: candidate.step,
    } as Candidate
  })
  return candidatesList
}
