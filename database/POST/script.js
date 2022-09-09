/*function moeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e) {
  len = objTextBox.value.length;

  for(i = 0; i < len; i++){
      if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
  }
  aux = '';
  
  for(; i < len; i++){
      if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);
  }
  aux += key;
  len = aux.length;
  
  if (len == 0) objTextBox.value = '';
  if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '00' + aux;
  if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + '0' +aux;
  
  if (len > 2) {
      aux2 = '';
      for (j = 0, i = len - 3; i >= 0; i--) {
          if (j == 3) {
              aux2 += SeparadorMilesimo;
              j = 0;
          }
          aux2 += aux.charAt(i);
          j++;
      }
      objTextBox.value = '';
      len2 = aux2.length;
      for (i = len2 - 1; i >= 0; i--){
          objTextBox.value += aux2.charAt(i);
      }
      objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
      
     [b] // VERIFICA O TAMANHO DO CAMPO PARA REFORMATAR COM A CASA DECIMAL COM 3 DIGITOS[/b]
      if (aux.length == 4)
          objTextBox.value = aux.substr(0, 1) + SeparadorDecimal +  aux.substr(len - 3, len);
      else if (aux.length == 5)
          objTextBox.value = aux.substr(0, 2) + SeparadorDecimal +  aux.substr(len - 3, 3);
      else if (aux.length == 6)
          objTextBox.value = aux.substr(0, 3) + SeparadorDecimal +  aux.substr(len - 3, len);
      else if (aux.length == 7)
          objTextBox.value = aux.substr(0, 1) + SeparadorDecimal +  aux.substr(len - 6, 3)+ SeparadorDecimal +  aux.substr(len - 3, 3);
      else if (aux.length == 8)
          objTextBox.value = aux.substr(0, 2) + SeparadorDecimal +  aux.substr(len - 6, 3)+ SeparadorDecimal +  aux.substr(len - 3, 3);
      else if (aux.length == 9)
          objTextBox.value = aux.substr(0, 3) + SeparadorDecimal +  aux.substr(len - 6, 3)+ SeparadorDecimal +  aux.substr(len - 4, 3);
  }
  
  return false;
}*/

function post(url,body,header){
  fetch(url,
      {
          method: "POST",
          headers: header,//{"Content-type": "application/json;charset=UTF-8"}
          body: JSON.stringify(body),
      }
  )
  // Tratamento do sucesso
  .then((response) => response.json())  // converter para json
  .then((body) => console.log("Success:", body))//imprimir dados no console
  .catch((err) => console.log('Erro de solicitação', err));
}

function createProduct(){
  
  const url = "http://localhost:3333/product";
  const productName = document.getElementById("product").value
  const stock = document.getElementById("stock").value
  const amount = document.getElementById("amount",Intl.NumberFormat,'pt-br', {style: 'currency', currency: 'BRL'}).format(amount).value

  const body = {
      "productName" : productName,
      "stock" : stock,
      "amount" : amount
  }
  const header = {
      "Content-Type": "application/json"
  }
  post(url,body,header)
}