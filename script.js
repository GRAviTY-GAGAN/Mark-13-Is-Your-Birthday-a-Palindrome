function reverseStr(str) {
    // var listOfChars = str.split('');
    // var reversedListOfChars = listOfChars.reverse();
    // var reversedStr = reversedListOfChars.join('');
    // return reversedStr;
    return str.split('').reverse().join('');
}

function isPalindrome(str) {
    var reverse = reverseStr(str);

    // if(str === reverse){
    //     return true;
    // } 
    // return false; //OR
    return str === reverse;
}



function convertDateToStr(date){
    var dateStr = { day: '', month: '', year: ''};
    
    if(date.day < 10) {
        dateStr.day = '0' +  date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    
    if(date.month < 10) {
        dateStr.month = '0' +  date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date){
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice('-2');
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice('-2');
    var yymmdd = dateStr.year.slice('-2') + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;

    for(var i=0; i<listOfPalindromes.length; i++) {
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }


    return flag;
}

//check for leap year
function isLeapYear(year){
    if(year % 400 === 0) {
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

//get next date
function getNextDate(date){
    var day = date.day + 1; // increament day
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 0 - 11

    //check for february
    if(month === 2) { // check for leap year
        if(isLeapYear(year)) {
            if(day > 29) {
                day = 1;
                month++;  //increament the month
            }
        } else {
            if(day > 28){
                day = 1;
                month++; //increament the month
            }
        }

        //check for other months
    } else {
        // check if the day exceeds the max days in month
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;  //increament the month
        }
    }

    //increament the year if months is greater than 12
    if(month > 12) {
        month = 1;
        year++;
    }


    return {
        day: day,
        month: month,
        year: year
    };
}


// get next palindrome date
function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}







var date = {
    day: 8,
    month: 8,
    year: 2021
};


//check dry run for console.log(getNextDate(date)); for these dates: 15 aug 2021, 28 feb 2020, 31 dec 2020

// using getNextDate and isLeapYear function we have built our getNextPalindromeDate function

// console.log(getNextPalindromeDate(date));
// console.log(getNextDate(date));

console.log(getNextPalindromeDate(date));


var dateInputRef = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');


function clickHandler(){
    var bdayStr = dateInputRef.value;



    if(bdayStr !== ""){
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if(isPalindrome){
            resultRef.innerText = 'Yay! your birthday is a palindrome!! 🥳🥳'
        } else {
            var [ctr, nextDate] = getNextPalindromeDate(date);
            resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`
        }
    }
}


showBtnRef.addEventListener("click", clickHandler);