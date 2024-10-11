<style>

/* CSS Simple Pre Code */
pre {
    background: #333;
    white-space: pre;
    word-wrap: break-word;
    overflow: auto;
}

pre.code {
    margin: 20px 25px;
    border-radius: 4px;
    border: 1px solid #292929;
    position: relative;
}

pre.code label {
    font-family: sans-serif;
    font-weight: bold;
    font-size: 13px;
    color: #ddd;
    position: absolute;
    left: 1px;
    top: 15px;
    text-align: center;
    width: 140px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
}

pre.code code {
    font-family: "Inconsolata","Monaco","Consolas","Andale Mono","Bitstream Vera Sans Mono","Courier New",Courier,monospace;
    display: block;
    margin: 0 0 0 140px;
    padding: 15px 16px 14px;
    border-left: 1px solid #555;
    overflow-x: auto;
    font-size: 13px;
    line-height: 19px;
    color: #ddd;
}

pre::after {
    content: "double click to selection";
    padding: 0;
    width: auto;
    height: auto;
    position: absolute;
    right: 18px;
    top: 14px;
    font-size: 12px;
    color: #ddd;
    line-height: 20px;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    transition: all 0.3s ease;
}

pre:hover::after {
    opacity: 0;
    visibility: visible;
}

pre.code-css code {
    color: #91a7ff;
}

pre.code-html code {
    color: #aed581;
}

pre.code-javascript code {
    color: #ffa726;
}

pre.code-jquery code {
    color: #4dd0e1;
}
    </style>



<pre class='code code-css'><label>cmd_general.cpp</label><code>


ACMD(do_in_game_mall) <br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;char buf[512+1];<br>
&nbsp;&nbsp;&nbsp;&nbsp;char sas[33];<br>
&nbsp;&nbsp;&nbsp;&nbsp;MD5_CTX ctx;<br>
&nbsp;&nbsp;&nbsp;&nbsp;const char sas_key[] = "<?=SQLITE_PASSWORD; ?>";<br>
&nbsp;&nbsp;&nbsp;&nbsp;char language[3];<br>
&nbsp;&nbsp;&nbsp;&nbsp;strcpy(language, "en");<br>
&nbsp;&nbsp;&nbsp;&nbsp;snprintf(buf, sizeof(buf), "%u%u%s", ch->GetPlayerID(), ch->GetAID(), sas_key);<br>
&nbsp;&nbsp;&nbsp;&nbsp;MD5Init(&ctx);<br>
&nbsp;&nbsp;&nbsp;&nbsp;MD5Update(&ctx, (const unsigned char *) buf, strlen(buf));<br>
#ifdef __FreeBSD__<br>
&nbsp;&nbsp;&nbsp;&nbsp; MD5End(&ctx, sas);<br>
#else<br>
&nbsp;&nbsp;&nbsp;&nbsp; static const char hex[] = "0123456789abcdef";<br>
&nbsp;&nbsp;&nbsp;&nbsp; unsigned char digest[16];<br>
&nbsp;&nbsp;&nbsp;&nbsp; MD5Final(digest, &ctx);<br>
&nbsp;&nbsp;&nbsp;&nbsp; int i;<br>
&nbsp;&nbsp;&nbsp;&nbsp; for (i = 0; i < 16; ++i) {<br>
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; sas[i+i] = hex[digest[i] >> 4];<br>
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; sas[i+i+1] = hex[digest[i] & 0x0f];<br>
&nbsp;&nbsp;&nbsp;&nbsp; }<br>
&nbsp;&nbsp;&nbsp;&nbsp; sas[i+i] = '\0';<br>
#endif<br>
&nbsp;&nbsp;&nbsp;&nbsp; snprintf(buf, sizeof(buf), "mall <?=URL;?>?pid=%u&lang=%s&sid=%d&sas=%s", ch->GetPlayerID(), language, g_server_id, sas);<br>
&nbsp;&nbsp;&nbsp;&nbsp; ch->ChatPacket(CHAT_TYPE_COMMAND, buf);<br>
}<br>

</code></pre>







    <script>
	$('i[rel="pre"]').replaceWith(function() {
    return $('<pre><code>' + $(this).html() + '</code></pre>');
});
var pres = document.querySelectorAll('pre,kbd,blockquote');
for (var i = 0; i < pres.length; i++) {
  pres[i].addEventListener("dblclick", function () {
    var selection = getSelection();
    var range = document.createRange();
    range.selectNodeContents(this);
    selection.removeAllRanges();
    selection.addRange(range);
  }, false);
}

</script>