function d3_raphael_enterSelection(groups, d3_raphael_root) {
    d3_arraySubclass(groups, d3_raphael_enterSelectionPrototype);
    groups.root = d3_raphael_root;

    return groups;
}

var d3_raphael_enterSelectionPrototype = [];

d3_raphael_enterSelectionPrototype.append = function(type) {
    if(d3_raphael_paperShapes.indexOf(type) < 0)
        throw TypeError("Type Not Supported");

    var groups = [],
        group,
        upgroup, // tricky!
        nodeData;

    for(var j = 0; j < this.length; j++) {
        groups.push((group = []));
        upgroup = this[j].update; // upgroup is the enter selection's corresponding update selection

        for(var i = 0; i < this[j].length; i++) {
            if((nodeData = this[j][i])) {
                var newNode = this.root[type]();

                if("__data__" in nodeData)
                    newNode.__data__ = nodeData.__data__;

                group.push(newNode);
                upgroup[i] = newNode; // adds the new node to the update selection
            } else {
                group.push(null);
            }
        }
    }

    return d3_raphael_selection(groups);
};

d3_raphael_enterSelectionPrototype.empty = d3_selectionPrototype.empty;
d3_raphael_enterSelectionPrototype.node = d3_selectionPrototype.node;
d3_raphael_enterSelectionPrototype.insert = throw_raphael_not_supported;



