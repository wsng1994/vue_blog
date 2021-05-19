export function formatDateFull() {

    let date = new Date();
    let dateYear = date.getFullYear();             //获取年 
    let dateMonth = date.getMonth();               //获取月  
    let dateDate = date.getDate();                 //获取当日
    let dateDay = date.getDay();                   //获取当日星期数
    let dateHours = date.getHours();               //获取小时
    let dateMinutes = date.getMinutes();           //获取分钟
    let dateSeconds = date.getSeconds();           //获取秒
    let dateMilliseconds = date.getMilliseconds(); //获取毫秒

    return ""+dateYear+dateMonth+dateDate+dateHours+dateMinutes+dateSeconds+dateMilliseconds;

}
