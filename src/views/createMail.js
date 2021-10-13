import vue from 'vue';
import fs from 'fs';
import mjml from 'mjml';
import { createRenderer } from 'vue-server-renderer';

const createMail=(data)=>{
  return new Promise((resolve, reject)=>{
    let file_path = './src/views/templateNewsletter.mjml';
  
      let mail = new vue({
        data: {
            text1:data.text1,
            text2:data.text2,

        },
        template: fs.readFileSync(file_path, 'utf-8')
      })
      createRenderer().renderToString(mail, (error, vue_render)=>{
        if(error){
          reject('Error at Vue compiler'+error)
        }else{
          var mjml_render = mjml(vue_render);
          if(mjml_render.html){
            //resolve(mjml_render.html)
            console.log(vue_render);
            //send mail html
          }else{
            reject(error);
          }
        }
      })

  })
}

export default createMail;