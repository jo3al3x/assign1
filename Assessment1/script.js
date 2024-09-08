console.log('script.js loaded');

const xmlRules = [
    {
        rule: "XML documents must have a root element",
        example: `
&lt;root&gt;
    &lt;child&gt;Content&lt;/child&gt;
&lt;/root&gt;`
    },
    {
        rule: "XML tags are case sensitive",
        example: `
&lt;Person&gt;
    &lt;Name&gt;John&lt;/Name&gt;
&lt;/Person&gt;`
    },
    {
        rule: "XML elements must be properly nested",
        example: `
&lt;parent&gt;
    &lt;child&gt;Content&lt;/child&gt;
&lt;/parent&gt;`
    },
    {
        rule: "XML attribute values must be quoted",
        example: `
&lt;element attribute="value"&gt;Content&lt;/element&gt;`
    },
    {
        rule: "Comments in XML use &lt;!-- --&gt; syntax",
        example: `
&lt;!-- This is a comment --&gt;`
    },
    {
        rule: "Special characters must be escaped",
        example: `
&lt;element&gt;Content with &amp;amp; symbol&lt;/element&gt;`
    }
];

function displayXmlRules() {
    const xmlRulesContainer = document.getElementById('xml-rules');
    xmlRulesContainer.innerHTML = ''; // Clear existing content
    const row = document.createElement('div');
    row.className = 'row';
    
    xmlRules.forEach(rule => {
        const col = document.createElement('div');
        col.className = 'col-md-6 mb-4';
        const ruleElement = document.createElement('div');
        ruleElement.className = 'rule-container';
        ruleElement.innerHTML = `
            <h3>${rule.rule}</h3>
            <pre><code>${rule.example}</code></pre>
        `;
        col.appendChild(ruleElement);
        row.appendChild(col);
    });
    
    xmlRulesContainer.appendChild(row);
}

function fetchRSSFeedUsingXHR() {
    const xhr = new XMLHttpRequest();
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const feedUrl = encodeURIComponent('https://www.smashingmagazine.com/feed/');
    const fullUrl = proxyUrl + feedUrl;

    xhr.open('GET', fullUrl, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Received data:', xhr.responseText.substring(0, 200) + '...');
                const parser = new DOMParser();
                const xml = parser.parseFromString(xhr.responseText, "text/xml");
                displayRSSFeed(xml);
            } else {
                console.error('Failed to fetch RSS:', xhr.status, xhr.statusText);
                displayRSSError(xhr.statusText);
            }
        }
    };

    xhr.send();
}

function displayRSSFeed(xml) {
    const items = xml.getElementsByTagName("item");
    let rssContent = "";
    
    for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName("title")[0].textContent;
        const link = items[i].getElementsByTagName("link")[0].textContent;
        const description = items[i].getElementsByTagName("description")[0].textContent;
        const pubDate = items[i].getElementsByTagName("pubDate")[0].textContent;

        rssContent += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text"><small class="text-muted">${pubDate}</small></p>
                    <p class="card-text">${description}</p>
                    <a href="${link}" class="btn btn-primary" target="_blank">Read more</a>
                </div>
            </div>
        `;
    }

    document.getElementById("rssFeed").innerHTML = rssContent;
}

function displayRSSError(error) {
    document.getElementById("rssFeed").innerHTML = `<div class="alert alert-danger">Error loading RSS feed: ${error}</div>`;
}

document.addEventListener('DOMContentLoaded', function() {
    displayXmlRules();

    // Add event listener for tab changes
    document.querySelectorAll('button[data-bs-toggle="pill"]').forEach(button => {
        button.addEventListener('shown.bs.tab', function (event) {
            if (event.target.id === 'v-pills-rss-tab') {
                fetchRSSFeedUsingXHR();
            }
        });
    });
});



