import { getRepository } from 'typeorm'
import { Party } from './entities/Party'

// Deletes parties that are more than 24 hours old.
export async function deleteOldParties() {
  return getRepository(Party)
    .createQueryBuilder('party')
    .delete()
    .where('TIMESTAMPDIFF(HOUR, latestTime, CURRENT_TIMESTAMP()) > 24')
    .execute()
}
