"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5790],{5790:(W,b,m)=>{m.r(b),m.d(b,{AdministracionCuentasPageModule:()=>M});var d=m(177),c=m(4341),i=m(7604),F=m(305),u=m(467),e=m(3953),g=m(6761);let S=(()=>{var n;class l{constructor(t,o,a,s,_){this.modalController=t,this.fb=o,this.alertController=a,this.loadingController=s,this.authService=_}ngOnInit(){this.informacionUsuario=this.fb.group({usuario:["",[c.k0.required,c.k0.minLength(3)]],email:["",[c.k0.required,c.k0.email]],password:["",[c.k0.required,c.k0.required]],role:["",[c.k0.required,c.k0.required]],autos:[[]],herramientas:[[]],documentos:[[]],reportes:[[]]})}presentAlert(t){var o=this;return(0,u.A)(function*(){yield(yield o.alertController.create({message:t,buttons:["OK"]})).present()})()}getInformacionUsuario(){var t=this;return(0,u.A)(function*(){const o=yield t.loadingController.create({message:"Espere un momento..."});if(o.present(),t.informacionUsuario.valid){const a=t.informacionUsuario.value;console.log(a),t.authService.register(a).then(s=>{console.log(s),t.limpiarFormulario()}),t.presentAlert("Se ha agregado el usuario correctamente..."),o.dismiss()}else t.presentAlert("Todos los campos son obligatorios"),o.dismiss()})()}cancel(){var t=this;return(0,u.A)(function*(){yield t.modalController.dismiss(null,"cancel")})()}limpiarFormulario(){var t=this;return(0,u.A)(function*(){t.informacionUsuario.reset()})()}}return(n=l).\u0275fac=function(t){return new(t||n)(e.rXU(i.W3),e.rXU(c.ok),e.rXU(i.hG),e.rXU(i.Xi),e.rXU(g.u))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-agregar-cuenta"]],standalone:!0,features:[e.aNF],decls:43,vars:1,consts:[[2,"--background","#757374","color","white"],["slot","end"],[3,"click"],["slot","icon-only","name","close-outline"],[1,"ion-padding"],[1,"row","p-5"],[1,"col-md-4","text-center"],["src","assets/user_sys.png","alt","",2,"height","80%"],[1,"col-md-8"],[3,"ngSubmit","formGroup"],[1,"form-floating","mb-3"],["type","text","id","floatingInputUser","placeholder","Nombre del usuario","formControlName","usuario",1,"form-control"],["for","floatingInputUser"],["type","email","id","floatingInputEmail","placeholder","ejemplo@gmail.com","formControlName","email",1,"form-control"],["for","floatingInputEmail"],["type","text","id","floatingInputPassword","placeholder","*********","formControlName","password",1,"form-control"],["for","floatingInputPassword"],["aria-label","Large select example","formControlName","role",1,"form-select","mb-3"],["value","","selected",""],["value","Gerente"],["value","Supervisor"],["value","Inspector"],["value","PA"],[1,"row","text-center"],[1,"col-md-6","d-grid","gap-2"],["fill","clear",1,"btn","btn-secondary","mt-3",3,"click"],["type","submit","fill","clear",1,"btn","btn-success","mt-3"]],template:function(t,o){1&t&&(e.j41(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title"),e.EFF(3," Agrega un nuevo usuario "),e.k0s(),e.j41(4,"ion-buttons",1)(5,"ion-button",2),e.bIt("click",function(){return o.cancel()}),e.nrm(6,"ion-icon",3),e.k0s()()()(),e.j41(7,"ion-content",4)(8,"div",5)(9,"div",6),e.nrm(10,"img",7),e.k0s(),e.j41(11,"div",8)(12,"form",9),e.bIt("ngSubmit",function(){return o.getInformacionUsuario()}),e.j41(13,"div",10),e.nrm(14,"input",11),e.j41(15,"label",12),e.EFF(16,"Nombre de usuario"),e.k0s()(),e.j41(17,"div",10),e.nrm(18,"input",13),e.j41(19,"label",14),e.EFF(20,"Correo electr\xf3nico"),e.k0s()(),e.j41(21,"div",10),e.nrm(22,"input",15),e.j41(23,"label",16),e.EFF(24,"Contrase\xf1a"),e.k0s()(),e.j41(25,"select",17)(26,"option",18),e.EFF(27,"Tipo de usuario"),e.k0s(),e.j41(28,"option",19),e.EFF(29,"Gerente"),e.k0s(),e.j41(30,"option",20),e.EFF(31,"Supervisor"),e.k0s(),e.j41(32,"option",21),e.EFF(33,"Inspector"),e.k0s(),e.j41(34,"option",22),e.EFF(35,"Peronsal de apoyo"),e.k0s()(),e.j41(36,"div",23)(37,"div",24)(38,"ion-button",25),e.bIt("click",function(){return o.limpiarFormulario()}),e.EFF(39,"Limpiar formulario"),e.k0s()(),e.j41(40,"div",24)(41,"ion-button",26),e.EFF(42,"Agregar usuario"),e.k0s()()()()()()()),2&t&&(e.R7$(12),e.Y8G("formGroup",o.informacionUsuario))},dependencies:[i.bv,i.Jm,i.QW,i.W9,i.eU,i.iq,i.BC,i.ai,d.MD,c.YN,c.qT,c.xH,c.y7,c.me,c.wz,c.BC,c.cb,c.X1,c.j4,c.JD]}),l})();var v=m(7818);function I(n,l){if(1&n){const r=e.RV6();e.j41(0,"ion-item",6),e.bIt("click",function(){const o=e.eBV(r).$implicit,a=e.XpG();return e.Njj(a.asignarAuto(o))}),e.j41(1,"ion-label"),e.EFF(2),e.k0s()()}if(2&n){const r=l.$implicit,t=e.XpG();e.AVh("selected",t.isAutoSelected(r)),e.R7$(2),e.JRh(r.placa)}}let C=(()=>{var n;class l{constructor(t,o,a){this.modalController=t,this.carService=o,this.authservice=a,this.autos=[],this.results=[],this.autosSeleccionados=[]}ngOnInit(){this.getInformacion()}getInformacion(){var t=this;return(0,u.A)(function*(){t.carService.getCar().subscribe({next:o=>{t.autos=o,t.results=o,t.detallesUsuario.autos.forEach(a=>{const s=t.autos.filter(_=>_.id==a.id);t.autosSeleccionados.push(s[0])})},error:o=>{console.log("Error: "+o.message)}})})()}buscarAuto(t){const o=t.target.value.toLowerCase();this.results=this.autos.filter(a=>a.placa.toLowerCase().indexOf(o)>-1)}asignarAuto(t){const o=this.autosSeleccionados.indexOf(t);-1===o?this.autosSeleccionados.push(t):this.autosSeleccionados.splice(o,1);try{const a=this.autosSeleccionados.map(s=>({id:s.id,placa:s.placa}));this.detallesUsuario.autos=a,this.authservice.updateUser(this.detallesUsuario).then(s=>{console.log(s)})}catch(a){console.error("El error ha sido: ",a)}}isAutoSelected(t){return this.autosSeleccionados.includes(t)}cancel(){var t=this;return(0,u.A)(function*(){yield t.modalController.dismiss()})()}}return(n=l).\u0275fac=function(t){return new(t||n)(e.rXU(i.W3),e.rXU(v.d),e.rXU(g.u))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-autos"]],inputs:{detallesUsuario:"detallesUsuario"},standalone:!0,features:[e.aNF],decls:12,vars:2,consts:[[2,"--background","#757374","color","white"],["slot","end"],[3,"click"],["slot","icon-only","name","close-outline"],["showCancelButton","always","mode","ios","color","light","cancel-button-text","Borrar","placeholder","Busca un auto",3,"ionInput","debounce"],["button","","class","m-2",3,"selected","click",4,"ngFor","ngForOf"],["button","",1,"m-2",3,"click"]],template:function(t,o){1&t&&(e.j41(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title"),e.EFF(3," Busca y agrega un auto "),e.k0s(),e.j41(4,"ion-buttons",1)(5,"ion-button",2),e.bIt("click",function(){return o.cancel()}),e.nrm(6,"ion-icon",3),e.k0s()()(),e.j41(7,"ion-toolbar",0)(8,"ion-searchbar",4),e.bIt("ionInput",function(s){return o.buscarAuto(s)}),e.k0s()()(),e.j41(9,"ion-content")(10,"ion-list"),e.DNE(11,I,3,3,"ion-item",5),e.k0s()()),2&t&&(e.R7$(8),e.Y8G("debounce",25),e.R7$(3),e.Y8G("ngForOf",o.results))},dependencies:[d.MD,d.Sq,i.bv,i.Jm,i.QW,i.W9,i.eU,i.iq,i.uz,i.he,i.nf,i.S1,i.BC,i.ai,i.Gw,c.YN,c.X1],styles:["ion-item.selected[_ngcontent-%COMP%]::part(native){background-color:#ced7f0;border-radius:12px}"]}),l})();var k=m(4488);function A(n,l){if(1&n){const r=e.RV6();e.j41(0,"ion-item",7),e.bIt("click",function(){e.eBV(r);const o=e.XpG().$implicit,a=e.XpG();return e.Njj(a.asignarHerramienta(o))}),e.j41(1,"ion-label"),e.EFF(2),e.k0s()()}if(2&n){const r=e.XpG().$implicit,t=e.XpG();e.AVh("selected",t.isHerramientaSelected(r)),e.R7$(2),e.Lme("Identificador: ",r.identificacion," || Capacidad: ",r.capacidad,"kg")}}function j(n,l){if(1&n&&(e.qex(0),e.DNE(1,A,3,4,"ion-item",6),e.bVm()),2&n){const r=l.$implicit,t=e.XpG();e.R7$(),e.Y8G("ngIf","Disponible"==r.estado||r.estado==t.user)}}let y=(()=>{var n;class l{constructor(t,o,a){this.modalController=t,this.toolService=o,this.authservice=a,this.herramientasSeleccionadas=[],this.herramientas=[],this.results=[]}ngOnInit(){this.getInformacion()}getInformacion(){var t=this;return(0,u.A)(function*(){t.toolService.getTool().subscribe({next:o=>{t.herramientas=o,t.results=o;const a=new Map(o.map(s=>[s.id,s]));t.herramientasSeleccionadas=t.detallesUsuario.herramientas.map(s=>a.get(s.id)).filter(s=>s),console.log(t.herramientasSeleccionadas)}}),t.user=t.detallesUsuario.id})()}cancel(){var t=this;return(0,u.A)(function*(){yield t.modalController.dismiss()})()}buscarHerramienta(t){var o=this;return(0,u.A)(function*(){const a=t.target.value.toString();o.results=""==a?o.herramientas:o.herramientas.filter(s=>s.capacidad.toString()==a)})()}isHerramientaSelected(t){return this.herramientasSeleccionadas.includes(t)}asignarHerramienta(t){var o=this;return(0,u.A)(function*(){const a=o.herramientasSeleccionadas.indexOf(t);console.log(a),-1===a?(o.herramientasSeleccionadas.push(t),t.estado=o.user):(o.herramientasSeleccionadas.splice(a,1),t.estado="Disponible");try{var s=o.herramientasSeleccionadas.map(_=>({id:_.id,identificacion:_.identificacion}));o.detallesUsuario.herramientas=s,o.authservice.updateUser(o.detallesUsuario).then(_=>{o.toolService.updateTool(t).then(p=>{console.log(p)}),console.log(_)})}catch(_){console.error("El error ha sido: ",_)}})()}}return(n=l).\u0275fac=function(t){return new(t||n)(e.rXU(i.W3),e.rXU(k.b),e.rXU(g.u))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-equipos"]],inputs:{detallesUsuario:"detallesUsuario"},standalone:!0,features:[e.aNF],decls:12,vars:2,consts:[[2,"--background","#757374","color","white"],["slot","end"],[3,"click"],["slot","icon-only","name","close-outline"],["showCancelButton","always","mode","ios","color","light","cancel-button-text","Borrar","placeholder","Ingresa la capacidadde la herramienta",3,"ionInput","debounce"],[4,"ngFor","ngForOf"],["button","","class","m-2",3,"selected","click",4,"ngIf"],["button","",1,"m-2",3,"click"]],template:function(t,o){1&t&&(e.j41(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title"),e.EFF(3," Ingresa la capacidad del equipo "),e.k0s(),e.j41(4,"ion-buttons",1)(5,"ion-button",2),e.bIt("click",function(){return o.cancel()}),e.nrm(6,"ion-icon",3),e.k0s()()(),e.j41(7,"ion-toolbar",0)(8,"ion-searchbar",4),e.bIt("ionInput",function(s){return o.buscarHerramienta(s)}),e.k0s()()(),e.j41(9,"ion-content")(10,"ion-list"),e.DNE(11,j,2,1,"ng-container",5),e.k0s()()),2&t&&(e.R7$(8),e.Y8G("debounce",25),e.R7$(3),e.Y8G("ngForOf",o.results))},dependencies:[i.bv,i.Jm,i.QW,i.W9,i.eU,i.iq,i.uz,i.he,i.nf,i.S1,i.BC,i.ai,i.Gw,d.MD,d.Sq,d.bT,c.YN,c.X1],styles:["ion-item.selected[_ngcontent-%COMP%]::part(native){background-color:#ced7f0;border-radius:12px}"]}),l})();function x(n,l){if(1&n&&(e.j41(0,"ion-accordion")(1,"ion-item",7)(2,"ion-label"),e.EFF(3),e.k0s()(),e.j41(4,"div",8)(5,"ul")(6,"li"),e.EFF(7),e.k0s(),e.j41(8,"li"),e.EFF(9),e.k0s(),e.j41(10,"li"),e.EFF(11),e.k0s(),e.j41(12,"li"),e.EFF(13),e.k0s(),e.j41(14,"li"),e.EFF(15),e.k0s(),e.j41(16,"li"),e.EFF(17),e.k0s(),e.j41(18,"li"),e.EFF(19),e.k0s()()()()),2&n){const r=l.$implicit;e.R7$(3),e.SpI("Identificador del equipo: ",r.identificacion,""),e.R7$(4),e.SpI("Capacidad: ",r.capacidad," kg"),e.R7$(2),e.SpI("Marca: ",r.marca,""),e.R7$(2),e.SpI("Modelo: ",r.modelo,""),e.R7$(2),e.SpI("Clase de exatitud: ",r.clase_exactitud,""),e.R7$(2),e.SpI("Num. Serie: ",r.no_serie,""),e.R7$(2),e.SpI("Tipo de instrumento: ",r.tipo_instrumento,""),e.R7$(2),e.SpI("Observaciones: ",r.observaciones,"")}}let U=(()=>{var n;class l{constructor(t,o){this.modalController=t,this.toolsService=o,this.results=[],this.herramientas=[]}ngOnInit(){this.getInformacion()}getInformacion(){var t=this;return(0,u.A)(function*(){t.toolsService.getTool().subscribe({next:o=>{t.detallesUsuario.herramientas.forEach(s=>{const _=o.filter(p=>p.id==s.id);t.results.push(_[0])}),t.herramientas=t.results},error:o=>{console.error(o)}})})()}buscarHerramienta(t){var o=this;return(0,u.A)(function*(){const a=t.target.value.toString();o.results=""==a?o.herramientas:o.herramientas.filter(s=>s.capacidad.toString()==a)})()}cancel(){var t=this;return(0,u.A)(function*(){yield t.modalController.dismiss()})()}}return(n=l).\u0275fac=function(t){return new(t||n)(e.rXU(i.W3),e.rXU(k.b))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-ver-equipo"]],inputs:{detallesUsuario:"detallesUsuario"},standalone:!0,features:[e.aNF],decls:12,vars:4,consts:[[2,"--background","#757374","color","white"],["slot","end"],[3,"click"],["slot","icon-only","name","close-outline"],["showCancelButton","always","mode","ios","color","light","cancel-button-text","Borrar","placeholder","Ingresa la capacidad de la herramienta",3,"ionInput","debounce"],["mode","ios",3,"multiple"],[4,"ngFor","ngForOf"],["slot","header","color","light"],["slot","content"]],template:function(t,o){1&t&&(e.j41(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title"),e.EFF(3),e.k0s(),e.j41(4,"ion-buttons",1)(5,"ion-button",2),e.bIt("click",function(){return o.cancel()}),e.nrm(6,"ion-icon",3),e.k0s()()(),e.j41(7,"ion-toolbar",0)(8,"ion-searchbar",4),e.bIt("ionInput",function(s){return o.buscarHerramienta(s)}),e.k0s()()(),e.j41(9,"ion-content")(10,"ion-accordion-group",5),e.DNE(11,x,20,8,"ion-accordion",6),e.k0s()()),2&t&&(e.R7$(3),e.SpI(" Lista de equipos del usuario: ",o.detallesUsuario.usuario," "),e.R7$(5),e.Y8G("debounce",25),e.R7$(2),e.Y8G("multiple",!0),e.R7$(),e.Y8G("ngForOf",o.results))},dependencies:[i.bv,i.xk,i.YH,i.Jm,i.QW,i.W9,i.eU,i.iq,i.uz,i.he,i.S1,i.BC,i.ai,i.Gw,d.MD,d.Sq]}),l})();var f=m(2643),R=m(1626);let T=(()=>{var n;class l{constructor(t){this.http=t}cargarFuentes(){var t=this;return(0,u.A)(function*(){const o=yield t.http.get("assets/Font/Times/times-new-roman.ttf",{responseType:"arraybuffer"}).toPromise(),a=yield t.http.get("assets/Font/Times/times-new-roman-bold.otf",{responseType:"arraybuffer"}).toPromise(),s=yield t.http.get("assets/Font/Times/times-new-roman-italic.ttf",{responseType:"arraybuffer"}).toPromise(),_=yield t.http.get("assets/Font/Times/times-new-roman-bold-italic.ttf",{responseType:"arraybuffer"}).toPromise();f.vfs["TimesNewRoman-Regular.ttf"]=t.arrayBufferToBase64(o),f.vfs["TimesNewRoman-Bold.ttf"]=t.arrayBufferToBase64(a),f.vfs["TimesNewRoman-Italic.ttf"]=t.arrayBufferToBase64(s),f.vfs["TimesNewRoman-BoldItalic.ttf"]=t.arrayBufferToBase64(_),f.fonts={Roboto:{normal:"Roboto-Regular.ttf",bold:"Roboto-Medium.ttf",italics:"Roboto-Italic.ttf",bolditalics:"Roboto-MediumItalic.ttf"},Times:{normal:"TimesNewRoman-Regular.ttf",bold:"TimesNewRoman-Bold.ttf",italics:"TimesNewRoman-Italic.ttf",bolditalics:"TimesNewRoman-BoldItalic.ttf"}}})()}arrayBufferToBase64(t){let o="";const a=new Uint8Array(t);for(let s=0;s<a.byteLength;s++)o+=String.fromCharCode(a[s]);return btoa(o)}convertirImagenABase64(t){return new Promise((o,a)=>{const s=new Image;s.src=t,s.crossOrigin="Anonymous",s.onload=()=>{const _=document.createElement("canvas");_.width=s.width,_.height=s.height;const p=_.getContext("2d");null==p||p.drawImage(s,0,0);const h=_.toDataURL("image/png");o(h)},s.onerror=_=>a(_)})}generarJSON(){var t=this;return(0,u.A)(function*(){return yield t.convertirImagenABase64("assets/logo_bg1.png"),yield t.cargarFuentes(),f.createPdf({pageSize:"A4",pageMargins:[20,20,20,20],defaultStyle:{font:"Times"},content:[{table:{widths:["*"],body:[[{table:{widths:["*"],body:[[{table:{widths:["*"],body:[[{text:"VALE DE USO DE EQUIPO",fontSize:15,alignment:"center",bold:!0,border:[1,1,1,1],fillColor:"#FFDAB9"}]]},layout:{hLineWidth:()=>.5,vLineWidth:()=>.5,hLineColor:()=>"black",vLineColor:()=>"black"},margin:[150,10,150,0],border:[1,1,1,0]}],[{text:"Yo, ___________________________________________ recibo de la empresa \u201cSERVICIOS DE VERIFICACION SALIA Y SUAREZ S.A. DE C.V. UVIM 129, en el domicilio en c. Isabelica N\xfam. 132 col. Rinconada la Isab\xe9lica en Zacatecas Zac., la documentaci\xf3n que a continuaci\xf3n se detalla:\n\n",border:[1,0,1,0],alignment:"justify",margin:[0,15,0,0],fontSize:10}],[{table:{widths:["*","*","*","10%","*"],body:[[{text:"DESCRIPCI\xd3N DE EQUIPO",bold:!0,alignment:"center",fontSize:10},{text:"CANTIDAD",bold:!0,alignment:"center",fontSize:10},{text:"IDENTIFICACI\xd3N",bold:!0,alignment:"center",fontSize:10},{text:"",fontSize:10},{text:"OBSERVACIONES",bold:!0,alignment:"center",fontSize:10}],[{text:"Equipo A",fontSize:10,margin:[5,5,5,5]},{text:"1",fontSize:10,margin:[5,5,5,5]},{text:"ID001",fontSize:10,margin:[5,5,5,5]},{text:"",fontSize:10,margin:[5,5,5,5]},{text:"Sin observaciones",fontSize:10,margin:[5,5,5,5]}],[{text:"Equipo A",fontSize:10,margin:[5,5,5,5]},{text:"1",fontSize:10,margin:[5,5,5,5]},{text:"ID001",fontSize:10,margin:[5,5,5,5]},{text:"",fontSize:10,margin:[5,5,5,5]},{text:"Sin observaciones",fontSize:10,margin:[5,5,5,5]}],[{text:"Equipo A",fontSize:10,margin:[5,5,5,5]},{text:"1",fontSize:10,margin:[5,5,5,5]},{text:"ID001",fontSize:10,margin:[5,5,5,5]},{text:"",fontSize:10,margin:[5,5,5,5]},{text:"Sin observaciones",fontSize:10,margin:[5,5,5,5]}],[{text:"Equipo A",fontSize:10,margin:[5,5,5,5]},{text:"1",fontSize:10,margin:[5,5,5,5]},{text:"ID001",fontSize:10,margin:[5,5,5,5]},{text:"",fontSize:10,margin:[5,5,5,5]},{text:"Sin observaciones",fontSize:10,margin:[5,5,5,5]}]]},layout:{hLineWidth:()=>.5,vLineWidth:()=>.5,hLineColor:()=>"black",vLineColor:()=>"black",paddingLeft:()=>5,paddingRight:()=>5,paddingTop:()=>5,paddingBottom:()=>5},margin:[10,10,10,10],border:[1,0,1,0]}],[{text:"Misma que es necesaria para realizar mis actividades y funciones como inspector acreditado en la norma: _______________.\n    as\xed mismo; declaro que recib\xed de conformidad dicho equipo, asumiendo a partir de esta fecha la responsabilidad sobre el uso y manejo de la mismo, comprometi\xe9ndome a su buen manejo y/o uso, cuidando que cada uno de ellos; e informar cualquier incidente a las instancias correspondientes de forma inmediata.",border:[1,0,1,0],alignment:"justify",fontSize:10,margin:[0,0,0,30]}],[{margin:[0,10,0,10],text:"Zacatecas Zac. a ________ de ____________________ de 2025.",border:[1,0,1,0],alignment:"right",fontSize:10}],[{text:"Recib\xed                                                                                                              Entreg\xf3\nNombre y Firma______________________________________                  Nombre y Firma__________________________",border:[1,0,1,0],fontSize:10,margin:[0,5,0,20]}],[{text:"----------------------------------------------------------------------------------------",border:[1,0,1,0],fontSize:15,margin:[0,5,0,5],alignment:"center"}],[{text:"Pagar\xe9 Simple",border:[1,0,1,0],alignment:"center",fontSize:10,bold:!0,margin:[0,5,0,5]}],[{text:"Debo y Pagar\xe9 incondicionalmente por el presente PAGAR\xc9 a \u201cSERVICIOS DE VERIFICACI\xd3N SALI\xc1 Y SU\xc1REZ S.A. DE C.V.\u201d, en esta ciudad de Zacatecas Zac., el d\xeda: __________________________________________ , la cantidad de $_____________________. (___________________________________________________________________________) Valor recibido a mi entera conformidad. Oblig\xe1ndome a pagar para el caso de mora un inter\xe9s equivalente al ____ mensual durante todo el tiempo que permanezca insoluto, juntamente con el principal.",border:[1,0,1,0],alignment:"justify",fontSize:10,margin:[0,5,0,5]}],[{margin:[0,15,0,120],border:[1,0,1,1],columns:[{text:"Datos del Deudor:\nNombre:_____________________________________________\nDomicilio:___________________________________________\nTel\xe9fono: ___________________________________________\nFecha:______________________________________________",fontSize:10,margin:[0,5,0,5]},{table:{widths:["*"],body:[[{text:"Acepto:\n\n\n",fontSize:10,alignment:"center",border:[1,1,1,0],font:"Roboto"}],[{text:"Firma _______________________",fontSize:10,alignment:"center",border:[1,0,1,1],margin:[0,5,0,5],font:"Roboto"}]]},layout:{hLineWidth:()=>.5,vLineWidth:()=>.5,hLineColor:()=>"black",vLineColor:()=>"black"},margin:[20,10,10,0]}]}]]},layout:{hLineWidth:()=>.5,vLineWidth:()=>.5,hLineColor:()=>"black",vLineColor:()=>"black"},margin:[0,0,0,0]}]]},layout:{hLineWidth:()=>0,vLineWidth:()=>0}}],footer:[{table:{widths:["*"],body:[[{text:"FOLIO",fontSize:10,alignment:"center",bold:!0,border:[1,1,1,1]}]]},layout:{hLineWidth:()=>.5,vLineWidth:()=>.5,hLineColor:()=>"black",vLineColor:()=>"black"},margin:[470,2,50,20]}]}).open()})()}}return(n=l).\u0275fac=function(t){return new(t||n)(e.KVO(R.Qq))},n.\u0275prov=e.jDH({token:n,factory:n.\u0275fac,providedIn:"root"}),l})();var E=m(8505);function D(n,l){if(1&n){const r=e.RV6();e.qex(0),e.j41(1,"th",23),e.EFF(2),e.k0s(),e.j41(3,"td",24),e.EFF(4),e.k0s(),e.j41(5,"td",24),e.EFF(6),e.k0s(),e.j41(7,"td")(8,"ion-button",25),e.bIt("click",function(){e.eBV(r);const o=e.XpG().$implicit,a=e.XpG();return e.Njj(a.detailUser(o))}),e.EFF(9," Detalles "),e.k0s()(),e.bVm()}if(2&n){const r=e.XpG().$implicit;e.R7$(2),e.JRh(r.usuario),e.R7$(2),e.JRh(r.email),e.R7$(2),e.JRh(r.role)}}function q(n,l){if(1&n&&(e.j41(0,"tr"),e.DNE(1,D,10,3,"ng-container",22),e.k0s()),2&n){const r=l.index;e.R7$(),e.Y8G("ngIf",r<7)}}function P(n,l){if(1&n&&(e.j41(0,"span"),e.EFF(1),e.k0s()),2&n){const r=l.$implicit;e.R7$(),e.SpI("",r.placa," ")}}function G(n,l){if(1&n&&(e.qex(0),e.j41(1,"ion-item",28)(2,"ion-label",29)(3,"b"),e.EFF(4,"El usuario utiliza el auto: "),e.k0s(),e.DNE(5,P,2,1,"span",14),e.k0s()(),e.bVm()),2&n){const r=e.XpG(2);e.R7$(5),e.Y8G("ngForOf",r.usuarioDetalles.autos)}}function N(n,l){1&n&&(e.j41(0,"ion-item",28)(1,"ion-label",29)(2,"b"),e.EFF(3,"A\xfan no se han asignado un auto"),e.k0s()()())}function w(n,l){if(1&n){const r=e.RV6();e.qex(0),e.j41(1,"ion-item",32),e.bIt("click",function(){e.eBV(r);const o=e.XpG(2);return e.Njj(o.consultarEquipo())}),e.j41(2,"ion-label",29)(3,"b"),e.EFF(4),e.k0s()()(),e.bVm()}if(2&n){const r=e.XpG(2);e.R7$(4),e.SpI("Presiona aqu\xed para consultar el equipo dle usuario: ",r.usuarioDetalles.usuario,"")}}function V(n,l){1&n&&(e.j41(0,"ion-item",28)(1,"ion-label",29)(2,"b"),e.EFF(3,"A\xfan no se han asignado equipo"),e.k0s()()())}function $(n,l){1&n&&(e.qex(0),e.j41(1,"ion-item",28)(2,"ion-label",29)(3,"b"),e.EFF(4,"Conuslta el formato de equipo"),e.k0s()()(),e.bVm())}function B(n,l){if(1&n&&(e.j41(0,"ion-item",28)(1,"ion-label",29)(2,"b"),e.EFF(3),e.k0s()()()),2&n){const r=e.XpG(2);e.R7$(3),e.SpI("Debes asignar y subir el vale de equipo del usuario ",r.usuarioDetalles.usuario,"")}}function z(n,l){if(1&n){const r=e.RV6();e.j41(0,"div",6)(1,"ion-card",26)(2,"ion-card-header",8)(3,"ion-card-title",9),e.EFF(4,"Empleado: "),e.j41(5,"b"),e.EFF(6),e.k0s()()(),e.j41(7,"ion-card-content")(8,"h2",27),e.EFF(9,"Informaic\xf3n Personal"),e.k0s(),e.j41(10,"ion-list")(11,"ion-item",28)(12,"ion-label",29)(13,"b"),e.EFF(14,"Nombre:"),e.k0s(),e.EFF(15),e.k0s()(),e.j41(16,"ion-item",28)(17,"ion-label",29)(18,"b"),e.EFF(19,"Correo:"),e.k0s(),e.EFF(20),e.k0s()(),e.j41(21,"ion-item",28)(22,"ion-label",29)(23,"b"),e.EFF(24,"Tipo de usuario:"),e.k0s(),e.EFF(25),e.k0s()()(),e.j41(26,"h2",27),e.EFF(27,"Vehicuo usado"),e.k0s(),e.j41(28,"ion-list"),e.DNE(29,G,6,1,"ng-container",30)(30,N,4,0,"ng-template",null,0,e.C5r),e.k0s(),e.j41(32,"h2",27),e.EFF(33,"Equipo"),e.k0s(),e.j41(34,"ion-list"),e.DNE(35,w,5,1,"ng-container",30)(36,V,4,0,"ng-template",null,1,e.C5r),e.k0s(),e.j41(38,"h2",27),e.EFF(39,"Documentos"),e.k0s(),e.DNE(40,$,5,0,"ng-container",30)(41,B,4,1,"ng-template",null,2,e.C5r),e.j41(43,"ion-list")(44,"ion-button",31),e.bIt("click",function(){e.eBV(r);const o=e.XpG();return e.Njj(o.editUser(o.usuarioDetalles))}),e.EFF(45," Presiona aqu\xed para editar su inforamci\xf3n "),e.k0s()()()()()}if(2&n){const r=e.sdS(31),t=e.sdS(37),o=e.sdS(42),a=e.XpG();e.R7$(6),e.JRh(a.usuarioDetalles.usuario),e.R7$(9),e.SpI(" ",a.usuarioDetalles.usuario," "),e.R7$(5),e.SpI(" ",a.usuarioDetalles.email," "),e.R7$(5),e.SpI(" ",a.usuarioDetalles.role," "),e.R7$(4),e.Y8G("ngIf",a.tieneAutos(a.usuarioDetalles.autos))("ngIfElse",r),e.R7$(6),e.Y8G("ngIf",a.tieneHerramientas(a.usuarioDetalles.herramientas))("ngIfElse",t),e.R7$(5),e.Y8G("ngIf",a.tieneHerramientas(a.usuarioDetalles.herramientas))("ngIfElse",o)}}function X(n,l){if(1&n){const r=e.RV6();e.j41(0,"div",6)(1,"ion-card",26)(2,"ion-card-header",8)(3,"ion-card-title",9),e.EFF(4,"Editando al empleado: "),e.j41(5,"b"),e.EFF(6),e.k0s()()(),e.j41(7,"ion-card-content")(8,"h2",27),e.EFF(9,"Informaic\xf3n Personal"),e.k0s(),e.j41(10,"form",33),e.bIt("ngSubmit",function(){e.eBV(r);const o=e.XpG();return e.Njj(o.guardarDetallesUsuario())}),e.j41(11,"ion-list")(12,"ion-item"),e.nrm(13,"ion-input",34),e.k0s(),e.j41(14,"ion-item"),e.nrm(15,"ion-input",35),e.k0s(),e.j41(16,"ion-item")(17,"ion-select",36)(18,"ion-select-option",37),e.EFF(19,"Gerente"),e.k0s(),e.j41(20,"ion-select-option",38),e.EFF(21,"Supervisor"),e.k0s(),e.j41(22,"ion-select-option",39),e.EFF(23,"Inspector"),e.k0s(),e.j41(24,"ion-select-option",40),e.EFF(25,"Peronsal de apoyo"),e.k0s()()()(),e.j41(26,"h2",27),e.EFF(27,"Vehicuo usado"),e.k0s(),e.j41(28,"ion-list")(29,"ion-item",32),e.bIt("click",function(){e.eBV(r);const o=e.XpG();return e.Njj(o.administrarAutosUsuarios())}),e.j41(30,"ion-label",29)(31,"b"),e.EFF(32,"Da clik aqu\xed para seleccionar \xf3 eliminar su auto"),e.k0s()()()(),e.j41(33,"h2",27),e.EFF(34,"Equipo"),e.k0s(),e.j41(35,"ion-list")(36,"ion-item",41),e.bIt("click",function(){e.eBV(r);const o=e.XpG();return e.Njj(o.administrarEquipo())}),e.j41(37,"ion-label",29)(38,"b"),e.EFF(39,"Da clik aqu\xed para seleccionar \xf3 eliminar el equipo"),e.k0s()()()(),e.j41(40,"h2",27),e.EFF(41,"Documentos"),e.k0s(),e.j41(42,"ion-item",41),e.bIt("click",function(){e.eBV(r);const o=e.XpG();return e.Njj(o.funcionDePrueba())}),e.j41(43,"ion-label",29)(44,"b"),e.EFF(45,"Genera el documento"),e.k0s()()(),e.j41(46,"ion-list",42)(47,"div",43)(48,"div",6)(49,"ion-button",44),e.EFF(50," Eliminar usuario "),e.k0s()(),e.j41(51,"div",6)(52,"ion-button",45),e.EFF(53," Editar usuario "),e.k0s()()()()()()()()}if(2&n){const r=e.XpG();e.R7$(6),e.JRh(r.usuarioDetalles.usuario),e.R7$(4),e.Y8G("formGroup",r.informacionUsuario)}}const L=[{path:"",component:(()=>{var n;class l{constructor(t,o,a,s,_,p,h,Y){this.authService=t,this.modalController=o,this.alertController=a,this.loadController=s,this.toastController=_,this.autoService=p,this.formbuilder=h,this.valeService=Y,this.usuariosRegistrados=[],this.usuarioDetalles=[],this.autos=[],this.editarUsuaio=!1}ngOnInit(){this.getInformacion(),this.informacionUsuario=this.formbuilder.group({id:["",c.k0.required],usuario:["",[c.k0.required,c.k0.minLength(3)]],email:["",[c.k0.required,c.k0.email]],password:[""],role:["",[c.k0.required,c.k0.required]],autos:[[]],herramientas:[[]]})}presentToast(t,o,a){var s=this;return(0,u.A)(function*(){yield(yield s.toastController.create({message:t,duration:1500,position:o,color:a})).present()})()}getInformacion(){var t=this;return(0,u.A)(function*(){(yield t.authService.getUsers()).subscribe({next:o=>{t.usuariosRegistrados=o},error:o=>{console.error(o)}})})()}addUser(){var t=this;return(0,u.A)(function*(){(yield t.modalController.create({component:S,cssClass:"modalUsuarios"})).present()})()}detailUser(t){var o=this;return(0,u.A)(function*(){0==o.editarUsuaio?(o.usuarioDetalles=t,o.informacionUsuario.get("id").setValue(o.usuarioDetalles.id),o.informacionUsuario.get("usuario").setValue(o.usuarioDetalles.usuario),o.informacionUsuario.get("email").setValue(o.usuarioDetalles.email),o.informacionUsuario.get("role").setValue(o.usuarioDetalles.role)):o.presentToast("Se esta editando un usuario","bottom","warning")})()}editUser(t){var o=this;return(0,u.A)(function*(){0!=o.usuarioDetalles.length?o.editarUsuaio=!0:o.presentToast("Favor de seleccionar un usuario (DETALLES)","bottom","warning")})()}guardarDetallesUsuario(){var t=this;return(0,u.A)(function*(){t.editarUsuaio=!1;try{if(!t.informacionUsuario.valid)return void t.presentToast("Todos los campos son obligatorios","bottom","danger");{const o=t.informacionUsuario.get("id").value,a=t.informacionUsuario.get("usuario").value,s=t.informacionUsuario.get("role").value;t.authService.updateUserFields(o,a,s),t.getInformacion(),t.presentToast("Detalles actualizados correctamente","bottom","success")}}catch{t.presentToast("Algo ha salido mal, revisa la informaic\xf3n","bottom","danger")}})()}buscarAutoModal(){var t=this;return(0,u.A)(function*(){(yield t.modalController.create({component:C,cssClass:"modalCarSearch"})).present()})()}administrarAutosUsuarios(){var t=this;return(0,u.A)(function*(){const o=yield t.modalController.create({component:C,cssClass:"modalAutosUsuario",componentProps:{detallesUsuario:t.usuarioDetalles}});o.present(),o.onDidDismiss().then(a=>{a.data&&(t.autos=a.data)})})()}administrarEquipo(){var t=this;return(0,u.A)(function*(){(yield t.modalController.create({component:y,cssClass:"modalHerramientas",componentProps:{detallesUsuario:t.usuarioDetalles}})).present()})()}consultarEquipo(){var t=this;return(0,u.A)(function*(){(yield t.modalController.create({component:U,cssClass:"modalVerEquipo",componentProps:{detallesUsuario:t.usuarioDetalles}})).present()})()}tieneHerramientas(t){return null!=t&&0!=t.length}tieneAutos(t){return null!=t&&0!=t.length}funcionDePrueba(){this.valeService.generarJSON().then(t=>{console.log(t)})}}return(n=l).\u0275fac=function(t){return new(t||n)(e.rXU(g.u),e.rXU(i.W3),e.rXU(i.hG),e.rXU(i.Xi),e.rXU(i.K_),e.rXU(v.d),e.rXU(c.ok),e.rXU(T))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-administracion-cuentas"]],decls:32,vars:5,consts:[["elseAuto",""],["elseEquipo",""],["elseEquipoDocumentos",""],["titulo","Cuentas"],[3,"fullscreen"],[1,"row"],[1,"col-md-6"],[1,"custom-card-height-usuarios",2,"border-radius","15px"],[2,"background-color","#211F20"],[1,"text-center",2,"color","white"],["placeholder","Buscar usuario","inputmode","decimal","type","decimal","showCancelButton","always",3,"debounce"],[1,"table"],["scope","col"],["scope","col",1,"text-center"],[4,"ngFor","ngForOf"],["class","col-md-6",4,"ngIf"],["slot","fixed","vertical","bottom","horizontal","end","color","primary"],["color","primary"],["name","chevron-up-circle"],["side","top"],["color","primary",3,"click"],["name","add-circle-outline"],[4,"ngIf"],["scope","row",1,"center-elements-table","pt-3"],[1,"center-elements-table","pt-3"],["expand","block","color","primary","fill","clear","shape","round",3,"click"],[2,"border-radius","15px"],[2,"text-align","center","margin-top","2%"],["lines",""],[2,"font-size","medium"],[4,"ngIf","ngIfElse"],["color","primary","expand","block",3,"click"],["lines","","button","",3,"click"],[3,"ngSubmit","formGroup"],["label","Nombre","labelPlacement","fixed","placeholder","Ingresa el nombre","formControlName","usuario"],["label","Contrase\xf1a","labelPlacement","fixed","placeholder","********","formControlName","password"],["label","Tipo de usuario:","placeholder","Rol del usuario","label-placement","floating","formControlName","role"],["value","Gerente"],["value","Supervisor"],["value","Inspector"],["value","PA"],["button","","lines","",3,"click"],[2,"text-align","center"],["text","",1,"row"],["expand","block","color","danger","fill","clear","shape","round"],["type","submit","expand","block","color","primary","fill","clear","shape","round"]],template:function(t,o){1&t&&(e.nrm(0,"app-menu",3),e.j41(1,"ion-content",4)(2,"div",5)(3,"div",6)(4,"ion-card",7)(5,"ion-card-header",8)(6,"ion-card-title",9),e.EFF(7," LISTA DE USUARIOS "),e.k0s(),e.j41(8,"ion-card-subtitle"),e.nrm(9,"ion-searchbar",10),e.k0s()(),e.j41(10,"ion-card-content")(11,"table",11)(12,"thead")(13,"tr")(14,"th",12),e.EFF(15,"Nombre de usuario"),e.k0s(),e.j41(16,"th",12),e.EFF(17,"Correo el\xe9ctronico"),e.k0s(),e.j41(18,"th",12),e.EFF(19,"Tipo de usuario"),e.k0s(),e.j41(20,"th",13),e.EFF(21,"Acciones"),e.k0s()()(),e.j41(22,"tbody"),e.DNE(23,q,2,1,"tr",14),e.k0s()()()()(),e.DNE(24,z,46,10,"div",15)(25,X,54,2,"div",15),e.k0s(),e.j41(26,"ion-fab",16)(27,"ion-fab-button",17),e.nrm(28,"ion-icon",18),e.k0s(),e.j41(29,"ion-fab-list",19)(30,"ion-fab-button",20),e.bIt("click",function(){return o.addUser()}),e.nrm(31,"ion-icon",21),e.k0s()()()()),2&t&&(e.R7$(),e.Y8G("fullscreen",!0),e.R7$(8),e.Y8G("debounce",250),e.R7$(14),e.Y8G("ngForOf",o.usuariosRegistrados),e.R7$(),e.Y8G("ngIf",0==o.editarUsuaio),e.R7$(),e.Y8G("ngIf",1==o.editarUsuaio))},dependencies:[d.Sq,d.bT,c.qT,c.BC,c.cb,i.Jm,i.b_,i.I9,i.ME,i.HW,i.tN,i.W9,i.Q8,i.YW,i.OL,i.iq,i.$w,i.uz,i.he,i.nf,i.S1,i.Nm,i.Ip,i.Je,i.Gw,E.Z,c.j4,c.JD],styles:['@charset "UTF-8";ion-fab-button[_ngcontent-%COMP%]{--background: #b7f399;--background-activated: #87d361;--background-hover: #a3e681;--border-radius: 15px;--box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, .3), 0px 1px 3px 1px rgba(0, 0, 0, .15);--color: black}.custom-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;height:100%;min-height:240px}.row[_ngcontent-%COMP%]{display:flex}.custom-card-height-usuarios[_ngcontent-%COMP%]{height:605px;overflow-y:auto}']}),l})()}];let O=(()=>{var n;class l{}return(n=l).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[F.iI.forChild(L),F.iI]}),l})(),M=(()=>{var n;class l{}return(n=l).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[d.MD,c.YN,i.bv,O,E.Z,c.X1]}),l})()}}]);