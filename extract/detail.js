module.exports = async function (page) {
    const data = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".job-card-container")).map(el => {

        const link = el.querySelector("a");
        const eltitle = el.querySelector(".job-card-list__entity-lockup [dir='ltr']");
        const location = el.querySelector(".job-card-container__metadata-wrapper");
        const time = el.querySelector(".job-card-list__footer-wrapper");
        
        return {
          url: link ? link.href : null,
          linkText: link ? link.innerText.trim() : "No Title", 
          title: eltitle ? eltitle.innerText.trim() : null, 
          location: location? location.innerText.trim(): null,
          time: time? time.innerText.trim(): null,
        };
      });
    });
  
    return data;
  };
  
