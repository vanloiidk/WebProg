var x = 3;
var foo = {
    x: 2,
    bar: {
        x: 1,
        bar: function () {
            return this.x;
        }
    }
};

var go = foo.bar.bar();
console.log(go);
console.log(foo.bar.bar());