(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(38)},18:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(11),l=n.n(u),c=(n(18),n(2)),o=function(e){var t=e.person,n=e.deleteHandler;return r.a.createElement("tr",null,r.a.createElement("td",null,t.name),r.a.createElement("td",null,t.number),r.a.createElement("td",null,r.a.createElement("button",{onClick:function(){return n(t)}},"poista")))},i=function(e){return r.a.createElement("table",null,r.a.createElement("tbody",null,e.persons.map(function(t){return r.a.createElement(o,{key:t.name,person:t,deleteHandler:e.deleteHandler})})))},m=function(e){var t=e.formAction,n=e.nameState,a=e.numberState,u=e.nameHandler,l=e.numberHandler;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"nimi:",r.a.createElement("input",{value:n,onChange:u})),r.a.createElement("div",null,"numero:",r.a.createElement("input",{value:a,onChange:l})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},f=function(e){return r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4",r.a.createElement("input",{value:e.filter,onChange:e.handler}))},s=function(e){var t=e.message,n=e.isError;return null===t?null:r.a.createElement("div",{className:n?"error notification":"notification"},t)},d=n(3),E=n.n(d),p="/api/persons",v=function(){return E.a.get(p)},b=function(e){return E.a.post(p,e)},h=function(e,t){return E.a.put("".concat(p,"/").concat(e),t)},j=function(e){return E.a.delete("".concat(p,"/").concat(e))},O=function(){var e=Object(a.useState)([]),t=Object(c.a)(e,2),n=t[0],u=t[1],l=Object(a.useState)(""),o=Object(c.a)(l,2),d=o[0],E=o[1],p=Object(a.useState)(""),O=Object(c.a)(p,2),w=O[0],g=O[1],S=Object(a.useState)(""),H=Object(c.a)(S,2),k=H[0],y=H[1],C=Object(a.useState)(null),T=Object(c.a)(C,2),L=T[0],N=T[1],P=Object(a.useState)(!1),A=Object(c.a)(P,2),J=A[0],x=A[1];Object(a.useEffect)(function(){v().then(function(e){u(e.data)})},[]);var B=k?n.filter(function(e){return e.name.toLowerCase().includes(k)}):n;return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(s,{message:L,isError:J}),r.a.createElement(f,{filter:k,handler:function(e){y(e.target.value.toLowerCase())}}),r.a.createElement("h3",null,"lis\xe4\xe4 uusi"),r.a.createElement(m,{formAction:function(e){e.preventDefault();var t={name:d,number:w},a=n.filter(function(e){return e.name===d});if(0===a.length)b(t).then(function(e){u(n.concat(e.data)),E(""),g(""),N("Lis\xe4ttiin ".concat(e.data.name,".")),x(!1),setTimeout(function(){N(null)},5e3)}).catch(function(e){N("Numeron lis\xe4ys ep\xe4onnistui: ".concat(e.response.data.error)),x(!0),setTimeout(function(){N(null)},5e3)});else{var r="".concat(d," on jo luettelossa, korvataanko vanha numero uudella?");if(window.confirm(r)){var l=a[0].id;h(l,t).then(function(e){u(n.map(function(t){return t.id!==l?t:e.data})),E(""),g("")}).catch(function(e){N("".concat(d," oli jo poistettu palvelimelta.")),x(!0),setTimeout(function(){N(null)},5e3),u(n.filter(function(e){return e.id!==l}))})}}},nameState:d,numberState:w,nameHandler:function(e){E(e.target.value)},numberHandler:function(e){g(e.target.value)}}),r.a.createElement("h3",null,"Numerot"),r.a.createElement(i,{persons:B,deleteHandler:function(e){if(window.confirm("Poistetaanko ".concat(e.name,"?"))){var t=n.filter(function(t){return t.id!==e.id});j(e.id).then(function(){u(t),N("Poistettiin ".concat(e.name,".")),x(!1),setTimeout(function(){N(null)},5e3)}).catch(function(n){N("".concat(e.name," oli jo poistettu palvelimelta.")),x(!0),setTimeout(function(){N(null)},5e3),u(t)})}}}))};l.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.84074351.chunk.js.map