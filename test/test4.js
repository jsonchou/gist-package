var numF = 15;
var numL = 181;
parentTag = 11;

var sb = [];

for (var i = numF; i <= numL; i++) {

    sb.push("insert into wp_term_taxonomy(term_id,taxonomy,description,parent,count) values(" + i + ",'category',''," + parentTag + ",0)\r\n;");

}

console.log(sb.join(''));

