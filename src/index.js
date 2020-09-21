function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    (() => {
        let count = 0;
        for (let i = 0; i < expr.length; i++) {
            if (expr[i] == '(') {
                count++;
            } else if (expr[i] == ')') {
                count--;
            }
        }
        if (count != 0) throw new Error("ExpressionError: Brackets must be paired");
    }
    )();
    function calc(expr) {
        expr = expr.split(' ');

        const operations = {
            "*": (a, b) => Number(a) * Number(b),
            "/": (a, b) => Number(a) / Number(b),
            "+": (a, b) => Number(a) + Number(b),
            "-": (a, b) => Number(a) - Number(b),
        }

        for (let i = 0; i < expr.length; i++) {
            if (expr[i] == "*" || expr[i] == "/") {
                if (expr[i + 1] == 0 && expr[i] == "/") throw new Error('TypeError: Division by zero.');
                expr[i] = operations[expr[i]](expr[i - 1], expr[i + 1]);
                expr.splice(i - 1, 1);
                expr.splice(i, 1);
                i = i - 1;
            }
        }

        for (let i = 0; i < expr.length; i++) {
            if (expr[i] == "+" || expr[i] == "-") {
                expr[i] = operations[expr[i]](expr[i - 1], expr[i + 1]);
                expr.splice(i - 1, 1);
                expr.splice(i, 1);
                i = i - 1;
            }
        }
        return Number(expr[0]);
    }
    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, ' $& ');
    let open = ((br = expr.match(/\(/g))) ? br.length : 0;

    for (let i = 0; i < open; i++) {
        let chunk = expr.match(/(\([0-9\+\/\*\-. ]+\))/g);
        if (chunk) {
            let str = chunk[0].replace('(', '').replace(')', '');
            expr = expr.replace(chunk[0], calc(str));
        }
    }
    return calc(expr);
}


module.exports = {
    expressionCalculator
}