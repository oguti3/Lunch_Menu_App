// function hitCounter () {
      // fetch("https://www.cyberruth.com/mrruth/lunchAppCounter.php?pwd=vikingLunch");

  //if (localStorage.getItem('hit') == null) {
    //localStorage.setItem('hit', "here");
    //fetch("https://www.cyberruth.com/mrruth/lunchAppCounter.php?pwd=vikingLunch");
  //}
// }

function showItems() {
  if (localStorage.getItem('totalPrice') == null || localStorage.getItem('cart') == null) {

    return;
  }
  var itemArr = localStorage.getItem('cart').split(",");
  var i = 0;
  var total = 0.0;
  var str = "";
  //alert(itemArr);
  for (i = 0; i < itemArr.length; i++) {
    var price = money.format(items[itemArr[i]][1]);
    str += items[itemArr[i]][0] + "... " + price + "<br>";
    total += items[itemArr[i]][1];
  }

  document.getElementById("cartItems").innerHTML = "<p class = 'total'>" + str + "</p>";
  document.getElementById("totalVal").innerHTML =
    "<p class = 'total'> Your total is " + money.format(localStorage.getItem('totalPrice')) + "</p>";
}


function writeItems(itemGroup) {
  //var input = document.getElementById("myInput");
  //var filter = input.value.toUpperCase();
  for (const [key, value] of Object.entries(items)) {
    if (key.substring(0, 1) == itemGroup) {
      //if(value[0].toUpperCase().indexOf(filter) == -1) {
      document.writeln("<div class ='itemBox'> <button class='button-33' role='button' onclick=addToCart('" + key + "')>" + value[0] + " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + money.format(value[1]) + "</button></div>");
      //}
    }
  }
}

function plusButtons(itemGroup) {
  //alert("In plus buttons");
  for (const [key, value] of Object.entries(items)) {
    if (key.substring(0, 1) == itemGroup) {
      document.writeln("<div class ='plusBox'> <input type='image' class = 'imageButton' src='/images/plus.png' onclick=addToCart('" + key + "')> </div>");
    }
  }
}


function subButtons(itemGroup) {
  for (const [key, value] of Object.entries(items)) {
    if (key.substring(0, 1) == itemGroup) {
      document.writeln("<div class ='minusBox'> <input type='image' class = 'imageButton' src='/images/minus.png' onclick=subtractFromCart('" + key + "')> </div>");
    }
  }
}

function writePrices(itemGroup) {
  for (const [key, value] of Object.entries(items)) {
    if (key.substring(0, 1) == itemGroup) {
      //alert(value);
      document.writeln("<div class ='priceBox'> " + value[1] + "</div>");
    }
  }
}

function deleteLastItem() {
  if (localStorage.getItem('totalPrice') == null || localStorage.getItem('totalPrice') == 0) {
    localStorage.setItem('totalPrice', JSON.stringify(new Number(0)));
    //localStorage.setItem('cart', "");
  } else {
    list = localStorage.getItem('cart').split(",");

    var lastKey = list[list.length - 1];
    var index = list.indexOf(lastKey);
    let fullPrice = JSON.parse(localStorage.getItem('totalPrice')) - items[lastKey][1];
    if (fullPrice < 0) {
      fullPrice = 0;
    }
    if (list.length > 1) {

      list.splice(index, 1);
      localStorage.setItem('cart', list);
    } else {
      resetButton();
      //alert(localStorage.getItem('cart'));
    }
    localStorage.setItem('totalPrice', fullPrice);
    //var str = localStorage.getItem('cart');
    //str = substring(0,str.length - 1);
    //var pos = str.lastIndexOf(",");
    //if (pos == -1) {
    //str = "";
    //} else {
    //str = str.substring(0, pos);
  }
  //localStorage.setItem('cart', str);
  calcTotal();
  showItems();
}

//Reset Function: set total/calculator value to 0
function resetButton() {
  //alert("hi");
  localStorage.clear();
  document.getElementById("cartItems").innerHTML = "<p class = 'total'>" + "</p>";

  //document.getElementById("cartItems").value = "";
  document.getElementById("totalVal").innerHTML = "<p class='total'> Your total is $0.00 </p>";
  showItems();
  //calcTotal();
}


// **Something to Try**
// - Put all items + info + price into a txt file, separate by some kind of ID, input info as needed (when item is clicked)
//   -> Instead of having to make a separate html file for each item
//https://www.quora.com/Can-I-create-an-app-using-HTML-CSS-and-JS

//global variable


//localStorage.setItem("hotDog", JSON.stringify({
//Insert Number(3.25)
//number: Number(1) 
//}));

// Create our number formatter.
var money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

//formatter.format(2500); /* $2,500.00 */
//function showTotal() {
//document.getElementById("totalVal").innerHTML = "Your total is " + money.format(fullPrice);
//}
function addToCart(key) {
  if (localStorage.getItem('totalPrice') == null) {
    localStorage.setItem('totalPrice', JSON.stringify(new Number(items[key][1])));
  } else {
    let fullPrice = JSON.parse(localStorage.getItem('totalPrice')) + items[key][1];
    localStorage.setItem('totalPrice', fullPrice);
  }
  if (localStorage.getItem('cart') == null) {
    localStorage.setItem('cart', key);
  } else {
    let keyList = localStorage.getItem('cart') + "," + key;
    localStorage.setItem('cart', keyList)
  }

  showItems();
  calcTotal();
  //list = localStorage.getItem('cart').split(",");
}

//Why do I have to add an item before subtracting when you switch windows and come back???
function subtractFromCart(key) {
  if (localStorage.getItem('totalPrice') == null || localStorage.getItem('totalPrice') == 0) {
    localStorage.setItem('totalPrice', JSON.stringify(new Number(0)));
  } else {
    if (localStorage.getItem('cart').includes(key)) {
      var index = list.indexOf(key);
      let fullPrice = JSON.parse(localStorage.getItem('totalPrice')) - items[key][1];
      if (fullPrice < 0) {
        fullPrice = 0;
      }
      list = localStorage.getItem('cart').split(",");
      list.splice(index, 1);
      localStorage.setItem('cart', list);

      localStorage.setItem('totalPrice', fullPrice);

      //alert(localStorage.getItem('totalPrice'));
      //alert(localStorage.getItem('cart'));
    }
  }
}

//localStorage.setItem('firstReset', 'yes');

//function resetOnRun() {
//if(localStorage.getItem('firstReset') == 'yes') {
//localStorage.setItem('firstReset', 'no');
//sessionStorage.clear();
//alert(localStorage.getItem('firstReset'));
//}
//}


function calcTotal() {
  document.getElementById("totalVal").innerHTML = "<p class= 'total'> Your total is " + money.format(localStorage.getItem('totalPrice')) + "</p>";
}


//function itemsInCart() {
 // list = localStorage.getItem('cart').split(",");
 // for(var i = 0; i <= list.length; i++) {
  //  nameList[] = 
 // }
 // alert(list.join("/n"));
 // var textarea = document.getElementById("cartItems");
 // textarea.value = list.join("\n");
//}


//function foodSearch() {
  //let input = document.getElementById('searchBar').value
  //input = input.toLowerCase();
  //let x = document.getElementsByClassName('itemBox');

  //for (i = 0; i < x.length; i++) {
    //if (!x[i].innerHTML.toLowerCase().includes(input)) {
      //x[i].style.display = "none";
    //}
    //else {
      //x[i].style.display = "list-item";
    //}
  //}
//}

//function addToTotal(item) {
   //if(sessionStorage.getItem('order') != null) {
     //const s = sessionStorage.getItem('order');
     //sessionStorage.setItem('order', s + item);
   //}
   //fullOrder = sessionStorage.getItem('order');
   //showTotal();
//}