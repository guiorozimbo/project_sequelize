function showData(data){
  const list = document.querySelector("#fill_list")
  data.map((item) => {
      const li = document.createElement("li")
      li.setAttribute("id", item.idProducts)
      li.innerHTML = "Nome do produto: " + item.productName + "<br>"
      + " Quantidade: " + item.stock + "<br>"
      + " Valor R$" + item.amount + "<br><br>"
      list.appendChild(li)
  })
}

function fetchApiData(){
  fetch ("http://localhost:3333/products")
  .then((response) => response.json())
  .then((data) => showData(data))
  .catch(error=>console.log(error))
}

const btnGet = document.getElementById("btnGet")
btnGet.onclick = () => fetchApiData()