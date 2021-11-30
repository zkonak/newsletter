import createMail from '../views/createMail.js'
import sendMail from '../views/createMail.js'
import Utils from './Utils.js'
import createData from './createData.js'
import createScores from './createScores.js'
import fs from 'fs'

const init = async (cluster, dateRecent, datePrev, randomQuote, logger) => {
  // get Tenant and number of projects
  const objectTenant = await Utils.getTenant(cluster)
  // call prometheus API
  const dataRecent = await createData("'" + cluster + "'", "'" + objectTenant.tenant + "'", dateRecent, logger)
  const dataPrev = await createData("'" + cluster + "'", "'" + objectTenant.tenant + "'", datePrev, logger)
  // get Scores
  const dataScores = await createScores(dataRecent, dataPrev)

  dataRecent.date = (new Date(dateRecent)).toLocaleDateString()
  dataRecent.clusterName = cluster
  dataRecent.TX_KUBERNETES_PROJET = objectTenant.numberOfProjects
  // create comparisons
  dataRecent.TX_SUMMARY = 'Par rapport au mois précédent, '
  dataRecent.TX_SUMMARY = dataRecent.TX_SUMMARY + await Utils.getSummaryText(dataRecent.TX_KUBERNETES_WORKER_NUMBER, dataPrev.TX_KUBERNETES_WORKER_NUMBER, 'Workers') + '.'
  // dataRecent.TX_SUMMARY=data1.TX_SUMMARY+await Utils.getSummaryText(dataRecent.TX_KUBERNETES_PROJET,dataPrev.TX_KUBERNETES_PROJET,"Projet")+".";
  dataRecent.TX_KUBERNETES_CPU_POURCENT = await Utils.getPourcentText(dataRecent.TX_KUBERNETES_CPU_RESERVE, dataPrev.TX_KUBERNETES_CPU_UTILISE)
  dataRecent.TX_KUBERNETES_MEMORY_POURCENT = await Utils.getPourcentText(dataRecent.TX_KUBERNETES_MEMORY_RESERVE_BYTE, dataPrev.TX_KUBERNETES_MEMORY_UTILISE_BYTE)

  // create html
  const html_mail = await createMail(dataRecent, dataScores, randomQuote, logger)

  // write a file //send mail
  fs.writeFile('./my-page.html', html_mail, (error) => { console.log(error) })
}

export default init
