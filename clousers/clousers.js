function x(){
    for (var i = 0; i < 5; i++) {
        function close(x){
            setTimeout(() => {
                console.log(x)
            }, x * 1000);
        }
        close(i)
    }
   
    console.log("I love js")
}
x();