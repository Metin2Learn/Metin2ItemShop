'use strict';

$(document).ready(function(){
    $("#data-table-command").bootgrid({
        //Override default icon classes
        css: {
            icon: 'table-bootgrid__icon zmdi',
            iconSearch: 'zmdi-search',
            iconColumns: 'zmdi-view-column',
            iconDown: 'zmdi-sort-amount-desc',
            iconRefresh: 'zmdi-refresh',
            iconUp: 'zmdi-sort-amount-asc',
            dropDownMenu: 'dropdown form-group--select',
            search: 'table-bootgrid__search',
            actions: 'table-bootgrid__actions',
            header: 'table-bootgrid__header',
            footer: 'table-bootgrid__footer',
            dropDownItem: 'table-bootgrid__label',
            table: 'table table-bootgrid',
            pagination: 'pagination table-bootgrid__pagination'
        },
		caseSensitive: false,
        //Override default module markups
        templates: {
            actionDropDown: "<span class=\"{{css.dropDownMenu}}\">" + "<a href='' data-toggle=\"dropdown\">{{ctx.content}}</a><ul class=\"{{css.dropDownMenuItems}}\" role=\"menu\"></ul></span>",
            search: "<div class=\"{{css.search}} form-group\"><span class=\"{{css.icon}} {{css.iconSearch}}\"></span><input id=\"search\" type=\"text\" class=\"{{css.searchField}}\" placeholder=\""+search+"\" /><i class='form-group__bar'></i></div>",
            header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><p class=\"{{css.search}}\"></p><p class=\"{{css.actions}}\"></p></div>"+
			"<div id=\"{{ctx.id}}\" class=\"{{css.footer}}\"><div class=\"row\"><div class=\"col-sm-6\"><p class=\"{{css.pagination}}\"></p></div><div class=\"col-sm-6 table-bootgrid__showing hidden-xs\"><p class=\"{{css.infos}}\"></p></div></div></div><br>",
            actionDropDownCheckboxItem: "<li><div class='tabe-bootgrid__checkbox checkbox checkbox--dark'><label class=\"{{css.dropDownItem}}\"><input name=\"{{ctx.name}}\" type=\"checkbox\" value=\"1\" class=\"{{css.dropDownItemCheckbox}}\" {{ctx.checked}} /> {{ctx.label}}<i class='input-helper'></i></label></div></li>",
            footer: "<div id=\"{{ctx.id}}\" class=\"{{css.footer}}\"><div class=\"row\"><div class=\"col-sm-6\"><p class=\"{{css.pagination}}\"></p></div><div class=\"col-sm-6 table-bootgrid__showing hidden-xs\"><p class=\"{{css.infos}}\"></p></div></div></div>",
			select: "<div class='checkbox'><label><input name=\"select[]\" type=\"{{ctx.type}}\" class=\"{{css.selectBox}}\" value=\"{{ctx.value}}\" {{ctx.checked}} /><i class='input-helper'></i></label></div>"
        },
        selection: true,
        multiSelect: true,
        rowSelect: true,
        keepSelection: false,
        formatters: {
            "commands": function(column, row) {
				var cmd = "<a href=\""+edit_url+row.id+"\" type=\"button\" class=\"btn btn-info btn-sm\" data-row-id=\"" + row.id + "\">"+edit_txt+"</a> " +
                    "<a href=\""+delete_url+row.id+"\" type=\"button\" onclick=\"return confirm('"+ check_delete +"')\" class=\"btn btn-danger btn-sm\" data-row-id=\"" + row.id + "\">"+delete_txt+"</a> ";
				if(row.type!=2)
					cmd = cmd + "<a href=\""+admin_url+"admin/items&redeem="+row.id+"\" type=\"button\" class=\"btn btn-warning btn-sm\" data-row-id=\"" + row.id + "\">"+create_code+"</a>"
					
                return cmd;

            },
            "icons": function(column, row) {
                return "<img src=\"" + row.icon + "\">";
            }
        }
    });
});