"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4341],{6722:(U,h,d)=>{d.r(h),d.d(h,{PanelControlPageModule:()=>A});var f=d(177),n=d(4341),r=d(7604),C=d(305),m=d(467),t=d(3953),p=d(6357),b=d(1626);let F=(()=>{var i;class s{constructor(o){this.http=o,this.jsonFilePtah="assets/res/CPS_min.json"}getData(){return this.http.get(this.jsonFilePtah)}}return(i=s).\u0275fac=function(o){return new(o||i)(t.KVO(b.Qq))},i.\u0275prov=t.jDH({token:i,factory:i.\u0275fac,providedIn:"root"}),s})(),I=(()=>{var i;class s{constructor(o,e,a,c,u,g){this.modalController=o,this.fb=e,this.loadingController=a,this.alertConoller=c,this.citasService=u,this.codpos=g}get nombre_razon_social(){return this.citaInformacion.get("nombre_razon_social")}get rfc(){return this.citaInformacion.get("rfc")}get telefono(){return this.citaInformacion.get("telefono")}get fecha(){return this.citaInformacion.get("fecha")}get tipo_servicio(){return this.citaInformacion.get("tipo_servicio")}get domicilio(){return this.citaInformacion.get("domicilio")}get num(){return this.citaInformacion.get("num")}get colonia(){return this.citaInformacion.get("colonia")}get municipio(){return this.citaInformacion.get("municipio")}get estado(){return this.citaInformacion.get("estado")}get cp(){return this.citaInformacion.get("cp")}get giro(){return this.citaInformacion.get("giro")}ngOnInit(){this.getInfromacion(),this.citaInformacion=this.fb.group({nombre_razon_social:["",[n.k0.required]],rfc:["",n.k0.required],telefono:["",[n.k0.required]],fecha:["",[n.k0.required]],tipo_servicio:["",[n.k0.required]],domicilio:["",[n.k0.required]],num:["",[n.k0.required]],colonia:["",[n.k0.required]],municipio:["",[n.k0.required]],estado:["",[n.k0.required]],cp:["",[n.k0.required]],giro:["",[n.k0.required]],creado_en:[""]})}cancel(){this.modalController.dismiss(null,"cancel")}getInfromacion(){var o=this;return(0,m.A)(function*(){o.codpos.getData().subscribe({next:e=>{o.codigosPostales=e},error:e=>{console.error("Error al obtener la informaci\xf3n de c\xf3digos postales",e)}})})()}handleInput(o){const e=o.target.value;if(5===e.length){const a=this.codigosPostales.find(c=>c.d_codigo==e);console.log(a),a&&(this.citaInformacion.get("municipio").setValue(a.D_mnpio),this.citaInformacion.get("estado").setValue(a.d_estado))}}getCita(){var o=this;return(0,m.A)(function*(){const e=yield o.loadingController.create({message:"Generando cita..."});yield e.present();const a=(new Date).toLocaleString("es-MX",{timeZone:"America/Mexico_City"});o.citaInformacion.valid?(o.citaInformacion.get("creado_en").setValue(a),o.citasService.addCita(o.citaInformacion.value),yield(yield o.alertConoller.create({header:"Cita generada",message:"La cita ha sido generada exitosamente",buttons:["OK"]})).present(),o.modalController.dismiss(null,"confirm")):yield(yield o.alertConoller.create({header:"Error",message:"Todos los campos son obligatorios",buttons:["OK"]})).present(),yield e.dismiss()})()}}return(i=s).\u0275fac=function(o){return new(o||i)(t.rXU(r.W3),t.rXU(n.ok),t.rXU(r.Xi),t.rXU(r.hG),t.rXU(p.i),t.rXU(F))},i.\u0275cmp=t.VBU({type:i,selectors:[["app-agregar-cita"]],standalone:!0,features:[t.aNF],decls:81,vars:1,consts:[[2,"--background","#757374","color","white"],["slot","end"],[3,"click"],["slot","icon-only","name","close-outline"],[1,"ion-padding"],[3,"ngSubmit","formGroup"],[1,"row"],[1,"col-md-8"],[1,"form-floating","mb-3"],["type","text","id","floatingnombre_razon_social","formControlName","nombre_razon_social",1,"form-control"],["for","floatingnombre_razon_social"],[1,"col-md-4"],["type","text","id","floatingrfc","formControlName","rfc",1,"form-control"],["for","floatingrfc"],["type","text","id","floatingtelefono","formControlName","telefono",1,"form-control"],["for","floatingtelefono"],["type","text","id","floatingInputfecha","formControlName","fecha",1,"form-control"],["for","floatingInputfecha"],["type","text","id","floatingInputtipo_servicio","formControlName","tipo_servicio",1,"form-control"],["for","floatingInputtipo_servicio"],[1,"col-md-6"],["type","number","id","floatingInputcp","formControlName","cp",1,"form-control",3,"input"],["for","floatingInputcp"],["type","text","id","floatingInputgiro","formControlName","giro",1,"form-control"],["for","floatingInputgiro"],[1,"col-md-5"],["type","text","id","floatingInputdomicilio","formControlName","domicilio",1,"form-control"],["for","floatingInputdomicilio"],[1,"col-md-2"],["type","number","id","floatingInputnum","formControlName","num",1,"form-control"],["for","floatingInputnum"],["type","text","id","floatingInputcolonia","formControlName","colonia",1,"form-control"],["for","floatingInputcolonia"],["type","text","id","floatingInputmunicipio","formControlName","municipio",1,"form-control"],["for","floatingInputmunicipio"],["type","text","id","floatingInputestado","formControlName","estado",1,"form-control"],["for","floatingInputestado"],[1,"row","text-center"],[1,"col-md-6","d-grid","gap-2"],[1,"btn","btn-secondary","btn-lg","mt-3"],["type","submit",1,"btn","btn-success","mt-3","btn-lg"]],template:function(o,e){1&o&&(t.j41(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title"),t.EFF(3," Agrega una nueva cita "),t.k0s(),t.j41(4,"ion-buttons",1)(5,"ion-button",2),t.bIt("click",function(){return e.cancel()}),t.nrm(6,"ion-icon",3),t.k0s()()()(),t.j41(7,"ion-content",4)(8,"form",5),t.bIt("ngSubmit",function(){return e.getCita()}),t.j41(9,"div",6)(10,"div",7)(11,"div",8),t.nrm(12,"input",9),t.j41(13,"label",10),t.EFF(14,"Raz\xf3n Social y/o Nombre"),t.k0s()()(),t.j41(15,"div",11)(16,"div",8),t.nrm(17,"input",12),t.j41(18,"label",13),t.EFF(19,"R.F.C."),t.k0s()()()(),t.j41(20,"div",6)(21,"div",11)(22,"div",8),t.nrm(23,"input",14),t.j41(24,"label",15),t.EFF(25,"Tel\xe9fono"),t.k0s()()(),t.j41(26,"div",11)(27,"div",8),t.nrm(28,"input",16),t.j41(29,"label",17),t.EFF(30,"Fecha"),t.k0s()()(),t.j41(31,"div",11)(32,"div",8),t.nrm(33,"input",18),t.j41(34,"label",19),t.EFF(35,"Tipo de servicio"),t.k0s()()()(),t.j41(36,"div",6)(37,"div",20)(38,"div",8)(39,"input",21),t.bIt("input",function(c){return e.handleInput(c)}),t.k0s(),t.j41(40,"label",22),t.EFF(41,"C\xf3digo postal"),t.k0s()()(),t.j41(42,"div",20)(43,"div",8),t.nrm(44,"input",23),t.j41(45,"label",24),t.EFF(46,"Giro empresarial"),t.k0s()()()(),t.j41(47,"div",6)(48,"div",25)(49,"div",8),t.nrm(50,"input",26),t.j41(51,"label",27),t.EFF(52,"Domicilio"),t.k0s()()(),t.j41(53,"div",28)(54,"div",8),t.nrm(55,"input",29),t.j41(56,"label",30),t.EFF(57,"# Num"),t.k0s()()(),t.j41(58,"div",25)(59,"div",8),t.nrm(60,"input",31),t.j41(61,"label",32),t.EFF(62,"Colonia"),t.k0s()()()(),t.j41(63,"div",6)(64,"div",20)(65,"div",8),t.nrm(66,"input",33),t.j41(67,"label",34),t.EFF(68,"Municipio"),t.k0s()()(),t.j41(69,"div",20)(70,"div",8),t.nrm(71,"input",35),t.j41(72,"label",36),t.EFF(73,"Estado/Edo"),t.k0s()()()(),t.j41(74,"div",37)(75,"div",38)(76,"button",39),t.EFF(77,"Limpiar formulario"),t.k0s()(),t.j41(78,"div",38)(79,"button",40),t.EFF(80,"Agregar cita"),t.k0s()()()()()),2&o&&(t.R7$(8),t.Y8G("formGroup",e.citaInformacion))},dependencies:[r.bv,r.Jm,r.QW,r.W9,r.eU,r.iq,r.BC,r.ai,n.YN,n.qT,n.me,n.Q0,n.BC,n.cb,f.MD,n.X1,n.j4,n.JD]}),s})(),_=(()=>{var i;class s{constructor(o,e,a,c,u){this.fb=o,this.modalController=e,this.loadingController=a,this.alertConoller=c,this.citasService=u}ngOnInit(){this.citaInformacion=this.fb.group({id:[this.cita.id],nombre_razon_social:[this.cita.nombre_razon_social,[n.k0.required]],rfc:[this.cita.rfc,[n.k0.required]],telefono:[this.cita.telefono,[n.k0.required]],fecha:[this.cita.fecha,[n.k0.required]],tipo_servicio:[this.cita.tipo_servicio,[n.k0.required]],domicilio:[this.cita.domicilio,[n.k0.required]],num:[this.cita.num,[n.k0.required]],colonia:[this.cita.colonia,[n.k0.required]],municipio:[this.cita.municipio,[n.k0.required]],estado:[this.cita.estado,[n.k0.required]],cp:[this.cita.cp,[n.k0.required]],giro:[this.cita.giro,[n.k0.required]],creado_en:[this.cita.creado_en,[n.k0.required]]})}cancel(){this.modalController.dismiss(null,"cancel")}editarCita(){var o=this;return(0,m.A)(function*(){const e=yield o.loadingController.create({message:"Actualizando cita..."});yield e.present(),o.citaInformacion.valid?(o.citasService.updateCita(o.citaInformacion.value),yield(yield o.alertConoller.create({header:"Cita actualizada",message:"La cita ha sido actualizado exitosamente",buttons:["OK"]})).present(),o.modalController.dismiss(null,"confirm")):yield(yield o.alertConoller.create({header:"Error",message:"Todos los campos son obligatorios",buttons:["OK"]})).present(),yield e.dismiss()})()}eliminarCita(){var o=this;return(0,m.A)(function*(){var a;(yield o.alertConoller.create({header:"Confirmar eliminaci\xf3n",message:"\xbfEst\xe1 seguro de eliminar la cita?",buttons:[{text:"Cancelar",role:"cancel",cssClass:"secondary"},{text:"Aceptar",handler:(a=(0,m.A)(function*(){o.citasService.deleteCita(o.cita.id);const c=yield o.loadingController.create({message:"Eliminando cita..."});c.present(),o.modalController.dismiss(null,"confirm"),yield c.dismiss()}),function(){return a.apply(this,arguments)})}]})).present()})()}}return(i=s).\u0275fac=function(o){return new(o||i)(t.rXU(n.ok),t.rXU(r.W3),t.rXU(r.Xi),t.rXU(r.hG),t.rXU(p.i))},i.\u0275cmp=t.VBU({type:i,selectors:[["app-detalle-cita"]],inputs:{cita:"cita"},standalone:!0,features:[t.aNF],decls:81,vars:2,consts:[[2,"--background","#757374","color","white"],["slot","end"],[3,"click"],["slot","icon-only","name","close-outline"],[1,"ion-padding"],[3,"ngSubmit","formGroup"],[1,"row"],[1,"col-md-8"],[1,"form-floating","mb-3"],["type","text","id","floatingnombre_razon_social","formControlName","nombre_razon_social",1,"form-control"],["for","floatingnombre_razon_social"],[1,"col-md-4"],["type","text","id","floatingrfc","formControlName","rfc",1,"form-control"],["for","floatingrfc"],["type","text","id","floatingtelefono","formControlName","telefono",1,"form-control"],["for","floatingtelefono"],["type","text","id","floatingInputfecha","formControlName","fecha",1,"form-control"],["for","floatingInputfecha"],["type","text","id","floatingInputtipo_servicio","formControlName","tipo_servicio",1,"form-control"],["for","floatingInputtipo_servicio"],[1,"col-md-6"],["type","number","id","floatingInputcp","formControlName","cp",1,"form-control"],["for","floatingInputcp"],["type","text","id","floatingInputgiro","formControlName","giro",1,"form-control"],["for","floatingInputgiro"],[1,"col-md-5"],["type","text","id","floatingInputdomicilio","formControlName","domicilio",1,"form-control"],["for","floatingInputdomicilio"],[1,"col-md-2"],["type","number","id","floatingInputnum","formControlName","num",1,"form-control"],["for","floatingInputnum"],["type","text","id","floatingInputcolonia","formControlName","colonia",1,"form-control"],["for","floatingInputcolonia"],["type","text","id","floatingInputmunicipio","formControlName","municipio",1,"form-control"],["for","floatingInputmunicipio"],["type","text","id","floatingInputestado","formControlName","estado",1,"form-control"],["for","floatingInputestado"],[1,"row","text-center"],[1,"col-md-6","d-grid","gap-2"],["fill","clear",1,"btn","btn-danger","btn-lg","mt-3",3,"click"],["type","submit",1,"btn","btn-success","mt-3","btn-lg"]],template:function(o,e){1&o&&(t.j41(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title"),t.EFF(3),t.k0s(),t.j41(4,"ion-buttons",1)(5,"ion-button",2),t.bIt("click",function(){return e.cancel()}),t.nrm(6,"ion-icon",3),t.k0s()()()(),t.j41(7,"ion-content",4)(8,"form",5),t.bIt("ngSubmit",function(){return e.editarCita()}),t.j41(9,"div",6)(10,"div",7)(11,"div",8),t.nrm(12,"input",9),t.j41(13,"label",10),t.EFF(14,"Raz\xf3n Social y/o Nombre"),t.k0s()()(),t.j41(15,"div",11)(16,"div",8),t.nrm(17,"input",12),t.j41(18,"label",13),t.EFF(19,"R.F.C."),t.k0s()()()(),t.j41(20,"div",6)(21,"div",11)(22,"div",8),t.nrm(23,"input",14),t.j41(24,"label",15),t.EFF(25,"Tel\xe9fono"),t.k0s()()(),t.j41(26,"div",11)(27,"div",8),t.nrm(28,"input",16),t.j41(29,"label",17),t.EFF(30,"Fecha"),t.k0s()()(),t.j41(31,"div",11)(32,"div",8),t.nrm(33,"input",18),t.j41(34,"label",19),t.EFF(35,"Tipo de servicio"),t.k0s()()()(),t.j41(36,"div",6)(37,"div",20)(38,"div",8),t.nrm(39,"input",21),t.j41(40,"label",22),t.EFF(41,"C\xf3digo postal"),t.k0s()()(),t.j41(42,"div",20)(43,"div",8),t.nrm(44,"input",23),t.j41(45,"label",24),t.EFF(46,"Giro empresarial"),t.k0s()()()(),t.j41(47,"div",6)(48,"div",25)(49,"div",8),t.nrm(50,"input",26),t.j41(51,"label",27),t.EFF(52,"Domicilio"),t.k0s()()(),t.j41(53,"div",28)(54,"div",8),t.nrm(55,"input",29),t.j41(56,"label",30),t.EFF(57,"# Num"),t.k0s()()(),t.j41(58,"div",25)(59,"div",8),t.nrm(60,"input",31),t.j41(61,"label",32),t.EFF(62,"Colonia"),t.k0s()()()(),t.j41(63,"div",6)(64,"div",20)(65,"div",8),t.nrm(66,"input",33),t.j41(67,"label",34),t.EFF(68,"Municipio"),t.k0s()()(),t.j41(69,"div",20)(70,"div",8),t.nrm(71,"input",35),t.j41(72,"label",36),t.EFF(73,"Estado/Edo"),t.k0s()()()(),t.j41(74,"div",37)(75,"div",38)(76,"ion-button",39),t.bIt("click",function(){return e.eliminarCita()}),t.EFF(77,"Eliminar cita"),t.k0s()(),t.j41(78,"div",38)(79,"button",40),t.EFF(80,"EDITAR CITA"),t.k0s()()()()()),2&o&&(t.R7$(3),t.SpI(" Editar cita - ",e.cita.nombre_razon_social," "),t.R7$(5),t.Y8G("formGroup",e.citaInformacion))},dependencies:[r.bv,r.Jm,r.QW,r.W9,r.eU,r.iq,r.BC,r.ai,f.MD,n.YN,n.qT,n.me,n.Q0,n.BC,n.cb,n.X1,n.j4,n.JD]}),s})();var k=d(6761),j=d(5217),y=d(781),P=d(8123),v=d(8505);function E(i,s){if(1&i){const l=t.RV6();t.qex(0),t.j41(1,"th",29),t.EFF(2),t.k0s(),t.j41(3,"td",30),t.EFF(4),t.k0s(),t.j41(5,"td",30),t.EFF(6),t.k0s(),t.j41(7,"td",30),t.EFF(8),t.k0s(),t.j41(9,"td")(10,"ion-button",31),t.bIt("click",function(){t.eBV(l);const e=t.XpG().$implicit,a=t.XpG();return t.Njj(a.mostrarDetalles(e))}),t.EFF(11," Detalles "),t.k0s()(),t.bVm()}if(2&i){const l=t.XpG().$implicit;t.R7$(2),t.JRh(l.nombre_razon_social),t.R7$(2),t.JRh(l.domicilio),t.R7$(2),t.JRh(l.tipo_servicio),t.R7$(2),t.JRh(l.fecha)}}function x(i,s){if(1&i&&(t.j41(0,"tr"),t.DNE(1,E,12,4,"ng-container",28),t.k0s()),2&i){const l=s.index;t.R7$(),t.Y8G("ngIf",l<8)}}function T(i,s){if(1&i&&(t.j41(0,"li",32),t.EFF(1),t.k0s()),2&i){const l=s.$implicit;t.R7$(),t.Lme(" ",l[0]," (",l[1]," actividades) ")}}const S=[{path:"",component:(()=>{var i;class s{constructor(o,e,a,c,u,g,D,z,R){this.zone=o,this.citasService=e,this.modalController=a,this.loadingController=c,this.authService=u,this.storageService=g,this.fileService=D,this.alertController=z,this.fsubidaService=R,this.citas=[],this.results=[],this.infoClientes=[],this.topClientes=[]}ngOnInit(){setTimeout(()=>{this.initializePage()},500)}initializePage(){var o=this;return(0,m.A)(function*(){yield o.showLoadingMessage("Cargando informaci\xf3n",1700),o.getInformacion(),o.generateCharts()})()}showLoadingMessage(o,e){var a=this;return(0,m.A)(function*(){yield(yield a.loadingController.create({message:o,duration:e})).present()})()}generateCharts(){google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback(()=>{this.zone.run(()=>{this.updateTopClientes(),this.drawTopClientesPieChart()})});const o=new ResizeObserver(()=>{this.zone.run(()=>{this.drawTopClientesPieChart()})}),e=document.getElementById("chart_div_pie");e&&o.observe(e)}updateTopClientes(){!this.infoClientes||0===this.infoClientes.length||(this.topClientes=this.getTopClientesCounts(this.infoClientes))}drawTopClientesPieChart(){var o=this;return(0,m.A)(function*(){if(!o.topClientes||0===o.topClientes.length)return;const e=[["Cliente","Actividades"],...o.topClientes],a=new google.visualization.DataTable;a.addColumn("string","Cliente"),a.addColumn("number","Actividades"),a.addRows(e.slice(1)),new google.visualization.PieChart(document.getElementById("chart_div_pie")).draw(a,{title:"Top 10 Clientes Frecuentes (Gr\xe1fico de Pastel)",pieHole:.4,height:400,width:"100%"})})()}getTopClientesCounts(o){const e=o.reduce((a,c)=>{const u=c.nombre_razon_social;return a[u]=(a[u]||0)+1,a},{});return Object.entries(e).sort((a,c)=>c[1]-a[1]).slice(0,10)}getInformacion(){this.loadCitasProgramadas(),this.loadUserInfo(),this.loadClientInfo()}loadCitasProgramadas(){this.citasService.getCitaProgramada().subscribe(o=>{this.citas=o,this.results=o})}loadUserInfo(){var o=this;return(0,m.A)(function*(){(yield o.authService.getUser()).subscribe({next:e=>o.storageService.addValue("usuario",e),error:e=>console.error(e)})})()}loadClientInfo(){this.fsubidaService.getInformacion().subscribe({next:o=>{this.infoClientes=o.Sheet1||o,this.updateTopClientes()},error:o=>console.error(o)})}generarCarpeta(){var o=this;return(0,m.A)(function*(){yield(yield o.alertController.create({header:"Bienvenido a SVSYS - Administraci\xf3n",subHeader:"Descarga de informaci\xf3n",message:"Te solicitamos descargar la informaci\xf3n de la base de datos para una experiencia \xf3ptima.",buttons:[{text:"En otro momento",role:"cancel"},{text:"\xa1Descargar!",role:"confirm",handler:()=>o.fileService.createCarpeta("svsys-directorio")}]})).present()})()}addCita(){var o=this;return(0,m.A)(function*(){yield(yield o.modalController.create({component:I,cssClass:"modalCitas"})).present()})()}handleInput(o){const e=o.target.value.toLowerCase();this.results=this.citas.filter(a=>a.nombre_razon_social.toLowerCase().includes(e))}mostrarDetalles(o){var e=this;return(0,m.A)(function*(){yield(yield e.modalController.create({component:_,componentProps:{cita:o},cssClass:"modalCitas"})).present()})()}}return(i=s).\u0275fac=function(o){return new(o||i)(t.rXU(t.SKi),t.rXU(p.i),t.rXU(r.W3),t.rXU(r.Xi),t.rXU(k.u),t.rXU(j.n),t.rXU(y.F),t.rXU(r.hG),t.rXU(P.i))},i.\u0275cmp=t.VBU({type:i,selectors:[["app-panel-control"]],decls:52,vars:4,consts:[["titulo","Panel de control"],[3,"fullscreen"],[2,"padding","1%"],["size","12","size-sm","12"],[1,"custom-card-height-cliente",2,"border-radius","15px"],[2,"background-color","#211F20"],[1,"text-center",2,"color","white"],["showCancelButton","always","mode","ios","color","light","cancel-button-text","Borrar","placeholder","Busca un equipo",3,"ionInput","debounce"],[1,"table-responsive","dispositivos-busqueda"],[1,"table","table-striped"],["scope","col"],["scope","col",1,"text-center"],[4,"ngFor","ngForOf"],[2,"border-radius","15px"],[1,"text-center",2,"background-color","#211F20"],[2,"color","white"],[1,"row"],[1,"col-md-6"],[2,"text-align","center","margin-top","1%"],[2,"margin-top","5%"],["style","font-size: medium; margin-bottom: 2%;",4,"ngFor","ngForOf"],["id","chart_div_pie"],["slot","fixed","vertical","bottom","horizontal","end","color","primary"],["color","primary"],["name","chevron-up-circle"],["side","top"],["color","primary",3,"click"],["name","add-circle-outline"],[4,"ngIf"],["scope","row",1,"center-elements-table"],[1,"center-elements-table"],["expand","block","color","primary","fill","clear","shape","round",3,"click"],[2,"font-size","medium","margin-bottom","2%"]],template:function(o,e){1&o&&(t.nrm(0,"app-menu",0),t.j41(1,"ion-content",1)(2,"ion-grid",2)(3,"ion-row")(4,"ion-col",3)(5,"ion-card",4)(6,"ion-card-header",5)(7,"ion-card-title",6),t.EFF(8," CITAS PROGRAMADAS "),t.k0s(),t.j41(9,"ion-card-subtitle")(10,"ion-searchbar",7),t.bIt("ionInput",function(c){return e.handleInput(c)}),t.k0s()()(),t.j41(11,"ion-card-content")(12,"div",8)(13,"table",9)(14,"thead")(15,"tr")(16,"th",10),t.EFF(17,"Nombre / Raz\xf3n Social"),t.k0s(),t.j41(18,"th",10),t.EFF(19,"Domicilio"),t.k0s(),t.j41(20,"th",10),t.EFF(21,"Tipo de servicio"),t.k0s(),t.j41(22,"th",10),t.EFF(23,"Fecha"),t.k0s(),t.j41(24,"th",11),t.EFF(25,"Administraci\xf3n"),t.k0s()()(),t.j41(26,"tbody"),t.DNE(27,x,2,1,"tr",12),t.k0s()()()()()(),t.j41(28,"ion-col",3)(29,"ion-card",13)(30,"ion-card-header",14)(31,"ion-card-title",15),t.EFF(32,"ESTADISTICAS"),t.k0s()(),t.j41(33,"ion-grid")(34,"div",16)(35,"div",17)(36,"div")(37,"h5",18),t.EFF(38,"Clientes frecuentes (Top 10)"),t.k0s(),t.j41(39,"ol",19),t.DNE(40,T,2,2,"li",20),t.k0s()()(),t.j41(41,"div",17)(42,"div")(43,"h5",18),t.EFF(44,"Clientes Frecuentes (Gr\xe1fico de Pastel)"),t.k0s()(),t.nrm(45,"div",21),t.k0s()()()()()()(),t.j41(46,"ion-fab",22)(47,"ion-fab-button",23),t.nrm(48,"ion-icon",24),t.k0s(),t.j41(49,"ion-fab-list",25)(50,"ion-fab-button",26),t.bIt("click",function(){return e.addCita()}),t.nrm(51,"ion-icon",27),t.k0s()()()()),2&o&&(t.R7$(),t.Y8G("fullscreen",!0),t.R7$(9),t.Y8G("debounce",250),t.R7$(17),t.Y8G("ngForOf",e.results),t.R7$(13),t.Y8G("ngForOf",e.topClientes))},dependencies:[f.Sq,f.bT,r.Jm,r.b_,r.I9,r.ME,r.HW,r.tN,r.hU,r.W9,r.Q8,r.YW,r.OL,r.lO,r.iq,r.ln,r.S1,r.Gw,v.Z],styles:['@charset "UTF-8";#chart_div[_ngcontent-%COMP%]{width:100%;height:100%}.chart-container[_ngcontent-%COMP%]{height:300px}ion-fab-button[_ngcontent-%COMP%]{--background: #b7f399;--background-activated: #87d361;--background-hover: #a3e681;--border-radius: 15px;--box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, .3), 0px 1px 3px 1px rgba(0, 0, 0, .15);--color: black}.center-elements-table[_ngcontent-%COMP%]{padding-top:1.2%}ion-content[_ngcontent-%COMP%]::part(background){background:#ebebeb}ion-card[_ngcontent-%COMP%]{border-radius:0}']}),s})()}];let N=(()=>{var i;class s{}return(i=s).\u0275fac=function(o){return new(o||i)},i.\u0275mod=t.$C({type:i}),i.\u0275inj=t.G2t({imports:[C.iI.forChild(S),C.iI]}),s})(),A=(()=>{var i;class s{}return(i=s).\u0275fac=function(o){return new(o||i)},i.\u0275mod=t.$C({type:i}),i.\u0275inj=t.G2t({imports:[f.MD,n.YN,r.bv,N,v.Z]}),s})()}}]);