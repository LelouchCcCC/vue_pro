export function MP() {
    return new Promise(function (resolve, reject) {
        if (typeof BMap !== 'undefined') {
            resolve(BMap)
            return true
        }
        window.onload = function () {
            resolve(BMap)
        }
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=3.0&ak=aYNu34AYwt3QTaApv4nNH5tSAxe7NIGe&callback=init";
        script.onerror = reject;
        document.head.appendChild(script);
    })
}
