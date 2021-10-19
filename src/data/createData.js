import fetch from 'node-fetch';




var results={};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const createData=async (clusterName,time,logger)=>{
    let query_list=Object.entries(process.env).filter(([key]) => key.includes('TX_KUBERNETES'));
   

    for(let i =0; i<query_list.length;i++){

        let key= query_list[i][0];
        let value= query_list[i][1];
        

        let query=value.replace('$cluster',clusterName).replace('$time',time);
            
            let urlString=process.env.PROMETHEUS_URL+'query?query='+query;

            const response=await fetch(urlString);
            const body=await response.json();

            console.log(body)

            if (body.status=="success" && body.data.result.length>0){
        
                console.log(body.data.result[0].value[1]);
               // results.push({name:key,value:body.data.result[0].value[1]});
               results[key]=body.data.result[0].value[1];
                }
    }
    

    logger.log('results:',results);
    return results;
  
  

}

export default createData;