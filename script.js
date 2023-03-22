window.addEventListener("DOMContentLoaded", function() {

    const cookies = get_cookies();

    const last_set = document.querySelector("#last-modify");

    const already_set = (cookies["last_set"] && new Date(cookies['expires']).getTime() < new Date().getTime());

    if(already_set) 
    {
        last_set.innerText = cookies["last_set"];
    
        document.querySelector("#marketing-chb").checked = cookies['marketing'];
        document.querySelector("#stats-chb").checked = cookies['statistics'];
    }
    else 
    {
        localStorage.clear();
    }

});



function get_cookies() 
{
    
    const expires = localStorage.getItem("expires") || null;
    const last_set = localStorage.getItem("last_set") || null;
    const statistics = localStorage.getItem("statistics") === 'true';
    const marketing = localStorage.getItem("marketing") === 'true';

    return {expires, last_set, statistics, marketing};
}



function collect_data() 
{
    const marketing = document.querySelector("#marketing-chb").checked;
    const stats = document.querySelector("#stats-chb").checked;

    return {"marketing": marketing, "statistics": stats};
}



// values = { "fieldName": fieldValue, "fieldName": fieldValue }

function set_cookies(values, redirect = true) {
    const EXPIRATION_PERIOD = 6 * 30;

    const now = new Date();
    localStorage.setItem("last_set", now);

    const expir_date = new Date(now.getDate() + EXPIRATION_PERIOD);
    localStorage.setItem("expires", expir_date);
    
    for(let key of Object.keys(values)) 
    {
        localStorage.setItem(key, values[key]);
    }

    const url = new URL(window.location.href);
    const redir_value = url.searchParams.get("redir");

    const DEFAULT_REDIR = url;
    location.assign(redir_value ? redir_value : DEFAULT_REDIR);
}