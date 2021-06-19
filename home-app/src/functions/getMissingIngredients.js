


// export const getMissingIngredients  = (needed, actual, onStock) => {
//
//     let a = []
//     let missing = [];
//
//     for (let i = 0; i < needed.length; i++) {
//         a[needed[i]] = true;
//     }
//
//     for (let i = 0; i < actual.length; i++) {
//         if (a[actual[i]]) {
//             delete a[actual[i]];
//         } else {
//             a[actual[i]] = true;
//         }
//     }
//
//     for (let k in a) {
//         missing.push(k);
//     }
//
//     if(missing.length === 0){
//         return <strong>Wszystkie skłądniki na miejscu</strong>
//     }
//     else{
//         return <strong className="missing">{`brakuje ${missing.length} skłądników`}</strong>
//     }
// }

// console.log(arr_diff(['a', 'b'], ['a', 'b', 'c', 'd']));
// console.log(arr_diff("abcd", "abcde"));
// console.log(arr_diff("zxc", "zxc"));


export const getMissingIngredients = (a1, a2) => {

    var a = [], missing = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        missing.push(k);
    }
        if(missing.length === 0){
        return <strong>Wszystkie skłądniki na miejscu</strong>
    }
    else{
        return <strong className="missing">{`brakuje ${missing.length} skłądników`} {JSON.stringify(missing)}</strong>
    }
}

