export function toTitleCase(title) {

    var i, j, str, lowers, uppers;
    str = title.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    
    // Certain minor words should be left lowercase unless 
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
    'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
        function(txt) {
            return txt.toLowerCase();
        });
    
    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv', 'Iv', 'Ii', 'Iii', 'Vi', 'Vii', 'Viii', 'Ix' ];
    for (i = 0, j = uppers.length; i < j; i++) {
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
        uppers[i].toUpperCase());
    }

 //Words after a '-' or ':' should be capitilized
 const regexLowerCaseAfterColonOrDash = RegExp(`: [a-z]|- [a-z]`, "g")

 let itemsToCapitilize;

 while ((itemsToCapitilize = regexLowerCaseAfterColonOrDash.exec(str)) !== null) {
     str = str.replace(itemsToCapitilize[0], itemsToCapitilize[0].toUpperCase())
 }
 
 return str;

}