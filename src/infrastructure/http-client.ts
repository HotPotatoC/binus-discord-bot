import axios from 'axios'
import { auth, binus } from '../config'

export const request = axios.create({
  headers: {
    Origin: binus.newBinusMayaURL,
    Referer: binus.newBinusMayaURL,
    roleName: 'Student',
    Authorization: `Bearer ${auth.bearerToken}`,
    academicCareer: 'RS1',
    institution: 'BNS01',
    rOld: '1059b47e-695d-4476-9950-bb8de0454ca0',
    roleId: '4bcb81bd-46a8-4a09-a923-5e812cb7007b',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0',
    'Content-Type': 'application/json',
  },
})

export default request
