var registerTpl=require("../template/register.string");

SPA.defineView('register',{
  html:registerTpl,
  plugins:['delegated'],
  bindActions:{
    'tap.register':function () {
        SPA.open('register',{
            ani:{
                name:"dialog",
                width:280,
                hieght:200
            }
        })
    },
    'tap.cancel':function () {
        this.hide();
    }
  }

})