let food = [];
let totalAmount = 0;

$(document).ready(function () {
  if ($(document).width() <= 992) {
    $(".navbar-nav").removeClass("ml-auto");
    $(".navbar-nav").addClass("mr-auto");
  } else {
    $(".navbar-nav").removeClass("mr-auto");
    $(".navbar-nav").addClass("ml-auto");
  }

  var scrollToTopBtn = $("#scrollToTop");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      scrollToTopBtn.addClass("show");
    } else {
      scrollToTopBtn.removeClass("show");
    }
  });

  scrollToTopBtn.on("click", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      "500"
    );
  });

  $(".navbar a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // console.log(this);
      // console.log(this.hash);
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });

  $(".homeBtn").click(function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      let hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    }
  });

  $(".product-box-layout4").click(function () {
    $(this)
      .toggleClass("productClicked")
      .parent()
      .siblings("div")
      .children()
      .removeClass("productClicked");
    if ($(this)[0].className.search("momos productClicked") > -1) {
      $("#momos").show().siblings("div").hide();

      $("html, body").animate(
        {
          scrollTop: $("#momos").offset().top,
        },
        800,
        function () {}
      );
    } else if ($(this)[0].className.search("chinese productClicked") > -1) {
      $("#chinese").show().siblings("div").hide();

      $("html, body").animate(
        {
          scrollTop: $("#chinese").offset().top,
        },
        800,
        function () {}
      );
    } else if ($(this)[0].className.search("beverages productClicked") > -1) {
      $("#beverages").show().siblings("div").hide();

      $("html, body").animate(
        {
          scrollTop: $("#beverages").offset().top,
        },
        800,
        function () {}
      );
    } else if ($(this)[0].className.search("soups productClicked") > -1) {
      $("#soups").show().siblings("div").hide();

      $("html, body").animate(
        {
          scrollTop: $("#soups").offset().top,
        },
        800,
        function () {}
      );
    } else if ($(this)[0].className.search("starters productClicked") > -1) {
      $("#starters").show().siblings("div").hide();

      $("html, body").animate(
        {
          scrollTop: $("#starters").offset().top,
        },
        800,
        function () {}
      );
    } else if ($(this)[0].className.search("italian productClicked") > -1) {
      $("#italian").show().siblings("div").hide();

      $("html, body").animate(
        {
          scrollTop: $("#italian").offset().top,
        },
        800,
        function () {}
      );
    }
  });

  $(".menuBtn").click(function () {
    console.log("hello");
    let quantity = $(this).siblings(".quantity");
    let foodNameClicked = quantity
      .parent()
      .siblings("div")
      .children()
      .first()
      .text()
      .trim();
    let singleFoodAmount = Number(
      quantity.parent().siblings("div").children().last().text()
    );
    let isVeg = quantity
      .parent()
      .siblings("div")
      .children()
      .first()
      .children()
      .first()
      .children()
      .hasClass("vegIcon");

    let count = Number(quantity.text());
    if ($(this)[0].className.search("plus") > -1) {
      count = count + 1;
      quantity.text(count);
      ToCart(foodNameClicked, count, isVeg, singleFoodAmount);
    } else if ($(this)[0].className.search("minus") > -1) {
      if (count <= 0) {
        quantity.text(0);
      } else {
        count = count - 1;
        quantity.text(count);
        ToCart(foodNameClicked, count, isVeg, singleFoodAmount);
      }
    }
  });
});

function updateQuantity(w, item, totalAmount) {
  if (w == "minus") {
    food[item][1] = food[item][1] - 1;
    // console.log(totalAmount)
    // totalAmount = totalAmount - food[item][2];
    // console.log(totalAmount)
  } else if (w == "add") {
    food[item][1] = food[item][1] + 1;
    // totalAmount = totalAmount + food[item][2];
  }
  // console.log(food);
  // document.getElementById("q"+item).innerText=food[item][1];
  // document.getElementById("a"+item).innerText="Rs"+food[item][1]*food[item][2];
  // console.log(totalAmount)
  // document.getElementById("tm").innerHTML = '<span class="totalAmountText">TOTAL AMOUNT : </span><br/>' +'<i class="fas fa-rupee-sign"></i> ' + totalAmount ;
  ToCart(food[item][0], food[item][1], food[item][3], food[item][2]);
  if (food[item][1] == 0) {
    food.pop(item);
  }
  console.log(food);
}

function ToCart(foodNameClicked, foodQuantity, isVeg, singleFoodAmount) {
  let foodAlreadyThere = false;
  let foodPos;
  let node;
  if (isVeg) {
    node = '';
  } else {
    node = '';
  }
  for (var i = 0; i < food.length; i++) {
    if (food[i][0] === foodNameClicked) {
      foodAlreadyThere = true;
      foodPos = i;
      break;
    } else {
      foodAlreadyThere = false;
    }
  }

  if (foodAlreadyThere) {
    food.splice(foodPos, 1);
    food.push([foodNameClicked, foodQuantity, singleFoodAmount, node]);
  } else {
    food.push([foodNameClicked, foodQuantity, singleFoodAmount, node]);
  }
  // Remove Food items with quantity = 0
  for (var i = 0; i < food.length; i++) {
    if (food[i][1] === 0) {
      food.splice(i, 1);
    }
  }

  if (food.length !== 0) {
    $(".shoppingCart").addClass("shoppingCartWithItems");

    $(".cartContentDiv").empty();
    for (var i = 0; i < food.length; i++) {
      let cartTxt =
        '<div class="row cartContentRow"><div class="col-10"><div style="display:flex;"><p>' +
        food[i][0] +
        '</p> <p class="text-muted-small">' +
        food[i][3] +
        '<p></div><i class="fas fa-rupee-sign"> ' +
        food[i][2] +
        '</i></p>  </div>  <div class="col-2"> <p class="text-muted-small" id="a' +
        i +
        '"> <i class="fas fa-rupee-sign"></i> ' +
        food[i][1] * food[i][2] +
        '</p><div class="col-3 addCol"><span onClick=updateQuantity("minus",' +
        i +
        "," +
        totalAmount +
        ') class="menuBtn minus"><i class="fas fa-minus"></i></span><span id="q' +
        i +
        '" class="quantity">' +
        food[i][1] +
        '</span><span onClick=onClick=updateQuantity("add",' +
        i +
        "," +
        totalAmount +
        ') class="updateQuantity plus"><i class="fas fa-plus"></i></span></div>';
      '</p>  <span class="cartQuantity"> <i class="fas fa-minus">' + food[i][1];
      ('</span> </div>  </div> <hr class="cartHr">');
      $(".cartContentDiv").append(cartTxt);
    }
  } else {
    $(".shoppingCart").removeClass("shoppingCartWithItems");

    $(".cartContentDiv").empty();
    $(".cartContentDiv").append(
      '<h1 class="text-muted">Your Cart is Empty</h1>'
    );
  }

  $(".shoppingCartAfter").text(food.length);

  if (food.length === 0) {
    totalAmount = 0;
  } else {
    totalAmount = totalAmount + singleFoodAmount;
  }

  $(".totalAmountDiv").empty();
  $(".totalAmountDiv").append(
    '<span id="tm"><span class="totalAmountText">TOTAL AMOUNT : </span><br/>' +
      '<i class="fas fa-rupee-sign"></i> ' +
      totalAmount +
      "</span>"
  );

  var total = 0;
  items = food;
  for (var i = 0; i < items.length; i++) {
    total += items[i][1] * items[i][2];
  }
  localStorage.setItem("total", total);
  document.getElementById("total").innerHTML = total;
}

function openWhatsapp() {
  // console.log($('#address'));

  if ($("#address")[0].value === "") {
    alert("Please Enter Address");
    return;
  } else {
    let total = 0;
    let address = $("#address")[0].value;
    let note = $("#note")[0].value;
    let wTxt = "*name*               *quantity* \n";

    for (var i = 0; i < food.length; i++) {
      let name = food[i][0];
      let quantity = food[i][1];
      total = total + food[i][1] * food[i][2];
      wTxt = wTxt + name + "      " + quantity + "  \n";
    }

    if ($("#note")[0].value === "") {
      wTxt =
        wTxt + "\n *Total Bill: " + total + "*" + "\n\n Address: " + address;
    } else {
      wTxt =
        wTxt +
        "\n *Total Bill: " +
        total +
        "*" +
        "\n\n Address: " +
        address +
        "\n Note: " +
        note;
    }
    let wTxtEncoded = encodeURI(wTxt);
    window.open("https://wa.me/917428789065?text=" + wTxtEncoded);
  }
}

// const btn = document.querySelector(".talk");
// const content = document.querySelector(".content");

function speak(sentence) {
  const text_speak = new SpeechSynthesisUtterance(sentence);

  text_speak.rate = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

// function wishMe() {
//   var day = new Date();
//   var hr = day.getHours();

//   if (hr >= 0 && hr < 12) {
//     speak("Good Morning ");
//   } else if (hr == 12) {
//     speak("Good noon ");
//   } else if (hr > 12 && hr <= 17) {
//     speak("Good Afternoon ");
//   } else {
//     speak("Good Evening ");
//   }
// }

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// recognition.onresult = (event) => {
//   const current = event.resultIndex;
//   const transcript = event.results[current][0].transcript;
//   content.textContent = transcript;
//   speakThis(transcript.toLowerCase());
// };

// btn.addEventListener("click", () => {
//   recognition.start();
// });

// function speakThis(message) {
//   const speech = new SpeechSynthesisUtterance();

//   speech.text = "I did not understand what you said please try again";
//   // alert(m)
//   if (
//     message.includes("hey") ||
//     message.includes("hello") ||
//     message.includes("hi")
//   ) {
//     const finalText =
//       "Hello, Which diet would you like to order from? Vegetarian or Non Vegetarian?";
//     speech.text = finalText;
//   } else if (message.includes("vegetarian")) {
//     const finalText =
//       "What course are you choosing? Rice, Noodles, Snacks, Beverages?";
//     speech.text = finalText;
//   } else if (message.includes("Rice")) {
//     const finalText = "We serve Fried Rice, Paneer Rice";

//     speech.text = finalText;
//   } else if (message.includes("fried rice")) {
//     const finalText = "Fried rice added to cart. How many do you require";
//     const foodNameClicked = "Fried Rice";
//     const count = 1;
//     const isVeg = true;
//     const singleFoodAmount = 120;
//     ToCart(foodNameClicked, count, isVeg, singleFoodAmount);
//     speech.text = finalText;
//     window.speechSynthesis.speak(speech);
//     let number = prompt("Enter Quantity");
//     ToCart(foodNameClicked, number, isVeg, singleFoodAmount);

//     speech.text = "Do you need anything else ?";
//   } else if (message.includes("Noodles")) {
//     const finalText = "We serve Hakka and Chowmein";
//     speech.text = finalText;
//   } else if (message.includes("hakka")) {
//     const finalText = "Hakka Noodles added to cart. How many do you require";
//     const foodNameClicked = "Hakka Noodles";
//     const count = 1;
//     const isVeg = true;
//     const singleFoodAmount = 145;
//     ToCart(foodNameClicked, count, isVeg, singleFoodAmount);
//     speech.text = finalText;
//     window.speechSynthesis.speak(speech);
//     let number = prompt("Enter Quantity");
//     ToCart(foodNameClicked, number, isVeg, singleFoodAmount);

//     speech.text = "Do you need anything else ?";
//   } else if (message.includes("open google")) {
//     window.open("https://google.com", "_blank");
//     const finalText = "Opening Google";
//     speech.text = finalText;
//   } else if (message.includes("open instagram")) {
//     window.open("https://instagram.com", "_blank");
//     const finalText = "Opening instagram";
//     speech.text = finalText;
//   } else if (
//     message.includes("what is") ||
//     message.includes("who is") ||
//     message.includes("what are")
//   ) {
//     window.open(
//       `https://www.google.com/search?q=${message.replace(" ", "+")}`,
//       "_blank"
//     );
//     const finalText = "This is what i found on internet regarding " + message;
//     speech.text = finalText;
//   } else if (message.includes("wikipedia")) {
//     window.open(
//       `https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`,
//       "_blank"
//     );
//     const finalText = "This is what i found on wikipedia regarding " + message;
//     speech.text = finalText;
//   } else if (message.includes("time")) {
//     const time = new Date().toLocaleString(undefined, {
//       hour: "numeric",
//       minute: "numeric",
//     });
//     const finalText = time;
//     speech.text = finalText;
//   } else if (message.includes("date")) {
//     const date = new Date().toLocaleString(undefined, {
//       month: "short",
//       day: "numeric",
//     });
//     const finalText = date;
//     speech.text = finalText;
//   } else if (message.includes("calculator")) {
//     window.open("Calculator:///");
//     const finalText = "Opening Calculator";
//     speech.text = finalText;
//   } else {
//     window.open(
//       `https://www.google.com/search?q=${message.replace(" ", "+")}`,
//       "_blank"
//     );
//     const finalText = "I found some information for " + message + " on google";
//     speech.text = finalText;
//   }

//   speech.volume = 1;
//   speech.pitch = 6000;
//   speech.rate = 1;

//   window.speechSynthesis.speak(speech);
// }


var recognition;
var synthesis;
var isRecording = false;  // State variable to keep track of recording status

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.interimResults = true;
  recognition.lang = "en-US";
} else {
  console.error("Speech recognition is not supported in this browser.");
}

if ("speechSynthesis" in window) {
  synthesis = window.speechSynthesis;
} else {
  console.error("Speech synthesis is not supported in this browser.");
}

const startRecordBtn = document.getElementById("start-record-btn");
const imgElem = startRecordBtn.querySelector("img");

startRecordBtn.addEventListener("click", () => {
  if (recognition) {
    if (!isRecording) {
      recognition.start();
      imgElem.style.filter = "invert(0.6)";
      imgElem.style.transform = "scale(1.2)";
      isRecording = true;
    } else {
      recognition.stop();
      imgElem.style.filter = "invert(1)";
      imgElem.style.transform = "scale(1)";
      isRecording = false;
    }
  }
});


recognition.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  //content.textContent = transcript;
  // const last = event.results.length - 1;
  // const text = event.results[last][0].transcript.toLowerCase();
  console.log(transcript.toLowerCase());
  document.getElementById("response").innerHTML=`user:${transcript.toLowerCase()}`;
  updateOrder(transcript.toLowerCase());
  // if (!isRecording) {
    
    
    
  //   if (synthesis) {
  //     const utterance = new SpeechSynthesisUtterance(text);
  //     synthesis.speak(utterance);
  //   }
  // }
};

let menu = [
  { item: "Veggie Momo", cost: 150, type: "Momo" },
  { item: "Paneer Momo", cost: 180, type: "Momo" },
  { item: "Corn and Cheese Momo", cost: 200, type: "Momo" },
  { item: "Fish Momo", cost: 220, type: "Momo" },
  { item: "Veggie Fried Momo", cost: 120, type: "Momo" },
  { item: "Paneer Fried Momo", cost: 150, type: "Momo" },
  { item: "Mushroom Fried Momo", cost: 140, type: "Momo" },
  { item: "Chicken Fried Momo", cost: 160, type: "Momo" },
  { item: "Fish Fried Momo", cost: 220, type: "Momo" },
  { item: "Veg Manchow", cost: 120, type: "Soup" },
  { item: "Sweet Corn", cost: 100, type: "Soup" },
  { item: "Chicken Manchow", cost: 150, type: "Soup" },
  { item: "Veg Spring Roll", cost: 100, type: "Appetizer" },
  { item: "Chilli Paneer", cost: 150, type: "Appetizer" },
  { item: "Chicken Spring Roll", cost: 120, type: "Appetizer" },
  { item: "Crispy Honey Chicken", cost: 180, type: "Appetizer" },
  { item: "Crab Rangoon", cost: 220, type: "Appetizer" },
  { item: "Veg Hakka Noodles", cost: 130, type: "Noodles" },
  { item: "Steamed Rice", cost: 100, type: "Rice" },
  { item: "Corn Fried Rice", cost: 120, type: "Rice" },
  { item: "Chicken Fried Rice", cost: 130, type: "Rice" },
  { item: "Mix Meat Fried Rice", cost: 180, type: "Rice" },
  { item: "Potato Garlic Sauce", cost: 120, type: "Sauce" },
  { item: "Creamy Noodles", cost: 130, type: "Noodles" },
  { item: "Shredded Chicken", cost: 160, type: "Chicken" },
  { item: "Veg Cheezy Pizza", cost: 170, type: "Pizza" },
  { item: "American Cheezy Chicken", cost: 250, type: "Chicken" },
  { item: "Tea", cost: 100, type: "Hot and Cold Beverage" },
  { item: "Coffee", cost: 120, type: "Hot and Cold Beverage" },
  { item: "Hot Chocolate", cost: 140, type: "Hot and Cold Beverage" },
  { item: "Masala Tea", cost: 160, type: "Hot and Cold Beverage" },
  { item: "Black Tea", cost: 200, type: "Hot and Cold Beverage" },
  { item: "Mojito", cost: 240, type: "Hot and Cold Beverage" },
  { item: "Pink Lemonade", cost: 260, type: "Hot and Cold Beverage" },
  { item: "Virgin Mojito", cost: 320, type: "Hot and Cold Beverage" },
];

function updateOrder(command) {
  if (command.toLowerCase() === "place order") {
    window.location.href = "payment.html";
    return;
  }
  // Use regex to parse the command
  const addMatch = command.match(/(add|get me a|I would like to add some)\s*(\d*)\s*(.+)/i);
  const removeMatch = command.match(/(remove|i don't want)\s*(\d*)\s*(.+)/i);


  let action, quantity, itemName;

  // Determine action and extract quantity and item name
  if (addMatch) {
    action = "add";
    quantity = parseInt(addMatch[2]) || 1;
    itemName = addMatch[3];
  } else if (removeMatch) {
    action = "remove";
    quantity = parseInt(removeMatch[1]) || 1;
    itemName = removeMatch[3];
  } else {
    console.log("Invalid command.");
    return;
  }

  // Search the menu for the item
  let item = menu.find(
    (menuItem) => menuItem.item.toLowerCase() === itemName.toLowerCase()
  );

  // If the item was not found and the item name ends with 's', remove the final 's' and search again
  if (!item && itemName.toLowerCase().endsWith("s")) {
    itemName = itemName.substring(0, itemName.length - 1);
    item = menu.find(
      (menuItem) => menuItem.item.toLowerCase() === itemName.toLowerCase()
    );
  }

  let response_ai="OOPS!";

  // If the item was still not found, log an error and return
  if (!item) {
    console.log(`Item '${itemName}' not found in the menu.`);
    return;
  }


  // Depending on the action, call addToOrder or removeFromOrder
  // Depending on the action, update the quantity in the food array and call ToCart
  if (action === "add") {
    // Search the food array for the item
    let foodItem = food.find(
      (foodItem) => foodItem[0].toLowerCase() === itemName.toLowerCase()
    );

    // If the item was found in the food array, increase its quantity
    if (foodItem) {
      foodItem[1] += quantity;
      console.log(foodItem[0], foodItem[2], foodItem[3], foodItem[1]);
      // Call ToCart with the item details and the updated quantity
      response_ai=`ai response: I have added ${foodItem[0]} to cart.`;
      ToCart(foodItem[0], foodItem[1], foodItem[3], foodItem[2]);
    } else {
      // If the item was not found in the food array, add it with the given quantity
      food.push([item.item, quantity, item.cost, item.type]);
      console.log(item.item, item.cost, item.type, quantity);
      // Call ToCart with the item details
      if(item.type==="Hot and Cold Beverage")
      response_ai=`ai response: I have added  ${item.item} to cart. `;
      else
      response_ai=`ai response: I have added  ${item.item} to cart. Would you like a beverage with it?`;
      ToCart(item.item, quantity, item.type, item.cost);
    }
    let quantityElement = $(`.foodItem:contains(${item.item}) .quantity`);
    quantityElement.text(quantity);
  } else if (action === "remove") {
    // Search the food array for the item
    let foodItemIndex = food.findIndex(
      (foodItem) => foodItem[0].toLowerCase() === itemName.toLowerCase()
    );

    // If the item was found in the food array, decrease or remove it
    if (foodItemIndex !== -1) {
      // If the quantity to be removed is greater than or equal to the quantity in the cart, remove the item
      if (quantity >= food[foodItemIndex][1]) {
        food.splice(foodItemIndex, 1);
        console.log(`Item '${itemName}' removed from the cart.`);
        response_ai=`ai response: I have removed ${item.item} from cart.`;
        ToCart(itemName, 0, item.type, item.cost);

        let quantityElement = $(`.foodItem:contains(${item.item}) .quantity`);
        quantityElement.text(0);
        return;
      } else {
        // Otherwise, subtract the quantity to be removed from the quantity in the cart
        response_ai=`ai response: I have removed ${food[foodItemIndex][2]} ${food[foodItemIndex][0]} from cart.`;
        food[foodItemIndex][1] -= quantity;

        let quantityElement = $(`.foodItem:contains(${item.item}) .quantity`);
        quantityElement.text(food[foodItemIndex][1]);
        console.log(
          food[foodItemIndex][0],
          food[foodItemIndex][2],
          food[foodItemIndex][3],
          food[foodItemIndex][1]
        );
        // Call ToCart with the item details and the updated quantity
        ToCart(
          food[foodItemIndex][0],
          food[foodItemIndex][1],
          food[foodItemIndex][3],
          food[foodItemIndex][2]
        );
      }
    } else {
      // If the item was not found in the food array, log an error and return
      console.log(`Item '${itemName}' not found in the cart.`);
      return;
    }
    
  }
  document.getElementById("response").innerHTML=response_ai;
    speak(response_ai.slice(12));
}

// const botButton = document.getElementById("start-record-btn");
// console.log(botButton);
// botButton.addEventListener("click", () => {
//   updateOrder("remove 1 veggie momo");
// });
// recognition.onerror = (event) => {
//   console.error("Speech recognition error:", event.error);
//   recognition.stop();
//   imgElem.style.filter = "invert(1)";
//   imgElem.style.transform = "scale(1)";
// };
// updateOrder("add 2 veggie momo");
