var url='goods_action.php';   // PHP伺服器端腳本的URL
var url_cart='cart_action.php';   // PHP伺服器端腳本的URL

const elm_g_list = document.querySelector('#g_list');

const rcm_capacity = 3;
const list_capacity = 4;
var goods_list;
var goods_count;
var goods_page_count;
var goods_page_cur = 1;

setGoods();
getCartHint();

function setGoods(){
    $.ajax({
        url: url,
        method: 'POST',
        dataType: "json",
        data: {check: 'g_datas'},
        success: function(data) {
            goods_list = data;
            //jsonMsg(goods_list);
            goods_count = goods_list.length;
            //testMsg(goods_count);
            goods_page_count = Math.ceil(goods_count / list_capacity);
            //testMsg(goods_page_count);
            setGoodsList();
            setRecommendList();
            setGoodsPage(goods_page_cur);
        },
        error: function(error) {
            
        }
    });
}

function setGoodsList(){
    let elm_list = elm_g_list;
    let elm_list_item = elm_list.children[0];
    //delet test html
    let child_count = elm_list.children.length;
    for(let n=1; n < child_count;n++){
        elm_list.children[1].remove();
    }
    
    
    for(let n=0; n < list_capacity; n++){
        let elm_new = elm_list_item.cloneNode(true);
        elm_list.append(elm_new);
    }

    //delet test html
    elm_list_item.remove();

    setPageList();
}
function setPageList(){
    const p_lists = document.querySelectorAll('#p_list');

    for(let n = 0; n < p_lists.length; n++){
        for(let j = 0; j < goods_page_count; j++){
            let number = j+1;
            elm_new_html = "<button class=\"bar_button\" onclick=\"setGoodsPage("+number+")\">"+number+"</button>";
            p_lists[n].innerHTML+=elm_new_html;
        }
    }
}
function setRecommendList(){
    let elm_list = document.querySelector('#g_rcm_list');
    let elm_list_item = elm_list.children[0];
    //delet test html
    let child_count = elm_list.children.length;
    for(let n=1; n < child_count;n++){
        elm_list.children[1].remove();
    }
    
    for(let n=0; n < rcm_capacity; n++){
        let elm_new = elm_list_item.cloneNode(true);
        elm_list.append(elm_new);

        elm_new.querySelector('a').href = "javascript:goRecommend(" + (n+1) + ")";
        elm_new.querySelector('img').src = "img/goods/" + goods_list[n]['image'];
    }

    //delet test html
    elm_list_item.remove();
}

function setGoodsPage(page){
    //const start = list_capacity * (page-1) + rcm_capacity;
    const start = list_capacity * (page-1);
    let cur = start;
    
    for(let n=0; n < list_capacity; n++){
        let elm_child = elm_g_list.children[n];
        if(cur < rcm_capacity){
            elm_child.id = 'rcm_' + (n+1);
        }else{
            //elm_child.id = '';
            elm_child.removeAttribute('id');
        }

        if(cur < goods_count){
            elm_child.hidden = false;
            elm_child.querySelector('#g_img').src = 'img/goods/' + goods_list[cur]['image'];
            elm_child.querySelector('#g_name').innerHTML = goods_list[cur]['goods_name'];
            elm_child.querySelector('#g_price').innerHTML = goods_list[cur]['price'] + '￥';
            elm_child.querySelector('#g_dsp').innerHTML = goods_list[cur]['goods_text'];
            elm_child.querySelector('#g_option a').setAttribute('href',"javascript:addToCart("+ goods_list[cur]['goods_id'] + ")");
        }else{
            elm_child.hidden = true;
            //elm_g_list.children[n].innerHTML="empty";
        }
    
        cur++;
    }

    goods_page_cur = page;
}

function nextGoodsPage(step){
    goods_page_cur = Math.max(1, Math.min(goods_page_count, goods_page_cur + step));
    setGoodsPage(goods_page_cur);
}

function goRecommend(num){
    setGoodsPage(1);
    location.href = '#rcm_'+num;
}


/* cart action*/
const elm_cart = document.querySelector('#cart');
const elm_cart_hint = elm_cart.querySelector('.hint')
function addToCart(id){
    testMsg('add goods:'+id+'(fucntion no complete)');

    $.ajax({
        url: url_cart,
        method: 'POST',
        data: {action: 'add',goods_id: id},
        success: function(data) {
            testMsg(data);
            getCartHint();
        },
        error: function(error) {
            
        }
    });
}


function getCartHint(){
    $.ajax({
        url: url_cart,
        method: 'POST',
        data: {check: 'count'},
        success: function(data) {
            setCartHint(data);
        },
        error: function(error) {
            
        }
    });
}
function setCartHint(count){
    if(count > 0){
        elm_cart.hidden = false;
        elm_cart_hint.innerHTML = count;
    }else{
        elm_cart.hidden = true;
        elm_cart_hint.innerHTML = 0;
    }
}


function test()
{
    window.alert('Go');
}

function testMsg(msg)
{
    window.alert(msg);
}

function jsonMsg(msg){
    window.alert( JSON.stringify(msg));
}

