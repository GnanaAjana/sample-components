
/*accordian function*/
$(document).ready(function () {
    $('.acc').css({ 'width': $(window).width(),
        'height': $(window).height()
    });
});
$(document.body).off('click', '.accui a').on('click', '.accui a', function () {
    if (($(this).next('ul').css('display')) == 'none') {
        $('.subui').css('display', 'none');
        $(this).next('ul').css('display', 'block');
    }
    else {
        $(this).next('ul').css('display', 'none');
    }

});
/*create textbox function*/
var container = document.createElement('div');
container.setAttribute('id', 'txtContainer');
var cnt = 0;
function enabletxtdiv() {
    if (cnt < 10) {
        cnt = cnt + 1;
        if (cnt == 1) {        // SHOW SUBMIT BUTTON IF ATLEAST "1" ELEMENT HAS BEEN CREATED.
            $(container).append('Enter Title :<input type=\'text\' id=\'AccordianTitle\'/><br/>');
            var divSubmit = document.createElement('div');
            divSubmit.setAttribute('id', 'showAddbtn');
            $(divSubmit).append('<input type=button class=\"bt\" onclick=\"GetTextValue()\" id=\"btAddSubmit\" value=\"Submit\" />');

        }
        $(container).append("<input class=\'txtaddsubli\' type=\'text\' id=\'txt" + cnt + "\'/><input type=\'button\' id=\'btnDelAddtxt" + cnt + "\' value=\'Delete\' onclick=\'deleteCurrenttxt(txt" + cnt + ",this)\'/>");
        $(container).appendTo('#addContent');
        $(divSubmit).appendTo('#addContent');
    }
    else {
        alert("Only 10 sub element can be created.");
        $('#addtxtLi').attr('disabled', 'disabled');
    }
}
/*delete current text element*/
function deleteCurrenttxt(id, currentdeletebtn) {
    if (cnt != 0) {
        $(id).remove(); $(currentdeletebtn).remove(); cnt = cnt - 1;
        if ($("#addtxtLi").is(":disabled"))
            $('#addtxtLi').removeAttr('disabled');
    }
    if (cnt == 0) {
        $(container).empty();
        $(container).remove();
        $('#btAddSubmit').remove();
        $('#btAddCancelli').remove();
        $('#addtxtLi').removeAttr('disabled');
    }
}
/*redirect sub li element*/
function applySub() {
    //                $('ul > li > a').click(function () {
    //                    $('ul > li > ul').css('display', 'none'); 
    //                $($(this).attr('href')).css('display', 'block'); });
}

/*add sub li elements to parent ul*/
function GetTextValue() {
    try {

        var subMenuvalues = [];
        var AccordianTitle = $('#AccordianTitle').val();
        $('.txtaddsubli').each(function () {
            if (this.value != "" && this.value != null) {
                subMenuvalues.push(this.value);
            }
        });
        if (AccordianTitle != '' && AccordianTitle != null) {
            if (subMenuvalues.length > 0) {
                var item = document.getElementById('hiddenID').value;
                if (document.getElementById(item).tagName === 'A') {
                    var insertAfterElement = $('#' + item).parent();
                    var parentEle1 = $('#' + item).parent().parent();
                    var newliID = getElementID(parentEle1);
                    createElementWithsubmenu(newliID, insertAfterElement, subMenuvalues, AccordianTitle);
                }

                if (document.getElementById(item).tagName === 'LI' && document.getElementById(item).className == 'topLi') {
                    var insertAfterElement = $('#' + item);
                    var parentEle = $('#' + item).parent();
                    var newliID = getElementID(parentEle);
                    createElementWithsubmenu(newliID, insertAfterElement, subMenuvalues, AccordianTitle);

                }


                addsubLiClose();
            }
            else
                alert("Please enter Sub menu items");
        }
        else
            alert("Please fill the title");
    }
    catch (err) {
        console.log(err);
    }
}
/*Creating sub menu*/
function createElementWithsubmenu(liID, createAfter, values, Title) {
    var num = liID.match(/\d+/g)[0];
    var li = document.createElement('li');
    li.setAttribute('id', liID);
    li.setAttribute('class', 'topLi');
    var subul = document.createElement('ul');
    subul.setAttribute('id', 'ui' + num);
    subul.setAttribute('class', 'subui');
    var i = 1;
    $.each(values, function (index, liValue) {
        $(subul).append("<li id=\'" + 'ui' + num + "li" + i + "\'>" + liValue + "</li>");
        i++;
    });
    var atag = document.createElement('a');
    atag.setAttribute('id', 'tli' + num);
    atag.setAttribute('href', '#ui' + num);
    atag.setAttribute('title', 'accordian' + num);
    $(atag).append(Title);
    $(atag).appendTo(li);
    $(subul).appendTo(li);
    $(createAfter).after(li);
    i = 0;
}

/*add sub li close function */
function addsubLiClose() {

    if ($("#txtContainer").length) {
        $(container).empty();
        $(container).remove();
        $('#btAddSubmit').remove(); cnt = 0;
        
    }
    if ($('#addContent').is(':visible')) {
        $('#addContent').css('display', 'none');
        enableBackgound();

    }
}

/*close right menu*/
function closePopContainer() {
    $('#popContainer').css('display', 'none');
}
/*disable right menu for ul and enable div content*/
$('.accui').bind("contextmenu", function (e) {
    e.preventDefault();
    var target = $(e.target);
    if ($('#popContainer').is(':visible')) {
        $('#popContainer').css('display', 'none');
    }
    if (!($('#addoreditPop').is(':visible')) && !($('#addContent').is(':visible'))) {
        if (!($('#popContainer').is(':visible'))) {
            var contentelementId = $(target).attr('id');
            createRightMenu('Add', 'Edit', 'Delete', contentelementId);
            $('#popContainer').css('display', 'block');
            e.preventDefault();
            $('#popContainer').css({
                'top': event.pageY,
                'left': event.pageX
            });
        }
    }


    return false;
});
/**/
$('.acc').on('click', function () {
    if ($('#popContainer').is(':visible')) {
        $('#popContainer').css('display', 'none');
    }
});
/*add only li element*/

function addonlyLiMenu() {
    var item = document.getElementById('hiddenID').value;
    var val = prompt("enter li element");
    if (val != "" && val != null) {
        if (document.getElementById(item).tagName === 'A') {
            var insertAfterElement = $('#' + item).parent();
            var parentEle1 = $('#' + item).parent().parent();
            var liID = getElementID(parentEle1);
            $(insertAfterElement).after('<li id=\'' + liID + '\' class=\'topLi\'>' + val + '</li>');
        }

        if (document.getElementById(item).tagName === 'LI' && document.getElementById(item).className == 'topLi') {
            var insertAfterElement = $('#' + item);
            var parentEle = $('#' + item).parent();
            var liID = getElementID(parentEle);
            $(insertAfterElement).after('<li id=\'' + liID + '\' class=\'topLi\'>' + val + '</li>');
        }

    }
    closeModalPopUp();

}


/*get element id to add id for new li */
function getElementID(ele) {
    var arrval = [];
    arrval = $(ele).children('li');
    var numarr = [];
    var IDValues = [];
    $.each(arrval, function (index, value) {
        var IDval = $(value).attr('id');
        IDValues.push(IDval);
        var IDnum = IDval.match(/\d+/g)[0];
        numarr.push(parseInt(IDnum));
    });

    numarr.sort(function (a, b) { return b - a });
    $.each(IDValues, function (key, id) {
        var numi = id.match(/\d+/g)[0];
        if (numi == numarr[0]) {
            newElementID = id.replace(numi, numarr[0] + 1);
        }
    });
    return newElementID;
}
//$('#addSubMenu').on('click', function () {
function addSubMenu() {
    var item = document.getElementById('hiddenID').value;
    var element = $('#' + item);
    var subMenuvalue = prompt("Enter sub menu value");
    if (subMenuvalue != "" & subMenuvalue != null) {
        if (element.prop('tagName') == "A" || (element.prop('tagName') == "LI" && element.find('a').length > 0)) {

            var addto;
            if (element.prop('tagName') == "A")
                addto = element.parent().find('ul');
            if (element.prop('tagName') == "LI" && element.find('a').length > 0)
                addto = element.find('ul');
            var lastelementid = addto.children().last().attr('ID');
            var IDnum = lastelementid.match(/\d+/g)[1];
            var newid = lastelementid.replace(IDnum, (parseInt(IDnum) + 1));
            addto.append('<li id=\"' + newid + '\">' + subMenuvalue + '</li>');
        }
        if (element.prop('tagName') == "LI" && element.find('a').length == 0) {

            var addtoId = $('#' + item).attr('ID');
            var addtoText = element.text();
            var IDnum = addtoId.match(/\d+/g)[0];
            var atag = document.createElement('a');
            atag.setAttribute('id', 'tli' + IDnum);
            atag.setAttribute('href', '#ui' + IDnum);
            atag.setAttribute('title', 'accordian' + IDnum);
            $(atag).append(addtoText);
            var subul = document.createElement('ul');
            subul.setAttribute('id', 'ui' + IDnum);
            subul.setAttribute('class', 'subui');
            $(subul).append("<li id=\'" + 'ui' + IDnum + "li1\'>" + subMenuvalue + "</li>");
            $(element).html(atag);
            $(element).append(subul);

        }
        closeModalPopUp();
    }
    if (subMenuvalue == "")
        alert("Please enter sub menu value");

}
/*add sub li element*/

function addLiwithSubMenu() {
    var item = document.getElementById('hiddenID').value;
    /*alert("sub " + item);*/
    $('#addContent').css('display', 'block');
    closeModalPopUp();
    disableBackgound();
}


/*disable right menu div*/
$('ul').on('click', function (e) {
    $('#popContainer').css('display', 'none');
});

function disableBackgound() {
    $('.acc').addClass('fadediv');
    $('.acc').find('ul, a').each(function () {
        $(this).prop('disabled', true);
    });            
    $('#popContainer').find('button').each(function () {
        $(this).prop('disabled', true);
    });
}
function enableBackgound() {
    $('.acc').removeClass('fadediv');
    $('.acc').find('ul, a').each(function () {
        $(this).prop('disabled', false);
    });
    $('#popContainer').find('button').each(function () {
        $(this).prop('disabled', false);
    });
}

/*show add/Edit popup*/
function showModalPopUp(menuId, status) {
    if (status == "menu") {
        var addEle = $('#addoreditPop').find('ol');
        addEle.html('<li id=\"onlyLi\" onclick=\"addonlyLiMenu()\">Click here to add another menu</li><li id=\"withLi\" onclick=\"addLiwithSubMenu()\">Click here to another menu with sub menu</li>'); //<li id=\"addSubMenu\" >Click here for adding sub menu for existing menu</li>');
        $('#addoreditPop').css('display', 'block');
        disableBackgound();
        closePopContainer();
    }
    if (status == "submenu") {
        var addEle = $('#addoreditPop').find('ol');
        addEle.html('<li id=\"addSubMenu\" onclick=\"addSubMenu()\">Click here to add sub menu for existing menu</li>');
        $('#addoreditPop').css('display', 'block');
        disableBackgound();
        closePopContainer();
    }

}
/*close add/Edit popup*/
function closeModalPopUp() {
    $('#addoreditPop').css('display', 'none');
    enableBackgound();
}

/*add function*/
function AddElement(addEle) {
    var addID = addEle.replace('r', '');
    document.getElementById('hiddenID').value = addID;
    var ele = $('#popContainer');
    if ($('#addM').length == 0 && $('#addSM').length == 0)
        ele.append("<input type=\'button\' id=\'addM\'  onclick=\'showModalPopUp(\"" + addID + "\",\"menu\")\'  value=\'Add Menu\'/><br /><input type=\'button\' id=\'addSM\'  onclick=\'showModalPopUp(\"" + addID + "\",\"submenu\")\'   value=\'Add SubMenu\'/><br />");

}
/*edit function*/
function EditElement(editEle) {
    /*alert(editEle);*/
    var editID = editEle.replace('r', '');
    var editElement;
    var editValue;
    //var editElement=$('#'+editID).children().find('a');

    if ($('#' + editID).find('a').length > 0) {
        editElement = $('#' + editID).find('a');
        editValue = prompt("Edit the value", editElement.text());
    }
    else {
        editElement = $('#' + editID);
        editValue = prompt("Edit the value", editElement.text());
    }
    if (editValue != "" && editValue != null) {
        editElement.html(editValue);
        closePopContainer();
    }
    if (editValue == null)
        closePopContainer();
    if (editValue == "")
        alert("Please enter value");
}
/*delete function*/
function DeleteElement(deleteEle) {

    var conform = confirm("Are you sure to delete?");
    if (conform) {
        var delID = deleteEle.replace('r', '');
        var delItem = $('#' + delID);
        if (delItem.prop('tagName') === "A" || delItem.prop('tagName') === "LI") {

            if (delItem.prop('tagName') === "A") {

                if (delItem.parent().parent().children().length > 1) {
                    delItem.parent().remove()
                    closePopContainer();

                }
                else {
                    closePopContainer();
                    alert("Atleast one accordian should be there");

                }
            }
            if (delItem.prop('tagName') === 'LI' && delItem.prop('className') == 'topLi') {

                if (delItem.parent().children().length > 1) {
                    $(delItem).remove();
                    closePopContainer();
                }
                else {
                    closePopContainer();
                    alert("Atleast one accordian should be there");

                }
            }
            if (delItem.prop('tagName') === 'LI' && delItem.prop('className') == '') {

                if (delItem.parent().children().length > 1) {
                    $(delItem).remove();
                    closePopContainer();
                }
                else {
                    var parentElement = $(delItem).parent();
                    var grandparent = $(delItem).parent().parent();
                    var atag = grandparent.find('a');
                    var atagVal = atag.text();
                    $(delItem).remove();
                    atag.remove();
                    parentElement.remove();
                    grandparent.html(atagVal);
                    closePopContainer();
                }
            }

        }
        else
            closePopContainer();

    }

}
/*right menu create*/
var createRightMenu = function (AddTitle, EditTitle, DeleteTitle, currentElementId) {
    if (typeof AddTitle !== 'undefined' && typeof EditTitle !== 'undefined' && typeof DeleteTitle !== 'undefined') {
        this.AddTitle = AddTitle;
        this.EditTitle = EditTitle;
        this.DeleteTitle = DeleteTitle;
    }
    if (typeof AddTitle === 'undefined')
        this.AddTitle = 'Add';
    if (typeof EditTitle === 'undefined')
        this.EditTitle = 'Edit';
    if (typeof DeleteTitle === 'undefined')
        this.DeleteTitle = 'Delete';

    var divIdName = currentElementId + "r";
    var ele = document.getElementById('popContainer');
    var apatt = /tli/g; var lpatt = /topli/g
    if (apatt.test(currentElementId) || lpatt.test(currentElementId))
        ele.innerHTML = "<input type=\'button\'  onclick=\'AddElement(\"" + divIdName + "\")\'   value=\'Add\'/><br /><input type=\'button\' onclick=\'EditElement(\"" + divIdName + "\")\'  value=\'Edit\'/><br /><input type=\'button\' onclick=\'DeleteElement(\"" + divIdName + "\")\'  value=\'Delete\'/><br />";
    else
        ele.innerHTML = "<input type=\'button\' onclick=\'EditElement(\"" + divIdName + "\")\'  value=\'Edit\'/><br /><input type=\'button\' onclick=\'DeleteElement(\"" + divIdName + "\")\'  value=\'Delete\'/><br />";

}      

