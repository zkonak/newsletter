const  VUE= require('vue');
const fs =require("fs");
const mjml =require('mjml');
const { createRenderer }=require('vue-server-renderer');

 const createMail=(file_name)=>{
  return new Promise((resolve, reject)=>{
    var file_path = '/home/zeliha/projets/newsletter/src/mjml/'+file_name+'.mjml';
  //  if(FS.existsSync(file_path)){
      var app = new VUE({
        data: {
            text1:"aaa",
            text2:"bbb",

        },
        template: fs.readFileSync(file_path, 'utf-8')
      })
      createRenderer().renderToString(app, (err, vue_render)=>{
        if(err){
          reject('Error at Vue compiler'+err)
        }else{
          var mjml_render = mjml(vue_render);
          if(mjml_render.html){
            //resolve(mjml_render.html)
            console.log(vue_render);
          }else{
            reject(err)
          }
        }
      })
 //   }
   // else{
  //    reject('Could not find template: ./mjml/'+file_name+'.mjml')
  //  }
  })
}

module.exports=createMail;