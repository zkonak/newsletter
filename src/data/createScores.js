
const getScoreConsommation = async (data) => {
  let scoreConsommation = 0
  if (data.TX_KUBERNETES_CPU_RESERVE - data.TX_KUBERNETES_CPU_UTILISE < 5) {
    scoreConsommation = 5
  } else if (data.TX_KUBERNETES_CPU_RESERVE - data.TX_KUBERNETES_CPU_UTILISE < 10) {
    scoreConsommation = 4
  } else if (data.TX_KUBERNETES_CPU_RESERVE - data.TX_KUBERNETES_CPU_UTILISE < 15) {
    scoreConsommation = 3
  } else if (data.TX_KUBERNETES_CPU_RESERVE - data.TX_KUBERNETES_CPU_UTILISE < 20) {
    scoreConsommation = 2
  } else {
    scoreConsommation = 1
  }

  if (data.TX_KUBERNETES_MEMORY_RESERVE - data.TX_KUBERNETES_MEMORY_UTILISE < 5) {
    scoreConsommation = scoreConsommation + 5
  } else if (data.TX_KUBERNETES_MEMORY_RESERVE - data.TX_KUBERNETES_MEMORY_UTILISE < 10) {
    scoreConsommation = scoreConsommation + 4
  } else if (data.TX_KUBERNETES_MEMORY_RESERVE - data.TX_KUBERNETES_MEMORY_UTILISE < 15) {
    scoreConsommation = scoreConsommation + 3
  } else if (data.TX_KUBERNETES_MEMORY_RESERVE - data.TX_KUBERNETES_MEMORY_UTILISE < 20) {
    scoreConsommation = scoreConsommation + 2
  } else {
    scoreConsommation = scoreConsommation + 1
  }

  return Math.round(scoreConsommation / 2, 0)
}

const getScoreQualite = async (data) => {
  let scoreQualite = 0
  if (data.TX_KUBERNETES_REPLICAS > 1) {
    scoreQualite = 5
  } else {
    scoreQualite = 1
  }
  /// ?????????////
  if (data.TX_KUBERNETES_LIVENESS < 15) {
    scoreQualite = scoreQualite + 3
  } else {
    scoreQualite = scoreQualite + 5
  }

  if (data.TX_KUBERNETES_DEPLOYMENT_MONTHLY < 20) {
    scoreQualite = scoreQualite + 2
  } else {
    scoreQualite = scoreQualite + 5
  }

  return Math.round(scoreQualite / 3, 0)
}

const getScoreSecurity = async (data) => {
  let scoreSecurity = 0
  /// ????????///
  if (data.TX_KUBERNETES_DOCKER_PROMOTE_FORCED < 5) {
    scoreSecurity = 5
  } else {
    scoreSecurity = 1
  }
  /// ?????????////
  if (data.TX_KUBERNETES_DOCKER_EXTRANET < 5) {
    scoreSecurity = scoreSecurity + 5
  } else {
    scoreSecurity = scoreSecurity + 2
  }

  return Math.round(scoreSecurity / 2, 0)
}

const getDifferenceeAsString = async (difference) => {
  if (difference > 0) {
    return '+' + difference + ' score que mois précédent'
  } else if (difference == 0) {
    return 'Même score que mois précédent'
  } else {
    return  difference + ' score que mois précédent'
  }
}

const createScores = async (dataRecent, dataPast, logger) => {
  // score consommation
  dataRecent.TX_SCORE_CONSOMMATION = await getScoreConsommation(dataRecent)
  dataPast.TX_SCORE_CONSOMMATION = await getScoreConsommation(dataPast)
  let difference = await (dataPast.TX_SCORE_CONSOMMATION - dataRecent.TX_SCORE_CONSOMMATION)

  // text consommation
  dataRecent.TX_SCORE_CONSOMMATION_COMPARE = await getDifferenceeAsString(difference)
  // score qualite
  dataRecent.TX_SCORE_QUALITE = await getScoreQualite(dataRecent)
  dataPast.TX_SCORE_QUALITE = await getScoreQualite(dataPast)
  difference = await (dataPast.TX_SCORE_QUALITE - dataRecent.TX_SCORE_QUALITE)
  // text qualite
  dataRecent.TX_SCORE_QUALITE_COMPARE = await getDifferenceeAsString(difference)
  // score security
  dataRecent.TX_SCORE_SECURITY = await getScoreSecurity(dataRecent)
  dataPast.TX_SCORE_SECURITY = await getScoreSecurity(dataPast)
  difference = await (dataPast.TX_SCORE_SECURITY - dataRecent.TX_SCORE_SECURITY)
  // text security
  dataRecent.TX_SCORE_SECURITY_COMPARE = await getDifferenceeAsString(difference)

  return dataRecent
}

export default createScores
