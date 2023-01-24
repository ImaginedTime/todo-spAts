var item, complete, list;
list = document.getElementById('list');

if (typeof (localStorage) == 'undefined') {
    list.innerHTML = 'Sorry, you need a browser that supports localStorage.';
    document.getElementById('add').disabled = true;
}
else {
    try {
        var keys = localStorage.getItem('__keys').split(',');
        for (k in keys) {
            k = keys[k].replace(/ /g, '');
            if (k) {
                item = localStorage.getItem(k);
                complete = localStorage.getItem(k + '_complete');
                if (complete === 'true') 
                    list.innerHTML += '<li class="complete"> <input type="checkbox" id="' + k + '" onclick="checkedItem(this)" checked> ' + item;
                else 
                    list.innerHTML += '<li class="incomplete"> <input type="checkbox" id="' + k + '" onclick="checkedItem(this)"> ' + item;
            }
        }
    } catch (e) {
        localStorage.setItem('__keys', '');
    }
}

var addItem = function () {
    // attempt unique name
    var item, val, key;
    item = document.getElementById('item').value;
    val = item.split(' ');

    key = '';
    for (v of val) 
        key += v.substring(0, 1);

    key = key.toLowerCase();
    localStorage.setItem(key, item);
    localStorage.setItem(key + '_complete', false);
    document.getElementById('list').innerHTML += '<li class="incomplete"> <input type="checkbox" id="' + k + '" onclick="checkedItem(this)"> ' + item;

    // update key list
    var keylist = localStorage.getItem('__keys') + key + ',';
    localStorage.setItem('__keys', keylist);
};

var checkedItem = function (ele) {
    if (ele.checked) {
        ele.parentNode.className = 'complete';
        localStorage.setItem(ele.id + '_complete', 'true');
    } else {
        ele.parentNode.className = 'incomplete';
        localStorage.setItem(ele.id + '_complete', 'false');
    }
};