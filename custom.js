var domain = BF_prop.DomainName;
var hepsiNumber = domain.match(/\d+/g)[0];

var lpName = window.location.pathname.substring(1).replace(/\/|index.html/g,'');

//var gaParams = "utm_medium=click_to_reg&utm_source=" + lpName;

// Page title
document.title = document.title.replace(/\hepsibahis.*\.com/gi, "hepsibahis" + hepsiNumber + ".com");

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function OnPreRegClick() {
    var pname = getParameterByName('PNAME') ? getParameterByName('PNAME') : getParameterByName('pname');
    var affiliate = getParameterByName('AFFILIATE') ? getParameterByName('AFFILIATE') : getParameterByName('affiliate');
    var affiliateParams;
    if (pname && affiliate) {
        affiliateParams = '?affiliate=' + affiliate + '&pname=' + pname;
    }
    var windowUrl = '/t/customer/registrationpopup.aspx' +
      '?prereg_firstName=' + document.getElementById('firstname').value +
      '&prereg_lastName=' + document.getElementById('lastname').value +
      '&prereg_email=' + document.getElementById('email').value;

    var oForm = document.frmDeferWindowCommand;
    if (affiliateParams) {
        //oForm.action = 'https://www.hepsibahis'+hepsiNumber+'.com' + affiliateParams + '&' + gaParams;
        oForm.action = 'https://www.hepsibahis'+hepsiNumber+'.com' + affiliateParams;
    }
    else {
        //oForm.action = 'https://www.hepsibahis'+hepsiNumber+'.com' + '?' + gaParams;
        oForm.action = 'https://www.hepsibahis'+hepsiNumber+'.com';
    }
    oForm.windowUrl.value = windowUrl;
    oForm.windowType.value = 'popup';
    oForm.isLoginRequired.value = false;
    oForm.target = '_top';
    oForm.submit();
}

function getSeparator(href){
    if (href) {
        return (href.indexOf("?")===-1) ? "?": "&";
    }
    else {
        return "&"
    }
}

$(document).ready(function() {

    if (window.location.pathname === '/copy-of-casinowelcome-opt-bb-3764-tr/index.html') {
        var pname = getParameterByName('PNAME') ? getParameterByName('PNAME') : getParameterByName('pname');
        var affiliate = getParameterByName('AFFILIATE') ? getParameterByName('AFFILIATE') : getParameterByName('affiliate');
        var domainName = window.location.hostname.split('go.')[1];
        if (pname && affiliate) {
            var urlParams = window.location.search;
            var queryParamArray = urlParams.substr(1).split('&');
            $.cookie('sb_clickthroughpromotion', pname, { expires: 30, path: '/', domain: domainName });
            $.cookie('sb_clickthroughurl', "https://m." + domainName, { expires: 30, path: '/', domain: domainName });
            $.cookie('sb_clickthroughusername', affiliate, { expires: 30, path: '/', domain: domainName });

            queryParamArray.forEach(function(queryParam) {
                var queryParamParsed = queryParam.split('=');
                if (queryParamParsed && queryParamParsed.length === 2) {
                    $.cookie(queryParamParsed[0] + 'Cookie', queryParamParsed[1], { expires: 30, path: '/', domain: domainName });
                }
            });

            $('a').each(function(){
                var originalHref = $(this).attr('href');
                originalHref = originalHref.replace(/\.hepsibahis.*\.com/gi, ".hepsibahis" + hepsiNumber + ".com");
                var hrefSeparator = getSeparator(originalHref);
                if (originalHref && originalHref != '#') {
                    console.log($(this).attr('href'));
                    console.log(originalHref + hrefSeparator + urlParams.substr(1));
                    $(this).attr('href', originalHref + hrefSeparator + urlParams.substr(1));
                }
            });

        }
    }
    else {
        var pname = getParameterByName('PNAME') ? getParameterByName('PNAME') : getParameterByName('pname');
        var affiliate = getParameterByName('AFFILIATE') ? getParameterByName('AFFILIATE') : getParameterByName('affiliate');
        var fid = getParameterByName('FID') ? getParameterByName('FID') : getParameterByName('fid');
        var domainName = window.location.hostname.split('go.')[1];
        if (pname && affiliate) {
            //bet.net
            $.cookie('pnameCookie', pname, { expires: 30, path: '/', domain: domainName });
            $.cookie('affiliateCookie', affiliate, { expires: 30, path: '/', domain: domainName });
            if (fid) {
                $.cookie('fidCookie', fid, { expires: 30, path: '/', domain: domainName });
            }
            //mobile
            $.cookie('sb_clickthroughpromotion', pname, { expires: 30, path: '/', domain: domainName });
            $.cookie('sb_clickthroughurl', "https://m." + domainName, { expires: 30, path: '/', domain: domainName });
            $.cookie('sb_clickthroughusername', affiliate, { expires: 30, path: '/', domain: domainName });
            $('a').each(function(){
                var originalHref = $(this).attr('href');
                originalHref = originalHref.replace(/\.hepsibahis.*\.com/gi, ".hepsibahis" + hepsiNumber + ".com");
                var hrefSeparator = getSeparator(originalHref);
                if (originalHref && originalHref != '#' && !$(this).parent('div').hasClass('header-bg-button-mobile')) {
                    //$(this).attr('href', originalHref + hrefSeparator + gaParams + '&affiliate=' + affiliate + '&pname=' + pname);
                    $(this).attr('href', originalHref + hrefSeparator + '&affiliate=' + affiliate + '&pname=' + pname + (fid ? ('&fid=' + fid) : ''));
                }
                else if ($(this).parent('div').hasClass('header-bg-button-mobile')) {
                    //$(this).attr('href', originalHref + hrefSeparator + gaParams + '&affiliate=' + affiliate + '&pname=' + pname);
                    $(this).attr('href', originalHref + hrefSeparator + '&affiliate=' + affiliate + '&pname=' + pname + (fid ? ('&fid=' + fid) : ''));
                }
            });
            var originalFormMobileAction = $("#form_mobile form").attr('action');
            if (originalFormMobileAction) {
                originalFormMobileAction = originalFormMobileAction.replace(/\.hepsibahis.*\.com/gi, ".hepsibahis" + hepsiNumber + ".com");
                //$("#form_mobile form").attr('action', originalFormMobileAction + getSeparator(originalFormMobileAction) + 'affiliate=' + affiliate + '&pname=' + pname + '&' + gaParams);
                $("#form_mobile form").attr('action', originalFormMobileAction + getSeparator(originalFormMobileAction) + 'affiliate=' + affiliate + '&pname=' + pname);
                //$("#form_mobile form").append("<input type='hidden' name='affiliate' value='" + affiliate + "'>" + "<input type='hidden' name='pname' value='" + pname + "'>" + "<input type='hidden' name='utm_medium' value='click_to_reg'>" + "<input type='hidden' name='utm_source' value='" + lpName + "'>");
                $("#form_mobile form").append("<input type='hidden' name='affiliate' value='" + affiliate + "'>" + "<input type='hidden' name='pname' value='" + pname + "'>");
            }
        }
        else {
            $('a').each(function(){
                var originalHref = $(this).attr('href');
                originalHref = originalHref.replace(/\.hepsibahis.*\.com/gi, ".hepsibahis" + hepsiNumber + ".com");
                var hrefSeparator = getSeparator(originalHref);
                //$(this).attr("href", originalHref + hrefSeparator + gaParams);
                $(this).attr("href", originalHref + hrefSeparator);
            });
            var originalFormMobileAction = $("#form_mobile form").attr('action');
            if (originalFormMobileAction) {
                originalFormMobileAction = originalFormMobileAction.replace(/\.hepsibahis.*\.com/gi, ".hepsibahis" + hepsiNumber + ".com");
                //$("#form_mobile form").attr('action', originalFormMobileAction + getSeparator(originalFormMobileAction) + gaParams);
                $("#form_mobile form").attr('action', originalFormMobileAction + getSeparator(originalFormMobileAction));
                //$("#form_mobile form").append("<input type='hidden' name='utm_medium' value='click_to_reg'>" + "<input type='hidden' name='utm_source' value='" + lpName + "'>");
            }
        }
    }



    if(!affiliate || !pname){
        window.ga('send', 'event', 'Landing pages', 'Affiliate params', 'affiliate and/or pname are missing');
    }
    else if(affiliate !='net_refer') {
        window.ga('send', 'event', 'Landing pages', 'Affiliate params', 'affiliate is not net_refer');
    }

    var publisherid = getParameterByName('PUBLISHERID') ? getParameterByName('PUBLISHERID') : getParameterByName('publisherid');
    if (publisherid) {
        $.cookie('publisherid', publisherid, { expires: 30, path: '/', domain: domainName });
    }

});

// Yandex.Metrika counter START
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter48641507 = new Ya.Metrika({
                id:48641507,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
      s = d.createElement("script"),
      f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");
// Yandex.Metrika counter END

window._qevents = window._qevents || [];
(function() {
    var elem = document.createElement('script');
    elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
    elem.async = true;
    elem.type = "text/javascript";
    var scpt = document.getElementsByTagName('script')[0];
    scpt.parentNode.insertBefore(elem, scpt);
})();

window._qevents.push({
    "qacct": "p-sCwnd047hHRyy",
    "labels": "_fp.event.PageView"
});
