import fetch from 'node-fetch'
// import config from '../config/env.js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const Utils = {
  getClusters: async () => {
    // clusters
    const response = await fetch(process.env.PROMETHEUS_URL + 'label/cluster/values')
    const body = await response.json()

    if (body.status == 'success') {
      return body.data
    }
  },

  json2array: (json) => {
    const result = []
    const keys = Object.keys(json)
    keys.forEach(function (key) {
      result.push(json[key])
    })
    return result
  },

  getTenant: async (cluster) => {
    const returnObject = { tenant: '', numberOfProjects: 0 }
    const response = await fetch(process.env.KGB_URL + cluster.replace('caas', 'managed'))
    const body = await response.json()

    // console.log(Utils.json2array(body.projects))
    const arrayProjects = Utils.json2array(body.projects)

    if (arrayProjects.length > 0) {
      returnObject.tenant = arrayProjects[0].tenant
      returnObject.numberOfProjects = arrayProjects.length
      return returnObject
    } else { return null }
  },


  getSummaryText: async (data1,data2,type) => {
    
    //let text="Par rapport au mois précédent, ";
    let text="";
    if (data1===data2){
        text=text+" Nombre de "+type+" sont même";
    }
    else if (data2>data1){
      
      text=(data2-data1)+" "+type+" sont supprimés";
  }
    else if (data2<data1){
      
    text=(data1-data2)+" "+type+" sont ajoutés";
  }
    return text;
   
  },

}

export default Utils
